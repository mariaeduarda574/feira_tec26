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
