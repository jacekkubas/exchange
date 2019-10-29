import React from 'react';
import Output from '../output';
import Label from '../label';

class Form extends React.Component {
  state = {
    data: [],
    currency1: 0,
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
      currency2,
      currency2Symbol,
      data
    } = this.state;

    return (
      <form className="form">
        <div className="form__item">
          <Label text={'PLN amount'} />
          <input className="form__input" type="number" placeholder="amount" min="0" onChange={this.handleCurrency1} value={currency1} />
        </div>
        <div className="form__item">
          <Label text={'To'} />
          <select className="form__input" onChange={this.handleSelect} value={currency2Symbol}>
            <option value="">Choose currency</option>
            {data.length &&
              data.map(country => {
                return <option key={country.code} value={country.code}>{country.code}</option>
              })
            }
          </select>
        </div>
        <Output currency1={currency1} currency2={currency2} currency2Symbol={currency2Symbol} />
      </form>
    );
  }
}

export default Form;