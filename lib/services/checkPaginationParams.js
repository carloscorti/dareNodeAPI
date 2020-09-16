/**
 * Function checkPaginationParams: checks if query param exits and if it's an intiger >= 1
 * if not returns default value
 *
 * @param  {string} queryParam  uqery to check
 * @param  {number} defaulVaule default value to in case check fails
 * @return {number} if check passes returns query as an intiger if not returns defaultValue param
 */

const checkPaginationParams = (queryParam, defaulVaule) => {
  if (queryParam && parseInt(queryParam) && parseInt(queryParam) >= 1) {
    return parseInt(queryParam);
  }
  return defaulVaule;
};

export default checkPaginationParams;
