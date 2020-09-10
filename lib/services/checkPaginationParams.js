const checkPaginationParams = (queryParam, defaulVaule) => {
  if (queryParam && parseInt(queryParam) && parseInt(queryParam) >= 1) {
    return parseInt(queryParam);
  }
  return defaulVaule;
};

export default checkPaginationParams;
