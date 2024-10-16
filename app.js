import fs from 'fs';
import http from 'http';
import sqlite3 from 'sqlite3';
import { criarProduto, leProdutos, sequelize } from './models.js';
import rotas from './routes.js';

const db = new sqlite3.Database('./tic.db', (erro) => {
    if (erro){
        console.log('Falha ao inicializar o banco de dados');
        return;
    }
    console.log('Banco de dados inicializado com sucesso');
});

fs.writeFile('./mensage.txt', 'Olá, TIC em trilhas do arquivo!', 'utf-8', (erro) => {
    if (erro) {
        console.log('Falha ao escrever o arquivo', erro);
    }
    console.log('Arquivo foi criado com sucesso');
});

fs.readFile('./mensagem.txt', 'utf-8', (erro, conteudo) => {
    if(erro){
        console.log('Falha na leitura do arquivo', erro);
        return;
    }

    console.log(`Conteúdo: ${conteudo} `);

    iniciarServidorHttp(conteudo);
});

async function iniciarServidorHttp(conteudo){
    await sequelize.sync();

    await criarProduto({nome: "Açaí Tradicional", preco: 10.50});
    await criarProduto({nome: "Açaí com Granola", preco: 12.50});
    await leProdutos();

const servidor = http.createServer((req, res) => {
    rotas(req, res, { conteudo });
});


const porta = 3000;
const host = 'localhost';

servidor.listen(porta,host,() => {
    console.log(`Servidor executando em http://${host}:${porta}/`);
});
}