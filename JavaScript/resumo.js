document.addEventListener("DOMContentLoaded", function () {

    const materialOriginal = document.getElementById("materialOriginal");
    const areaResumo = document.getElementById("areaResumo");
    const textoResumo = document.getElementById("textoResumo");

    const conteudo = localStorage.getItem("conteudoEstudo");

    if (conteudo && conteudo.trim() !== "") {
        materialOriginal.textContent = conteudo;
    } else {
        materialOriginal.textContent = "Nenhum conteúdo encontrado.";
    }

    window.gerarResumo = function () {

        if (!conteudo || conteudo.trim() === "") {
            textoResumo.textContent = "Nenhum conteúdo foi encontrado.";
            areaResumo.style.display = "block";
            return;
        }

        const frases = conteudo
            .split(/[.!?]+/)
            .map(frase => frase.trim())
            .filter(frase => frase.length > 0);

        const quantidade = Math.max(
            1,
            Math.ceil(frases.length * 0.4)
        );

        const resumo = frases
            .slice(0, quantidade)
            .map(frase => "• " + frase + ".")
            .join("\n\n");

        textoResumo.textContent = resumo;

        areaResumo.style.display = "block";
    };

    window.copiarResumo = function () {

        const texto = textoResumo.textContent.trim();

        if (!texto) {
            return;
        }

        navigator.clipboard.writeText(texto);

        const botao = document.querySelector(
            ".botoes-resumo button"
        );

        botao.textContent = "Copiado!";
        botao.style.backgroundColor = "#d8f3dc";
        botao.style.color = "#2d6a4f";

        setTimeout(function () {

            botao.textContent = "Copiar";
            botao.style.backgroundColor = "";
            botao.style.color = "";

        }, 2000);
    };

    window.ouvirResumo = function () {

        const texto = textoResumo.textContent.trim();

        if (!texto) {
            return;
        }

        speechSynthesis.cancel();

        const fala = new SpeechSynthesisUtterance(texto);

        fala.lang = "pt-BR";
        fala.rate = 1;

        speechSynthesis.speak(fala);
    };

    window.pararResumo = function () {
        speechSynthesis.cancel();
    };

});