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
