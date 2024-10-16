import { Sequelize } from 'sequelize';

export const sequelize = new  Sequelize({
    dialect: 'sqlite',
    storage: './tic.db'
});

sequelize.authenticate();

export const Produto = sequelize.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

export async function criarProduto(produto) {
    try {
        await Produto.create(produto);
    console.log(`O produto ${produto.nome} foi criado com sucesso!`);
    } catch (erro){
        console.log('Erro ao criar produto', erro);
    }
    
}

export async function leProdutos() {
    try {
        const resultado = await Produto.findAll();
    console.log(`Produtos consultados com sucesso!`, resultado);
    } catch (erro){
        console.log('Erro ao buscar produto', erro);
    }
    
}

