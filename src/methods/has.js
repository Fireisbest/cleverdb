
const get = require('lodash/get');

module.exports = function(db, params, options) {

  let fetched = db.prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`).get(params.id);
  if (!fetched) return false; 
  else fetched = JSON.parse(fetched.json);
  
  if (params.ops.target) fetched = get(fetched, params.ops.target); 

  return (typeof fetched != 'undefined');
  
} 
