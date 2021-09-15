const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Pedro Barros',
    email: 'pedro@mail.com',
    phone: '73954823556',
    category_id: uuid(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactRepository();
