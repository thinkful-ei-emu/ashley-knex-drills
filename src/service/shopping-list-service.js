
const ShoppingService = {
  getAllItems(db) {
    return db.select('*').from('shopping_list');      
  },
  getById(db, id) {
    return db
      .from('shopping_list')
      .select('*')
      .where('id', id)
      .first();
  },
  deleteItem(db, id) {
    return db('shopping_list')
      .where({ id })
      .delete();
  },
  updateItem(db, id, newItemFields) {
    return db('shopping_list')
      .where({ id })
      .update(newItemFields);
  },
  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0]);
  },
};


module.exports = ShoppingService;
