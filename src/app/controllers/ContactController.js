class ContactController {
  index(request, response) {
    // Listar todos os registros

    response.send('Send from Contact Controller');
  }

  show() {
    // Obter um registro
  }

  store() {
    // Criar um novo registro
  }

  delete() {
    // Deletar um registro
  }
}

module.exports = new ContactController();
