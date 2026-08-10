// =====================================================
// BEE HIVE
// JAVASCRIPT GENERAL
// =====================================================


// =====================================================
// PEDIDO DE HERRAMIENTAS
// =====================================================

// Catálogo inicial de herramientas.
// Los datos que todavía no conocemos quedan preparados
// para ser completados posteriormente.

const herramientas = [

    {
        nombre: "Taladro",
        icono: "🔨",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Herramienta para trabajos de perforación y mantenimiento."
    },

    {
        nombre: "Pulidora",
        icono: "⚙️",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Herramienta para trabajos de pulido, corte y mantenimiento."
    },

    {
        nombre: "Segueta",
        icono: "🪚",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Herramienta para trabajos de corte y mantenimiento."
    },

    {
        nombre: "Juego de destornilladores",
        icono: "🪛",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Juego de herramientas para trabajos de mantenimiento y reparación."
    },

    {
        nombre: "Juego de Bristol",
        icono: "🔧",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Juego de llaves Bristol para reparación y mantenimiento."
    },

    {
        nombre: "Juego de destornilladores eléctricos",
        icono: "⚡",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Herramientas para trabajos eléctricos, mantenimiento y reparación."
    },

    {
        nombre: "Tester digital",
        icono: "📟",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Instrumento para realizar diferentes mediciones eléctricas."
    },

    {
        nombre: "Tester normal",
        icono: "📏",
        marca: "Por definir",
        modelo: "Por definir",
        estado: "Por confirmar",
        precioHora: "Por definir",
        precioDia: "Por definir",
        descripcion:
            "Herramienta de medición para trabajos eléctricos y mantenimiento."
    }

];


// =====================================================
// CARRITO / PEDIDO
// =====================================================

let pedidoHerramientas = [];


// =====================================================
// AGREGAR HERRAMIENTA
// =====================================================

function agregarHerramienta(indice) {

    const herramienta = herramientas[indice];

    if (!herramienta) {
        return;
    }


    // Buscar si ya existe en el pedido

    const existente = pedidoHerramientas.find(
        item => item.indice === indice
    );


    if (existente) {

        existente.cantidad += 1;

    } else {

        pedidoHerramientas.push({

            indice: indice,

            cantidad: 1

        });

    }


    actualizarPedido();


    // Llevar al usuario hasta su pedido

    const pedido = document.getElementById("pedido");

    if (pedido) {

        pedido.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// QUITAR UNA UNIDAD
// =====================================================

function quitarHerramienta(indice) {

    const item = pedidoHerramientas.find(
        elemento => elemento.indice === indice
    );


    if (!item) {
        return;
    }


    item.cantidad -= 1;


    if (item.cantidad <= 0) {

        pedidoHerramientas =
            pedidoHerramientas.filter(
                elemento => elemento.indice !== indice
            );

    }


    actualizarPedido();

}


// =====================================================
// ELIMINAR COMPLETAMENTE
// =====================================================

function eliminarHerramienta(indice) {

    pedidoHerramientas =
        pedidoHerramientas.filter(
            elemento => elemento.indice !== indice
        );


    actualizarPedido();

}


// =====================================================
// ACTUALIZAR PEDIDO
// =====================================================

function actualizarPedido() {

    const listaPedido =
        document.getElementById("listaPedido");

    const resumenPedido =
        document.getElementById("resumenPedido");

    const btnWhatsApp =
        document.getElementById("btnWhatsAppPedido");

    const btnVaciar =
        document.getElementById("btnVaciarPedido");


    if (!listaPedido) {
        return;
    }


    // Si está vacío

    if (pedidoHerramientas.length === 0) {

        listaPedido.innerHTML = `

            <div class="quick-card">

                <div class="quick-icon">
                    🛒
                </div>

                <div>

                    <h3>
                        Tu pedido está vacío
                    </h3>

                    <p>
                        Agrega una o varias herramientas
                        desde nuestro catálogo.
                    </p>

                </div>

            </div>

        `;


        if (resumenPedido) {

            resumenPedido.textContent =
                "No has seleccionado herramientas todavía.";

        }


        if (btnWhatsApp) {
            btnWhatsApp.disabled = true;
        }


        if (btnVaciar) {
            btnVaciar.disabled = true;
        }


        return;

    }


    // =================================================
    // MOSTRAR PEDIDO
    // =================================================

    listaPedido.innerHTML = "";


    pedidoHerramientas.forEach(item => {

        const herramienta =
            herramientas[item.indice];


        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "quick-card";


        tarjeta.innerHTML = `

            <div class="quick-icon">

                ${herramienta.icono}

            </div>


            <div>

                <h3>

                    ${herramienta.nombre}

                </h3>


                <p>

                    Cantidad:
                    <strong>${item.cantidad}</strong>

                </p>


                <p>

                    Marca:
                    ${herramienta.marca}

                    <br>

                    Modelo:
                    ${herramienta.modelo}

                </p>


                <div>

                    <button
                        type="button"
                        class="btn btn-secondary"
                        onclick="quitarHerramienta(${item.indice})">

                        −

                    </button>


                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick="agregarHerramienta(${item.indice})">

                        +

                    </button>


                    <button
                        type="button"
                        class="btn btn-secondary"
                        onclick="eliminarHerramienta(${item.indice})">

                        🗑️ Eliminar

                    </button>

                </div>

            </div>

        `;


        listaPedido.appendChild(tarjeta);

    });


    // =================================================
    // CONTAR TOTAL DE HERRAMIENTAS
    // =================================================

    const cantidadTotal =
        pedidoHerramientas.reduce(
            (total, item) => total + item.cantidad,
            0
        );


    if (resumenPedido) {

        resumenPedido.innerHTML =
            `🛠️ Has seleccionado <strong>${cantidadTotal}</strong> herramienta(s).`;

    }


    if (btnWhatsApp) {
        btnWhatsApp.disabled = false;
    }


    if (btnVaciar) {
        btnVaciar.disabled = false;
    }

}


// =====================================================
// VER DETALLES
// =====================================================

function verHerramienta(indice) {

    const herramienta =
        herramientas[indice];


    if (!herramienta) {
        return;
    }


    const mensaje =

        `${herramienta.icono} ${herramienta.nombre}\n\n` +

        `Descripción:\n${herramienta.descripcion}\n\n` +

        `Marca: ${herramienta.marca}\n` +

        `Modelo: ${herramienta.modelo}\n` +

        `Estado: ${herramienta.estado}\n` +

        `Precio por hora: ${herramienta.precioHora}\n` +

        `Precio por día: ${herramienta.precioDia}`;


    alert(mensaje);

}


// =====================================================
// VACIAR PEDIDO
// =====================================================

function vaciarPedido() {

    if (pedidoHerramientas.length === 0) {
        return;
    }


    const confirmar =
        confirm(
            "¿Quieres eliminar todas las herramientas del pedido?"
        );


    if (!confirmar) {
        return;
    }


    pedidoHerramientas = [];


    actualizarPedido();

}


// =====================================================
// ENVIAR PEDIDO A WHATSAPP
// =====================================================

function enviarPedidoWhatsApp() {

    if (pedidoHerramientas.length === 0) {

        alert(
            "Primero agrega al menos una herramienta al pedido."
        );

        return;

    }


    const numeroWhatsApp =
        "573045751373";


    let texto =

        `🐝 *PEDIDO DE ALQUILER - BEE HIVE RENTALS*

Hola BEE HIVE, quiero consultar la disponibilidad y condiciones para alquilar las siguientes herramientas:

`;


    // =================================================
    // AGREGAR HERRAMIENTAS AL MENSAJE
    // =================================================

    pedidoHerramientas.forEach((item, posicion) => {

        const herramienta =
            herramientas[item.indice];


        texto +=

            `${posicion + 1}. ${herramienta.nombre}\n` +

            `   Cantidad: ${item.cantidad}\n` +

            `   Marca: ${herramienta.marca}\n` +

            `   Modelo: ${herramienta.modelo}\n` +

            `   Modalidad: Por hora o por día\n\n`;

    });


    texto +=

        `━━━━━━━━━━━━━━━━━━━━

📌 *Importante:*
Deseo conocer la disponibilidad, precio final, duración del alquiler y condiciones correspondientes.

📍 Tocancipá, Cundinamarca

Gracias.
BEE HIVE INMOBILIARIA 🐝`;


    const urlWhatsApp =

        "https://api.whatsapp.com/send?phone=" +

        numeroWhatsApp +

        "?text=" +

        encodeURIComponent(texto);


    // =================================================
    // ABRIR WHATSAPP
    // =================================================

    window.location.href =
        urlWhatsApp;

}


// =====================================================
// FORMULARIO DE CONTACTO → WHATSAPP
// =====================================================

function enviarWhatsApp(event) {

    if (event) {
        event.preventDefault();
    }

    const nombreElement =
        document.getElementById("nombre");

    const correoElement =
        document.getElementById("correo");

    const telefonoElement =
        document.getElementById("telefono");

    const servicioElement =
        document.getElementById("servicio");

    const mensajeElement =
        document.getElementById("mensaje");


    // Si no estamos en contacto.html,
    // simplemente no hacer nada.

    if (
        !nombreElement ||
        !correoElement ||
        !telefonoElement ||
        !servicioElement ||
        !mensajeElement
    ) {

        return;

    }


    const nombre =
        nombreElement.value.trim();

    const correo =
        correoElement.value.trim();

    const telefono =
        telefonoElement.value.trim();

    const mensaje =
        mensajeElement.value.trim();


    if (servicioElement.value === "") {

        alert(
            "Por favor selecciona el servicio que necesitas."
        );

        servicioElement.focus();

        return;

    }


    const servicio =
        servicioElement.options[
            servicioElement.selectedIndex
        ].text;


    if (nombre === "") {

        alert(
            "Por favor escribe tu nombre."
        );

        nombreElement.focus();

        return;

    }


    if (correo === "") {

        alert(
            "Por favor escribe tu correo electrónico."
        );

        correoElement.focus();

        return;

    }


    if (telefono === "") {

        alert(
            "Por favor escribe tu teléfono o WhatsApp."
        );

        telefonoElement.focus();

        return;

    }


    if (mensaje === "") {

        alert(
            "Por favor escribe tu mensaje."
        );

        mensajeElement.focus();

        return;

    }


    const numeroWhatsApp =
        "573237904242";


    const textoWhatsApp =

        `🐝 *NUEVA CONSULTA DESDE LA PÁGINA WEB*

👤 *Nombre:* ${nombre}

📧 *Correo:* ${correo}

📱 *Teléfono / WhatsApp:* ${telefono}

🏠 *Servicio solicitado:* ${servicio}

📝 *Mensaje:*
${mensaje}

━━━━━━━━━━━━━━━━━━━━

*BEE HIVE INMOBILIARIA*

📍 Tocancipá, Cundinamarca

⏰ 7:00 a. m. a 7:00 p. m.
`;


    const urlWhatsApp =

        "https://api.whatsapp.com/send?phone=" +

        numeroWhatsApp +

        "?text=" +

        encodeURIComponent(
            textoWhatsApp
        );


    window.location.href =
        urlWhatsApp;

}


// =====================================================
// MENÚ MÓVIL
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const menuBtn =
            document.getElementById("menuBtn");

        const nav =
            document.querySelector(".nav");


        if (
            menuBtn &&
            nav
        ) {

            menuBtn.addEventListener(
                "click",
                function () {

                    const abierto = nav.classList.toggle(
                        "show"
                    );

                    menuBtn.setAttribute(

                        "aria-expanded",
                        abierto ? "true" : "false"
                    );
                    nav.classList.toggle(
                        "show"

                    );

                }
            );

        }


        // Inicializar pedido

        actualizarPedido();

    }
);