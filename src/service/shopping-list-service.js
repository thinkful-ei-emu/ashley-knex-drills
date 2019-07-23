
const ShoppingService = {
  getAllItems(db) {
    return db.select('*').from('shopping_list');      
  }
};



module.exports = ShoppingService;
