from PIL import Image
from pathlib import Path

CARPETA = Path(__file__).parent
SALIDA = CARPETA / "optimizadas"

SALIDA.mkdir(exist_ok=True)

for archivo in sorted(CARPETA.glob("Casa 68-*.png")):

    try:
        imagen = Image.open(archivo)

        # Mantener proporción y reducir tamaño
        imagen.thumbnail((1600, 1600), Image.Resampling.LANCZOS)

        # Guardar como JPG optimizado
        nombre = archivo.stem + ".jpg"
        destino = SALIDA / nombre

        if imagen.mode in ("RGBA", "LA", "P"):
            fondo = Image.new("RGB", imagen.size, "white")

            if imagen.mode == "P":
                imagen = imagen.convert("RGBA")

            if imagen.mode == "RGBA":
                fondo.paste(imagen, mask=imagen.getchannel("A"))
            else:
                fondo.paste(imagen)

            imagen = fondo
        else:
            imagen = imagen.convert("RGB")

        imagen.save(
            destino,
            "JPEG",
            quality=82,
            optimize=True,
            progressive=True
        )

        original_mb = archivo.stat().st_size / (1024 * 1024)
        nuevo_mb = destino.stat().st_size / (1024 * 1024)

        print(
            f"{archivo.name} -> {nombre} | "
            f"{original_mb:.2f} MB -> {nuevo_mb:.2f} MB"
        )

    except Exception as e:
        print(f"ERROR con {archivo.name}: {e}")

print()
print("========================================")
print("FOTOS OPTIMIZADAS CORRECTAMENTE")
print("========================================")
print(f"Carpeta de salida: {SALIDA}")