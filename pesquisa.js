document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-pesquisa");
    const input = document.getElementById("pesquisa");
    const materias = document.querySelectorAll(".materia");

    // Cria a área de resultados FORA da caixa de pesquisa
    const resultados = document.createElement("div");
    resultados.id = "resultados-pesquisa";

    // Coloca os resultados depois da seção de pesquisa
    const secaoPesquisa = document.querySelector(".pesquisa");
    secaoPesquisa.insertAdjacentElement("afterend", resultados);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const busca = input.value.trim().toLowerCase();

        resultados.innerHTML = "";

        if (busca === "") {
            resultados.innerHTML = `
                <p class="mensagem-pesquisa">
                    Digite uma matéria ou conteúdo para pesquisar.
                </p>
            `;
            return;
        }

        let encontrados = 0;

        materias.forEach(function (materia) {

            const titulo = materia.querySelector("h3")?.textContent.toLowerCase() || "";
            const descricao = materia.querySelector("p")?.textContent.toLowerCase() || "";

            if (titulo.includes(busca) || descricao.includes(busca)) {

                encontrados++;

                const resultado = document.createElement("a");

                resultado.href = materia.getAttribute("href") || "#";
                resultado.className = "resultado-item";

                resultado.innerHTML = `
                    <strong>${materia.querySelector("h3").textContent}</strong>
                    <span>${materia.querySelector("p").textContent}</span>
                `;

                resultados.appendChild(resultado);
            }
        });

        if (encontrados === 0) {
            resultados.innerHTML = `
                <p class="mensagem-pesquisa">
                    Nenhum conteúdo encontrado para 
                    "<strong>${input.value}</strong>".
                </p>
            `;
        }
    });

});