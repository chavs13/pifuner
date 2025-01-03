const express= require('express');
const [ Pool ] = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'Postgres',
    host:'192.0.0.1',
    database: 'funeraria',
    password:'123mudar',
    port:5432,
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