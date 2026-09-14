// FUNÇÃO PRA LIMPAR O CONTEÚDO OU O arquivo
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

function btnLimparMaterial() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");

    if (inputArquivo && inputArquivo.files.length > 0) {
        inputArquivo.value = "";
    }

    if (textarea && textarea.value.trim() !== "") {
        textarea.value = "";
    }

    atualizarBotaoLimpar();
}

// DESABILITAR DEPENDENDO DE QUAL O USUARIO ESCOLHER
function arquivoSelecionado() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");
    const botao = document.getElementById("btnLimparMaterial");

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

    if (textarea.value.trim() !== "") {
        inputArquivo.disabled = true;
        botao.textContent = "Limpar conteúdo";
    } else {
        inputArquivo.disabled = false;
        botao.textContent = "Limpar conteúdo";
    }
}

function btnLimparMaterial() {
    const inputArquivo = document.getElementById("arquivoEstudo");
    const textarea = document.getElementById("textoEstudo");
    const botao = document.getElementById("btnLimparMaterial");

    inputArquivo.value = "";
    textarea.value = "";

    inputArquivo.disabled = false;
    textarea.disabled = false;

    botao.textContent = "Limpar conteúdo";

    arquivoEstudoAtual = null;
    conteudoArquivoAtual = "";
}