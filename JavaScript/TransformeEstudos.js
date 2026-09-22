function atualizarBotaoLimpar() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");
    const botao = document.getElementById("btnLimparMaterial");

    if (!botao) return;

    if (inputArquivo && inputArquivo.files.length > 0) {
        botao.textContent = "Fechar arquivo";
    } else {
        botao.textContent = "Limpar conteúdo";
    }
}

function transformarEstudo(tipo) {

    const texto = document.getElementById("textoEstudo").value.trim();
    const resultado = document.getElementById("resultadoTransforme");

    if (!texto) {
        resultado.innerHTML = `
            <div class="transforme-alerta">
                <strong>Ops!</strong>
                <p>Digite ou cole um conteúdo antes de escolher uma opção.</p>
            </div>
        `;
        return;
    }

    switch (tipo) {

        case "ouvir":
            ouvirTexto(texto);
            break;

        case "libras":
            traduzirLibras(texto);
            break;

        case "mapa":
            criarMapaMental(texto);
            break;

        case "simples":
            explicacaoSimples(texto);
            break;

        case "exercicios":
            criarExercicios(texto);
            break;

        case "resumo":
            criarResumo(texto);
            break;
    }
}

function btnLimparMaterial() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");
    const botao = document.getElementById("btnLimparMaterial");

    if (inputArquivo) {
        inputArquivo.value = "";
        inputArquivo.disabled = false;
    }

    if (textarea) {
        textarea.value = "";
        textarea.disabled = false;
    }

    if (botao) {
        botao.textContent = "Limpar conteúdo";
    }
}

function arquivoSelecionado() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");
    const botao = document.getElementById("btnLimparMaterial");

    if (!inputArquivo || !textarea || !botao) return;

    if (inputArquivo.files.length > 0) {
        textarea.disabled = true;
        botao.textContent = "Fechar arquivo";
    } else {
        textarea.disabled = false;
        botao.textContent = "Limpar conteúdo";
    }
}

function textoDigitado() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");
    const botao = document.getElementById("btnLimparMaterial");

    if (!inputArquivo || !textarea || !botao) return;

    if (textarea.value.trim() !== "") {
        inputArquivo.disabled = true;
        botao.textContent = "Limpar conteúdo";
    } else {
        inputArquivo.disabled = false;
        botao.textContent = "Limpar conteúdo";
    }
}

function transformarEstudo(tipo) {
    const textarea = document.getElementById("textoEstudo");
    const inputArquivo = document.getElementById("arquivoEstudo");

    let conteudo = "";

    if (textarea && textarea.value.trim() !== "") {
        conteudo = textarea.value.trim();
    } else if (inputArquivo && inputArquivo.files.length > 0) {
        alert("Por enquanto, a leitura em voz alta funciona com textos colados.");
        return;
    } else {
        alert("Cole um conteúdo para continuar.");
        return;
    }

    if (tipo === "ouvir") {
        localStorage.setItem("conteudoEstudo", conteudo);
        window.location.href = "TransformarEstudos/queroOuvir.html";
    }
}
