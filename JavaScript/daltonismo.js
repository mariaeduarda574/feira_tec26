function opcoesFiltros() {
    const fundo = document.getElementById("fundoDaltonismo");

    fundo.classList.add("ativo");
}

function fecharOpcoesDaltonismo() {
    const fundo = document.getElementById("fundoDaltonismo");

    fundo.classList.remove("ativo");
}

function ativarFiltro(filtro) {
    document.body.classList.remove(
        "protanopia",
        "deuteranopia",
        "tritanopia",
        "acromatopsia"
    );

    if (filtro !== "normal") {
        document.body.classList.add(filtro);
    }

    localStorage.setItem("filtroDaltonismo", filtro);
}

function carregarFiltro() {
    const filtro = localStorage.getItem("filtroDaltonismo");

    if (filtro && filtro !== "normal") {
        document.body.classList.add(filtro);
    }
}

carregarFiltro();