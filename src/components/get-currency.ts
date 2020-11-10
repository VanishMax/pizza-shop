const getCurrency = (currentCur: 'usd'|'eur'|null, add: string|{usd: number, eur: number}) => {
  if (currentCur === null) return '';

  let curr = currentCur === 'usd' ? '$' : '€';

  if (typeof add === 'string') return curr + add;
  return curr + add[currentCur];
};
export default getCurrency;
