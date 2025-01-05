const express= require('express');
const [ Pool ] = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'Postgres',
    host:'viaduct.proxy.rlwy.net',
    database: 'railway',
    password:'HzTDuFFAXToAEOLwvJBPzubBTdwwwnMm',
    port:19002,
});

async function inserirProduto(desc,valor) {
    try{
        const sql = 'INSERT INTO tab_produto (desc_produto,valor_produto) VALUES ($1, $2)'
        const values = [desc,valor]
        await client.query(sql,values);
        await client.end()
        console.log.end()
        console.log('Dados foram inseridos')
    } catch(err){
        console.error('Não foi inserido')
    }
}

async function inserirEstoque(produto,quantidade) {
try{
const sql = 'INSERT INTO tab_estoque (produto_id,quantidade_produto) VALUES ($1, $2)'
const values = [produto,quantidade]
await client.query(sql,values);
await client.end()
console.log('Dados foram inseridos')
} catch(err){
console.error('Não foi inserido')
}
}

async function inserirDocumentacao(cliente,plano,corpo,carro,servicos,servicos_plus) {
try{
const sql = 'INSERT INTO tab_documentacao (cliente_id,plano_funerario,corpo_id,carro_id,servicos_id,servicos_complemetares_id) VALUES ($1, $2, $3, $4, $5, $6)'
const values = [cliente,plano,corpo,carro,servicos,servicos_plus]
await client.query(sql,values);
await client.end()
console.log('Dados foram inseridos')
} catch(err){
console.error('Não foi inserido')
}
}

async function verificarEstoque(produto,quantidade) {
try{
const sql = 'SELECT * FROM tab_estoque Where produto_id,quantidade_produto = $1, $2'
const values = [produto,quantidade]
const result = await client.query(sql,values);
await client.query(sql,values);
await client.end()
return result.rows.length >0;
} catch(err){
console.error('Erro ao verificar produto', err);
return false;
    }
}

async function verificarDocumentacao(cliente,plano,corpo,carro,servicos,servicos_plus) {
    try{
    const sql = 'SELECT * FROM tab_documentacao Where cliente_id,plano_funerario,corpo_id,carro_id,servicos_id,servicos_complemetares_id = $1, $2, $3, $4, $5, $6'
    const values = [cliente,plano,corpo,carro,servicos,servicos_plus]
    const result = await client.query(sql,values);
    await client.query(sql,values);
    await client.end()
    return result.rows.length >0;
    } catch(err){
    console.error('Erro ao verificar produto', err);
    return false;
        }
    }

    async function fetchProdutos() {
        try {
            const response = await fetch('http://localhost:3000/api/produtos');
            const produtos = await response.json();
            renderTable(produtos);
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
        }
    }

    function renderTable(produtos) {
        const tbody = document.querySelector('#tab_estoque tbody');
        tbody.innerHTML = '';
        produtos.forEach(produto => {
            const row = `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.produto}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.quantidade}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>
                        <button class="btn-edit">Editar</button>
                        <button class="btn-delete">Excluir</button>
                    </td>
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', row);
        });
    }

    window.onload = fetchProdutos;

    async function enviarCadastro(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os dados do formulário
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Monta o objeto para enviar à API
        const dados = {
            nome,
            cpf,
            email,
            senha
        };

        try {
            // Faz a requisição POST para a API
            const resposta = await fetch('https://sua-api-endereco.com/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                const resultado = await resposta.json();
                alert('Cadastro realizado com sucesso!');
                // Redireciona ou executa outra ação
            } else {
                alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        }
    }