const ShoppingService = require('../src/service/shopping-list-service.js');
const knex = require('knex');


describe('Shopping service object', function() {
  
  let db;
  let testItems = [
   
    {
      id: 1,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),      
      price: '12.00',
      category: 'Main'
    },
    {
      id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),      
      price: '21.00',
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),      
      price: '3.00',
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'Fourth test item!',
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

  context('Given \'shopping_list\' has data', () => {
    beforeEach(() => {
      return db 
        .into('shopping_list')
        .insert(testItems);
    });

    it('getAllItems() resolves all items from \'shopping_list\' table', () => {
      const expectedItems = testItems.map(item => ({
        ...item,
        checked: false,
      }));
      
      // test that ShoppingService.getAllItems gets data from table
      return ShoppingService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(expectedItems);
        });
    });
  });

  it('getById() resolves an item by id from \'shopping_list\' table', () => {
    const idToGet = 3;
    const thirdItem = testItems[idToGet - 1];
    
    return ShoppingService.getById(db, idToGet)
      .then(actual => {
        
        expect(actual).to.eql({
          id: idToGet,
          name: thirdItem.name,
          date_added: thirdItem.date_added,
          price: thirdItem.price,
          category: thirdItem.category,
          checked: false,
        });
      });
  });

  it('deleteItem() removes an item by id from \'shopping_list\' table', () => {
    const itemId = 3;
    return ShoppingService.deleteItem(db, itemId)
      .then(() => ShoppingService.getAllItems(db))
      .then(allItems => {
        // copy the test items array without the removed item
        const expected = testItems
          .filter(item => item.id !== itemId)
          .map(item => ({
            ...item,
            checked: false,
          }));
        expect(allItems).to.eql(expected);
      });
  });

  it('updateItem() updates an item from the \'shopping_list\' table', () => {
    const idOfItemToUpdate = 3;
    const newItemData = {
      name: 'updated title',
      price: '99.99',
      date_added: new Date(),
      checked: true,
    };
    const originalItem = testItems[idOfItemToUpdate - 1];
    return ShoppingService.updateItem(db, idOfItemToUpdate, newItemData)
      .then(() => ShoppingService.getById(db, idOfItemToUpdate))
      .then(item => {
        expect(item).to.eql({
          id: idOfItemToUpdate,
          ...originalItem,
          ...newItemData,
        });
      });
  });


  it('insertItem() inserts an item and resolves the item with an \'id\'', () => {
    const newItem = {
      name: 'Test new name name',
      price: '5.05',
      date_added: new Date('2020-01-01T00:00:00.000Z'),
      checked: true,
      category: 'Lunch',
    };
    return ShoppingService.insertItem(db, newItem)
      .then(actual => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          date_added: newItem.date_added,
          checked: newItem.checked,
          category: newItem.category,
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


    
  





 
