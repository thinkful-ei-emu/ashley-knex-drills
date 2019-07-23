const ShoppingService = require('../src/service/shopping-list-service.js');
const knex = require('knex');


describe('Shopping service object', function() {
  
  let db;
  let testItems = [
   
    {id: 1,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      name:'Fish tricks', 
      price: 13.10, 
      category: 'Lunch', 
      checked: false, 
      
    },
    {id: 2,
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      name:'Steak', 
      price: 25.10, 
      category: 'Main', 
      checked: false, 
     
    },
    {id: 3,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      name:'Tofurkey', 
      price: 11, 
      category: 'Breakfast', 
      checked: true, 
      
    }
  ];
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });
  context(`Given 'shopping_list' has data`, () => {
    before(() => {
      return db 
        .into('shopping_list')
        .insert(testItems);
    });
    it('getAllItems resolves all items from \'shopping_list\' table', () => {
      // test that ShoppingService.getAllItems gets data from table
      return ShoppingService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
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
  
  before(() => db('shopping_list').truncate());
  
  
  

  afterEach(() => db('shopping_list').truncate());
  

  after(() => db.destroy());
  
  
 
  
  
});




 
