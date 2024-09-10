const getRequestHistory = () => {
  const historyStackStringified = localStorage.getItem('historyStack');
  if (historyStackStringified) {
    const historyStack = JSON.parse(historyStackStringified);
    return historyStack;
  } else {
    return false;
  }
};

export default getRequestHistory;
