let arquivoEstudoAtual = null;
let conteudoArquivoAtual = "";

function mostrarResultadoTransforme(mensagem, tipo = "") {
    const resultado = document.getElementById("resultadoTransforme");

    if (!resultado) return;

    resultado.className = "transforme-result show " + tipo;
    resultado.innerHTML = mensagem;
}

async function extrairTextoDoArquivo(file) {
    const nome = file.name.toLowerCase();

    if (nome.endsWith(".txt")) {
        return await file.text();
    }

    if (nome.endsWith(".pdf")) {
        if (typeof pdfjsLib === "undefined") {
            await carregarScript(
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
            );
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;

        let texto = "";

        for (let pagina = 1; pagina <= pdf.numPages; pagina++) {
            const page = await pdf.getPage(pagina);
            const content = await page.getTextContent();

            texto += content.items
                .map(item => item.str)
                .join(" ");

            texto += "\n\n";
        }

        return texto;
    }

    if (nome.endsWith(".docx")) {
        if (typeof mammoth === "undefined") {
            await carregarScript(
                "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.9.0/mammoth.browser.min.js"
            );
        }

        const arrayBuffer = await file.arrayBuffer();

        const resultado = await mammoth.extractRawText({
            arrayBuffer: arrayBuffer
        });

        return resultado.value;
    }

    if (nome.endsWith(".pptx")) {
        if (typeof JSZip === "undefined") {
            await carregarScript(
                "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
            );
        }

        const zip = await JSZip.loadAsync(
            await file.arrayBuffer()
        );

        let texto = "";

        const arquivos = Object.keys(zip.files)
            .filter(nome =>
                nome.startsWith("ppt/slides/slide") &&
                nome.endsWith(".xml")
            );

        for (const nomeSlide of arquivos) {
            const xml =
                await zip.files[nomeSlide].async("text");

            const parser = new DOMParser();

            const documento =
                parser.parseFromString(
                    xml,
                    "application/xml"
                );

            const textos =
                documento.getElementsByTagName("a:t");

            for (const elemento of textos) {
                texto += elemento.textContent + " ";
            }

            texto += "\n\n";
        }

        return texto;
    }

    if (
        nome.endsWith(".png") ||
        nome.endsWith(".jpg") ||
        nome.endsWith(".jpeg")
    ) {
        if (typeof Tesseract === "undefined") {
            await carregarScript(
                "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"
            );
        }

        const resultado =
            await Tesseract.recognize(
                file,
                "por"
            );

        return resultado.data.text;
    }

    throw new Error(
        "Formato de arquivo não suportado."
    );
}

function carregarScript(src) {
    return new Promise((resolve, reject) => {
        const script =
            document.createElement("script");

        script.src = src;

        script.onload = resolve;

        script.onerror = () =>
            reject(
                new Error(
                    "Não foi possível carregar o recurso."
                )
            );

        document.head.appendChild(script);
    });
}

async function obterConteudoEstudo() {
    const inputArquivo =
        document.getElementById("arquivoEstudo") ||
        document.getElementById("arquivo");

    const textarea =
        document.getElementById("textoEstudo");

    if (
        inputArquivo &&
        inputArquivo.files &&
        inputArquivo.files.length > 0
    ) {
        arquivoEstudoAtual =
            inputArquivo.files[0];

        mostrarResultadoTransforme(
            "📖 Lendo o arquivo... Aguarde.",
            "carregando"
        );

        conteudoArquivoAtual =
            await extrairTextoDoArquivo(
                arquivoEstudoAtual
            );

        return conteudoArquivoAtual;
    }

    if (
        textarea &&
        textarea.value.trim()
    ) {
        conteudoArquivoAtual =
            textarea.value.trim();

        return conteudoArquivoAtual;
    }

    throw new Error(
        "Envie um arquivo ou escreva o conteúdo que deseja estudar."
    );
}



async function transformarEstudo(tipo) {
    try {
        const conteudo =
            await obterConteudoEstudo();

        if (
            !conteudo ||
            !conteudo.trim()
        ) {
            throw new Error(
                "Não foi encontrado texto no conteúdo enviado."
            );
        }

        if (tipo === "libras") {
            traduzirSomenteArquivoEmLibras(
                conteudo
            );

            return;
        }

    } catch (erro) {
        console.error(erro);

        mostrarResultadoTransforme(
            "❌ " + erro.message,
            "erro"
        );
    }
}

function traduzirSomenteArquivoEmLibras(conteudo) {

    if (
        !conteudo ||
        !conteudo.trim()
    ) {
        mostrarResultadoTransforme(
            "Não foi possível encontrar conteúdo no arquivo.",
            "erro"
        );

        return;
    }

    const nomeArquivo =
        arquivoEstudoAtual
            ? arquivoEstudoAtual.name
            : "Conteúdo enviado";

    sessionStorage.setItem(
        "educai_libras_texto",
        conteudo
    );

    sessionStorage.setItem(
        "educai_libras_nome",
        nomeArquivo
    );

    window.location.href =
        "libras.html";
}

function escaparHTML(texto) {
    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}

/*
 * Correção do botão de Libras:
 * algumas páginas antigas do projeto possuem sua própria função
 * transformarEstudo(), então interceptamos apenas o clique do botão
 * de Libras antes do onclick dessas páginas.
 */
(function instalarBotaoLibrasEducaI() {
    if (window.__educaiLibrasFixInstalado) return;
    window.__educaiLibrasFixInstalado = true;

    async function executarLibras() {
        try {
            const inputArquivo =
                document.getElementById("arquivoEstudo") ||
                document.getElementById("arquivo");
            const textarea = document.getElementById("textoEstudo");

            let conteudo = "";
            let nomeArquivo = "Conteúdo enviado";

            if (inputArquivo && inputArquivo.files && inputArquivo.files.length) {
                arquivoEstudoAtual = inputArquivo.files[0];
                nomeArquivo = arquivoEstudoAtual.name;

                mostrarResultadoTransforme(
                    "📖 Lendo o arquivo para preparar a tradução em Libras...",
                    "carregando"
                );

                conteudo = await extrairTextoDoArquivo(arquivoEstudoAtual);
            } else if (textarea && textarea.value.trim()) {
                conteudo = textarea.value.trim();
            }

            if (!conteudo || !conteudo.trim()) {
                mostrarResultadoTransforme(
                    "❌ Digite/cole um conteúdo ou selecione um arquivo antes de traduzir para Libras.",
                    "erro"
                );
                return;
            }

            sessionStorage.setItem("educai_libras_texto", conteudo);
            sessionStorage.setItem("educai_libras_nome", nomeArquivo);

            window.location.href = "libras.html";
        } catch (erro) {
            console.error("Educaí - erro ao preparar Libras:", erro);
            mostrarResultadoTransforme(
                "❌ Não foi possível preparar o conteúdo para Libras: " + erro.message,
                "erro"
            );
        }
    }

    window.__educaiTraduzirLibras = executarLibras;

    document.addEventListener("click", function (evento) {
        const botao = evento.target.closest("button");
        if (!botao) return;

        const textoBotao = (botao.textContent || "").trim().toLowerCase();
        const onclick = botao.getAttribute("onclick") || "";

        if (
            textoBotao.includes("traduzir para libras") ||
            onclick.includes("transformarestudo('libras')") ||
            onclick.includes('transformarestudo("libras")')
        ) {
            evento.preventDefault();
            evento.stopImmediatePropagation();
            executarLibras();
        }
    }, true);
})();
