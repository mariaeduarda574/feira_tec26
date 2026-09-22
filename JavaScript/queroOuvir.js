const areaTexto = document.getElementById("conteudoVoz");
const velocidade = document.getElementById("velocidade");

let conteudo = localStorage.getItem("conteudoEstudo");
let fala = null;
let lendo = false;

if (conteudo) {
    areaTexto.textContent = conteudo;
} else {
    areaTexto.textContent = "Nenhum conteúdo foi enviado.";
}

function iniciarLeitura() {

    if (!conteudo) {
        alert("Nenhum conteúdo disponível para leitura.");
        return;
    }

    speechSynthesis.cancel();

    fala = new SpeechSynthesisUtterance(conteudo);

    fala.lang = "pt-BR";
    fala.rate = Number(velocidade.value);

    fala.onstart = function () {
        lendo = true;
    };

    fala.onend = function () {
        lendo = false;
    };

    fala.onerror = function () {
        lendo = false;
    };

    speechSynthesis.speak(fala);
}

function pausarLeitura() {

    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }

}

function continuarLeitura() {

    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }

}

function pararLeitura() {

    speechSynthesis.cancel();
    lendo = false;

}

velocidade.addEventListener("change", function () {

    if (lendo || speechSynthesis.speaking) {

        speechSynthesis.cancel();

        fala = new SpeechSynthesisUtterance(conteudo);

        fala.lang = "pt-BR";
        fala.rate = Number(velocidade.value);

        fala.onstart = function () {
            lendo = true;
        };

        fala.onend = function () {
            lendo = false;
        };

        speechSynthesis.speak(fala);
    }

});

function voltarParaEstudos() {

    speechSynthesis.cancel();

    window.location.href = "../portugues.html#transformar";

}