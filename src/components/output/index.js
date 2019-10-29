import React from 'react';

const Output = ({ currency1, currency2, currency2Symbol }) => {
  return (
    <div className="output">
      {currency1 > 0 && currency2 > 0 &&
        <div>
          <span className="output__text">{currency1} PLN = </span>
          <span className="output__text">{currency1 * currency2} {currency2Symbol}</span>
        </div>
      }

      {(currency1 <= 0 || currency2 === 0) ? <div>Choose pln amount and currency</div> : null}
    </div>
  );
}

export default Output;