import { HistoryObject } from '../core/types';

const addToHistory = (historyObject: HistoryObject) => {
  const historyStackStringified = localStorage.getItem('historyStack');
  if (historyStackStringified) {
    const historyStack = JSON.parse(historyStackStringified);
    historyStack.push(historyObject);
    localStorage.setItem('historyStack', JSON.stringify(historyStack));
  } else {
    const historyStack = [];
    historyStack.push(historyObject);
    localStorage.setItem('historyStack', JSON.stringify(historyStack));
  }
};

export default addToHistory;
