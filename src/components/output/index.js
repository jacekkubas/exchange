import React from 'react';

const Output = ({ currency1, currency1Symbol, currency2, currency2Symbol}) => {
  return ( 
    <div className="output">
      <span className="output__text">{currency1} PLN = </span>
      <span className="output__text">{currency1 * currency2} {currency2Symbol}</span>
    </div>
   );
}
 
export default Output;