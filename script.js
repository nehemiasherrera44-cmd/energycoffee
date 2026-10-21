/* Energy Coffee: script compartido por todas las páginas */

const TXT = {
    es: { claro: "Modo claro", oscuro: "Modo oscuro", otro: "English", pie: "El café que acompaña tus mejores momentos." },
    en: { claro: "Light mode", oscuro: "Dark mode", otro: "Español", pie: "The coffee that goes with your best moments." }
};
const NAV = [
    ["index.html", "Inicio", "Home"],
    ["javascript.html", "JavaScript"],
    ["jquery.html", "jQuery"],
    ["json.html", "JSON"],
    ["hosting.html", "Hosting"],
    ["herramientas.html", "Google Tools"],
    ["cuestionario.html", "Cuestionario", "Quiz"]
];

function guardado(clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } }
function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) {} }

let idiomaActual = guardado("idioma") === "en" ? "en" : "es";

// Cabecera y pie, iguales en todas las páginas
(function () {
    const cab = document.getElementById("encabezado");
    const pie = document.getElementById("pie");
    const actual = location.pathname.split("/").pop() || "index.html";

    if (cab) {
        const enlaces = NAV.map(function (n) {
            const es = n[1], en = n[2] || n[1];
            const pagina = n[0] === actual || (actual === "" && n[0] === "index.html");
            return '<a href="' + n[0] + '" data-es="' + es + '" data-en="' + en + '"' +
                   (pagina ? ' aria-current="page"' : "") + ">" + es + "</a>";
        }).join("");
        cab.innerHTML = '<a class="logo" href="index.html">Energy Coffee</a><nav>' + enlaces +
            '<button type="button" id="idiomaBtn"></button>' +
            '<button type="button" id="themeToggleBtn"></button></nav>';
        document.getElementById("idiomaBtn").addEventListener("click", cambiarIdioma);
        document.getElementById("themeToggleBtn").addEventListener("click", toggleTheme);
    }
    if (pie) {
        pie.innerHTML = '<p><strong>Energy Coffee</strong></p><p data-es="' + TXT.es.pie + '" data-en="' + TXT.en.pie + '">' + TXT.es.pie + "</p><p>© 2026 Energy Coffee</p>";
    }

    if (guardado("tema") === "oscuro") document.body.classList.add("modo-oscuro");
    aplicarIdioma();
})();

function aplicarIdioma() {
    document.querySelectorAll("[data-es][data-en]").forEach(function (el) {
        el.textContent = el.getAttribute("data-" + idiomaActual);
    });
    document.documentElement.lang = idiomaActual;
    const b = document.getElementById("idiomaBtn");
    if (b) b.textContent = TXT[idiomaActual].otro;
    textoTema();
}

function cambiarIdioma() {
    idiomaActual = idiomaActual === "es" ? "en" : "es";
    guardar("idioma", idiomaActual);
    aplicarIdioma();
}

function textoTema() {
    const b = document.getElementById("themeToggleBtn");
    if (b) b.textContent = document.body.classList.contains("modo-oscuro") ? TXT[idiomaActual].claro : TXT[idiomaActual].oscuro;
}

function toggleTheme() {
    const oscuro = document.body.classList.toggle("modo-oscuro");
    guardar("tema", oscuro ? "oscuro" : "claro");
    textoTema();
}

// Inicio: mensaje del producto
function mostrarProducto() {
    alert(idiomaActual === "en"
        ? "Energy Coffee\n\nEnergy coffee for students and young people.\nPrice: $2.50"
        : "Energy Coffee\n\nCafé energético para estudiantes y jóvenes.\nPrecio: $2.50");
}

// JavaScript: función de ejemplo
function saludar() {
    alert(idiomaActual === "en"
        ? "Welcome to Energy Coffee!\n\nThis message was created with JavaScript."
        : "¡Bienvenido a Energy Coffee!\n\nEste mensaje fue creado utilizando JavaScript.");
}

// Compatibilidad con tu función anterior
function cambiarModo() { toggleTheme(); }

// jQuery: mostrar y ocultar el mensaje
if (window.jQuery) {
    jQuery(function ($) {
        $("#botonJquery").on("click", function () { $("#mensaje").slideToggle(500); });
    });
}

// Cuestionario
const RESPUESTAS = { p1: "c", p2: "a", p3: "a", p4: "a", p5: "a", p6: "a", p7: "b", p8: "a" };
const quiz = document.getElementById("quiz");

if (quiz) {
    quiz.addEventListener("submit", function (e) {
        e.preventDefault();
        const en = idiomaActual === "en";
        let aciertos = 0, sinResponder = 0;

        Object.keys(RESPUESTAS).forEach(function (p) {
            const marcada = quiz.querySelector('input[name="' + p + '"]:checked');
            const bloque = quiz.querySelector('input[name="' + p + '"]').closest(".pregunta");
            const vieja = bloque.querySelector(".nota");
            if (vieja) vieja.remove();
            bloque.classList.remove("ok", "mal");

            if (!marcada) { sinResponder++; return; }
            if (marcada.value === RESPUESTAS[p]) {
                aciertos++;
                bloque.classList.add("ok");
            } else {
                bloque.classList.add("mal");
                const correcta = quiz.querySelector('input[name="' + p + '"][value="' + RESPUESTAS[p] + '"]').parentElement.textContent.trim();
                const nota = document.createElement("p");
                nota.className = "nota";
                nota.textContent = (en ? "Correct answer: " : "Respuesta correcta: ") + correcta;
                bloque.appendChild(nota);
            }
        });

        const total = Object.keys(RESPUESTAS).length;
        let msg;
        if (aciertos === total) msg = en ? "Excellent! You got " + aciertos + " of " + total + " right." : "¡Excelente! Obtuviste " + aciertos + " de " + total + " respuestas correctas.";
        else if (aciertos >= 6) msg = en ? "Very good! You got " + aciertos + " of " + total + " right." : "¡Muy bien! Obtuviste " + aciertos + " de " + total + " respuestas correctas.";
        else if (aciertos >= 4) msg = en ? "Good job. You got " + aciertos + " of " + total + " right. Review the topics once more." : "Buen trabajo. Obtuviste " + aciertos + " de " + total + " respuestas correctas. Puedes repasar los temas.";
        else msg = en ? "You got " + aciertos + " of " + total + " right. We recommend studying again." : "Obtuviste " + aciertos + " de " + total + " respuestas correctas. Te recomendamos estudiar de nuevo.";
        if (sinResponder) msg += en ? " Unanswered: " + sinResponder + "." : " Sin responder: " + sinResponder + ".";
        const caja = document.getElementById("resultado");
        caja.textContent = msg;
        caja.scrollIntoView({ block: "center" });
    });
}
