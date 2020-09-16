/**
 * Function pagination: paginates given data regarding limit and page
 * format returned
 *
 * {
 *  "total": {
 *      "pages": 20
 *  },
 *  "next": {
 *      "page": 2,
 *      "limit": 10
 *  },
 *     "previous": {
 *      "page": 1,
 *      "limit": 10
 * },
 *  "results": [...results]
 * }
 *
 * @param  {number} limt    length of data to be returned in results field
 * @param  {number} page    page of data to return in results field, acording to limit param
 * @param  {Array}  data    data to paginate
 * @return {Objet} data paginated regarding limit and page, results field as a json object
 */

const pagination = (limit, page, data) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.total = {
    pages: Math.ceil(data.length / limit),
  };

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0 && page <= results.total.pages) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  results.results = data.slice(startIndex, endIndex);

  return results;
};

export default pagination;
