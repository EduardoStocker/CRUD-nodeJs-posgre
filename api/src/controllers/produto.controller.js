const db = require("../config/database");


exports.criarProduto = async (req, res) => {
  const { produtonome, quantidade, preco, produtodescricao } = req.body;
  try {
      const { rows } = await db.query(
        "INSERT INTO produtos (produtonome, quantidade, preco, produtodescricao) VALUES ($1, $2, $3, $4)",
        [produtonome, quantidade, preco, produtodescricao]
      );
        res.status(201).send({
          message: "Produto adicionado com sucesso!",
          body: {
            produto: { produtonome, quantidade, preco, produtodescricao },
          },
        });
  } catch (error) {
    console.error('criarProduto', error);
    res.status(500).send({
      message: "Ocorreu um erro."
    });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT
                                      produtoId,
                                      produtoNome,
                                      quantidade,
                                      preco,
                                      produtodescricao
                                      FROM produtos ORDER BY produtoNome asc`);
    res.status(200).send(rows)
  } catch (error) {
    console.error('listarProdutos', error);
    res.status(500).send({
       message: "Ocorreu um erro."
    });
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`SELECT
                                      produtoId,
                                      produtoNome,
                                      quantidade,
                                      preco,
                                      produtodescricao
                                      FROM produtos WHERE produtoId = $1`
      ,[id]
    );
    if(!rows.length){
      throw 'produto_nao_encontrado';
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    console.error('buscarProdutoPorId', error);
    if (error == 'produto_nao_encontrado'){
      res.status(400).send({
        message: "Produto não encontrado"
      });
    } else {
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  }
};

exports.atualizarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const { produtonome, quantidade, preco, produtodescricao } = req.body;
    const { rows } = await db.query(`UPDATE produtos
                                      SET produtoNome = $1,
                                      quantidade = $2,
                                      preco = $3,
                                      produtodescricao = $4
                                      WHERE produtoId = $5`
      ,[produtonome, quantidade, preco, produtodescricao, id]
    );
    res.status(200).send({message: "Produto atualizado!"});
  } catch (error) {
    console.error('atualizarProdutoPorId', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
};

exports.deletarProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM produtos WHERE produtoid = $1', [id]);
    res.status(200).send({ message: "Produto deletado com sucesso!"});
  } catch (error) {
    console.error('deletarProdutoPorId', error);
    res.status(500).send({ 
      message: "Ocorreu um erro."
    });
  }
};