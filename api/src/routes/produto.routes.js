//Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Product'.

const router = require('express-promise-router')();
const produtoController = require('../controllers/produto.controller');

// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
router.post('/produtos', produtoController.criarProduto);
module.exports = router;

// ==> Rota responsável por listar todos os 'Products': (GET): localhost:3000/api/products
router.get('/produtos', produtoController.listarProdutos);

// ==> Rota responsável por selecionar "Product' por 'Id': (GET): localhost:3000/api/products/:id
router.get('/produtos/:id', produtoController.buscarProdutoPorId );

// ==> Rota responsável por atualizar 'Product' pelo 'Id': (PUT): localhost: 3000/api/products/:id
router.put('/produtos/:id', produtoController.atualizarProdutoPorId);

// ==> Rota responsável por excluir 'Product' pelo 'Id': (DELETE): localhost:3000/api/products/:id
router.delete('/produtos/:id', produtoController.deletarProdutoPorId);