import React from 'react';
import Output from '../output';

class Form extends React.Component {
  state = {
    data: [],
    currency1: 0,
    currency1Symbol: 'pln',
    currency2: 0,
    currency2Symbol: ''
  }

  handleCurrency1 = (e) => {
    this.setState({ currency1: e.target.value });
  }

  handleSelect = (e) => {
    const symbol = e.target.value;

    fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${symbol}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          currency2: response.rates[0].mid,
          currency2Symbol: symbol
        });
      })
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  componentDidMount() {
    fetch(`http://api.nbp.pl/api/exchangerates/tables/a/last`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response[0].rates,
        })
      })
  }

  render() {
    const { 
      currency1,
      currency1Symbol,
      currency2, 
      currency2Symbol,
      data
    } = this.state;

    return (
      <form className="form">
        <div className="form__input-wrapper">
          <label className="form__label">{currency1Symbol}:</label>
          <input className="form__input" type="number" placeholder="amount" min="0" onChange={this.handleCurrency1} value={currency1} />
        </div>
        <div className="form__input-wrapper">
          <label className="form__label">To:</label>
          <select className="form__input" onChange={this.handleSelect} value={currency2Symbol}>
            <option value="">Choose currency</option>
            {data.length &&
              data.map(country => {
                return <option key={country.code} value={country.code}>{country.code}</option>
              })
            }
          </select>
        </div>
        {currency1 > 0 && currency2 > 0 &&
          <Output currency1={currency1} currency1Symbol={currency1Symbol} currency2={currency2} currency2Symbol={currency2Symbol} />
        }
      </form>
    );
  }
}

export default Form;