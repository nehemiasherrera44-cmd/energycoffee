/* =================================
   ENERGY COFFEE
   JAVASCRIPT PRINCIPAL
================================= */


/* =================================
   MENSAJE DEL PRODUCTO
================================= */

function mostrarProducto() {

    alert(
        "☕ Energy Coffee\n\n" +
        "Café energético para estudiantes y jóvenes.\n" +
        "Precio: $2.50"
    );

}


/* =================================
   EJEMPLO DE JAVASCRIPT
================================= */

function saludar() {

    alert(
        "¡Bienvenido a Energy Coffee!\n\n" +
        "Este mensaje fue creado utilizando JavaScript."
    );

}


/* =================================
   MODO CLARO Y OSCURO
================================= */

function cambiarModo() {

    document.body.classList.toggle("modo-oscuro");

    actualizarBotonModo();

}


function toggleTheme() {

    document.body.classList.toggle("modo-oscuro");

    actualizarBotonModo();

}


function actualizarBotonModo() {

    const botonModo = document.getElementById("modoBtn");

    const botonTheme = document.getElementById("themeToggleBtn");

    const oscuro =
        document.body.classList.contains("modo-oscuro");


    if (botonModo) {

        botonModo.innerHTML =
            oscuro ? "☀️" : "🌙";

    }


    if (botonTheme) {

        botonTheme.innerHTML =
            oscuro
                ? "☀️ Modo Claro"
                : "🌙 Modo Oscuro";

    }

}


/* =================================
   JQUERY
================================= */

$(document).ready(function() {


    /* MOSTRAR / OCULTAR MENSAJE */

    $("#botonJquery").click(function() {

        $("#mensaje").slideToggle(500);

    });


    /* =================================
       MODO OSCURO CON JQUERY
    ================================= */

    $("#modoOscuro").click(function() {

        $("body").toggleClass("modo-oscuro");

        const oscuro =
            $("body").hasClass("modo-oscuro");


        if (oscuro) {

            $("#modoOscuro").html("☀️ Modo claro");

        } else {

            $("#modoOscuro").html("🌙 Modo oscuro");

        }

    });


    /* =================================
       NAVEGACIÓN SUAVE
    ================================= */

    $("a[href^='#']").click(function(event) {

        event.preventDefault();

        let destino = $(this.hash);


        if (destino.length) {

            $("html, body").animate({

                scrollTop: destino.offset().top

            }, 800);

        }

    });

});


/* =================================
   CUESTIONARIO
================================= */

const quiz = document.getElementById("quiz");


if (quiz) {

    quiz.addEventListener("submit", function(event) {

        event.preventDefault();


        let puntos = 0;


        const respuestas = {

            p1: "c",
            p2: "a",
            p3: "a",
            p4: "a",
            p5: "a",
            p6: "a",
            p7: "b",
            p8: "a"

        };


        for (let pregunta in respuestas) {

            const seleccionada =
                document.querySelector(
                    'input[name="' +
                    pregunta +
                    '"]:checked'
                );


            if (
                seleccionada &&
                seleccionada.value === respuestas[pregunta]
            ) {

                puntos++;

            }

        }


        const resultado =
            document.getElementById("resultado");


        resultado.style.display = "block";


        if (puntos === 8) {

            resultado.innerHTML =
                "🎉 ¡Excelente! Obtuviste " +
                puntos +
                " de 8 respuestas correctas.";

        }

        else if (puntos >= 6) {

            resultado.innerHTML =
                "👏 ¡Muy bien! Obtuviste " +
                puntos +
                " de 8 respuestas correctas.";

        }

        else if (puntos >= 4) {

            resultado.innerHTML =
                "👍 Buen trabajo. Obtuviste " +
                puntos +
                " de 8 respuestas correctas. " +
                "Puedes repasar nuevamente los temas.";

        }

        else {

            resultado.innerHTML =
                "📚 Obtuviste " +
                puntos +
                " de 8 respuestas correctas. " +
                "Te recomendamos estudiar nuevamente.";

        }


        window.scrollTo({

            top: resultado.offsetTop,

            behavior: "smooth"

        });

    });

}