/**
 * Function filterByQuery: filters data on a given fied by query param, not case sensitive
 *
 * @param  {string} query   query to filter by
 * @param  {string} field   field in wich do the filter
 * @param  {Array}  data    json object to filter
 * @return {Array} json object filtered
 */

const filterByQuery = (query, field, data) => {
  const regExp = new RegExp(query.trim(), 'i');
  return data.filter((item) => item[`${field}`].match(regExp));
};

export default filterByQuery;
