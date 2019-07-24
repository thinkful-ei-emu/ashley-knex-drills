const ShoppingService = require('../src/service/shopping-list-service.js');
const knex = require('knex');


describe('Shopping service object', function() {
  
  let db;
  let testItems = [
   
    {
      list_id: 1,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main'
    },
    {
      list_id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
    {
      list_id: 3,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch'
    },
    {
      list_id: 4,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast'
    },
  ];

  
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });


  before(() => db('shopping_list').truncate());  

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db 
        .into('shopping_list')
        .insert(testItems);
    });
    it('getAllItems() resolves all items from \'shopping_list\' table', () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }))
      // test that ShoppingService.getAllItems gets data from table
      return ShoppingService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems);
        });
    });
  });

  context('Given \'shopping_list\' has no data', () => {
    it('getAllItems() resolves an empty array', () => {
      return ShoppingService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
  }); 
  

 

  

 
  
  
 
  
  
});




 
