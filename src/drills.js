require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});


//drill 1
// function searchByItemName(searchTerm) {
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .where('name', 'ILIKE', `%${searchTerm}%`)
//     .then(result => {
//       console.log(result);
//     });
// }

// searchByItemName('Fish');

//drill 2
// function paginateItems(pageNumber) {

//   knexInstance('shopping_list')
//     .select('name', 'price', 'category')    
//     .limit(pageNumber)   
//     .then(result => {
//       console.log(result);
//     });
// }

// paginateItems(6);

//drill 3
// function itemsBydate(daysAgo) {

//   knexInstance('shopping_list')
//     .select('name', 'date_added')      
//     .where(
//       'date_added',
//       '<',
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)) 
//     .then(result => {
//       console.log(result);
//     });
// }

// itemsBydate(20);

function totalCost() {

  knexInstance('shopping_list')
    .select('category')
    .sum('price AS totalCost')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });      
   
}
totalCost();