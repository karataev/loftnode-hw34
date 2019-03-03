const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

function init() {
  db.defaults({
    feedback: [],
    skills: [
      {
        "id": "age",
        "number": 120,
        "text": "Возраст начала занятий на скрипке"
      },
      {
        "id": "concerts",
        "number": 76,
        "text": "Концертов отыграл"
      },
      {
        "id": "cities",
        "number": 30,
        "text": "Максимальное число городов в туре"
      },
      {
        "id": "years",
        "number": 20,
        "text": "Лет на сцене в качестве скрипача"
      }
    ],
    products: [],
    users: [
      {
        "login": "admin@admin.ru",
        "hash": "bb2fe6fca66ada5590058d87ead1619a28b0e0fc1e6e3cded2a6126bb656947a5c139ac54b1e9c37d1f508e7ffa76e3f03db84246c54203145147b15d538655682f44ad9258acf3c7528c35ef183a55a2392e63e5ead58536eac8b9269d00c59b5ff58178bf6bc06cdef7b924f1cf6ec77e6c7f0ad41ac5ffa1f8d6697adf1791e04b09148b5ced6b94ba91cfa4021da27ee1b875f076c6cbf3b1917d710e6419fa78e863d6e3b99784e1fb612d9b91ca260611e98c8cc50adfe7c0696da39eb8c03585b023d47e601686de54c7048fc5b538971d45f04502372528972a90639ef2d26a7c095d9242beefaab6a8ad1718b0e85dcee5e67db5755ae03b94e596cfa215ea0777f540458d355f2cbaac9116ec31db9edc39f500eea26508471ee1dcc706470f38c043bb664f12224fe6853d3f6f0630e63488b97112b287e2c6edcfbc94cd6295b08dfdac6a9673bd3e80b82360f24aaa1afaf0c2f301a59565c5cce4bcce6418449fe2f510a1a95438384db20e3b5aeca4b395edb451fa0afb9a2377e3633f392c01b692c8be9a9a4ec60ada1b9226c7639a43ad66a499ce18fca704be178f57d8974e1146d7a31b77427aead0f7ffdfd06b033ff612fe162380a2078845e85fedef4bf933924639e2b4d2c9d82ce81a9d8c1aa7baba806c239a60e3785903f349c35b867ebd0afe1439dcbb80f39995d89d862c35a9bc087e704",
        "salt": "5cce3d338d0566a7b6b93eef2418ecb3"
      }
    ],
  })
    .write();
}

function addFeedback(name, email, message) {
  db.get('feedback')
    .push({name, email, message})
    .write();
}

function getSkills() {
  return db.get('skills')
    .value();
}

function saveSkills(items) {
  db.get('skills')
    .find({id: 'age'})
    .assign({number: items[0]})
    .write();

  db.get('skills')
    .find({id: 'concerts'})
    .assign({number: items[1]})
    .write();

  db.get('skills')
    .find({id: 'cities'})
    .assign({number: items[2]})
    .write();

  db.get('skills')
    .find({id: 'years'})
    .assign({number: items[3]})
    .write();
}

function getProducts() {
  return db.get('products')
    .value();
}

function addProduct(name, price, img) {
  db.get('products')
    .push({
      src: img,
      name,
      price,
    })
    .write();
}

function getUser(login) {
  return db.get('users')
    .find({login})
    .value();
}

module.exports = {
  init,
  addFeedback,
  getSkills,
  saveSkills,
  getProducts,
  addProduct,
  getUser,
};
