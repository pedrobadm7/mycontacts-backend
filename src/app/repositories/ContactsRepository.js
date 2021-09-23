const db = require('../../database');

class ContactRepository {
  async findAll(orderBy = '') {
    // SELECT serve para pegar um ou vários registros (linhas) e depois do SELECT é preciso pegar as colunas
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
      `);
    return rows;
  }

  async findById(id) {
    // SELECT * FROM contacts WHERE contacts.id significa pegar todas as colunas da tabela contato quando o id for igual ao id passado no parametro
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1`,
    [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id= $1', [id]);
    return deleteOp;
  }

  async create({
    name,
    email,
    phone,
    category_id,
  }) {
    // No metodo INSERT TO nos dizemos dentro de qual tabela iremos trabalhar(neste caso a tabela contacts) e dentro do parentese colocamos o nome das colunas que iremos preencher para esta linha. Quando não preenchemos uma coluna, o POSTGRES irá procurar no schema um valor default para ela. Através do VALUES definimos o valor que será posto dentro de cada uma dessas colunas pra essa linha que está sendo inserida. Quando retorna row é preciso lembrar que o retorno da client.query é um array e dentro do meu controller é pego apenas o contato, portanto desestruturamos o array e pegamos apenas a primeira posição e colocamos dentro do array row.
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name,
    email,
    phone,
    category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }
}

module.exports = new ContactRepository();
