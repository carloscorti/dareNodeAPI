/**
 * Function policiesFormatData: sets required user date format
 *[
 *  {
 *    "id": "string",
 *    "amountInsured": "string",
 *    "email": "string",
 *    "inceptionDate": "string",
 *    "installmentPayment": true
 *  }
 *]
 *
 * @param  {Array} policiesList  policies list to format
 * @return {Array} json with correct policies data format
 */
const policiesFormatData = (policiesList) => {
  const formatedPolicies = policiesList.reduce((policiesAcc, policie) => {
    policiesAcc = policiesAcc || [];
    delete policie.clientId;
    policiesAcc.push(policie);
    return policiesAcc;
  }, []);

  return formatedPolicies;
};

export default policiesFormatData;
