async function listLivros() {
    try {
        const response = await fetch(`http://localhost::3306/livro`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });    
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';
        result.forEach(livro => {
            var linha = document.createElement('tr');            

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailLivro('${livro.id}');">${livro.id}</a>`;
            linha.appendChild(id);

            var titulo = document.createElement('td');
            titulo.innerHTML = livro.titulo;
            linha.appendChild(titulo);

            var autor = document.createElement('td');
            autor.innerHTML = livro.autor;
            linha.appendChild(autor);

            var editora = document.createElement('td');
            editora.innerHTML = livro.editora;
            linha.appendChild(editora);

            var ano = document.createElement('td');
            ano.innerHTML = livro.ano;
            linha.appendChild(ano);

            var preco = document.createElement('td');
            preco.innerHTML = livro.preco;
            linha.appendChild(preco);


            var acoes = document.createElement('td');
            acoes.innerHTML = `<button onClick="deleteLivro('${livro.id}');">x</button>`;
            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function createLivro() {
    var livro = {
        "id": uuidv4(),
        "titulo": document.getElementById('detail-titulo').value,
        "autor": document.getElementById('detail-autor').value,
        "editora": document.getElementById('detail-editora').value,
        "ano": document.getElementById('detail-ano').value,
        "preco": document.getElementById('detail-preco').value
            
    }

    try {
        const response = await fetch('http://localhost::3306/livro', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'            },
            body: JSON.stringify(livro)
        });
       listLivros();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteLivro(id) {
    try {
        const response = await fetch(`http://localhost::3306/livro/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listLivros();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function detailLivro(id) {
    try {
        const result = await fetch(`http://localhost::3306/livro/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var livro = await result.json();
        document.getElementById('detail-id').value = livro.id;
        document.getElementById('detail-titulo').value = livro.titulo;
        document.getElementById('detail-autor').value = livro.autor;
        document.getElementById('detail-editora').value = livro.editora;
        document.getElementById('detail-ano').value = livro.ano;
        document.getElementById('detail-preco').value = livro.preco;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function filterLivros() {
    var filter = document.getElementById('filter').value.toString().trim();
    if (filter.length < 3) return;
    listLivros();
}

async function cleanLivro() {
    document.getElementById('detail-id').value = '';
    document.getElementById('detail-titulo').value = '';
    document.getElementById('detail-autor').value = '';
    document.getElementById('detail-editora').value = '';
    document.getElementById('detail-ano').value = '';
    document.getElementById('detail-preco').value = '';

}