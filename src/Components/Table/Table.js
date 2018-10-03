import React, { Component } from 'react';
import RowInfo from '../RowInfo/RowInfo'
import './Table.css'

class Table extends Component {
  constructor(props){
    super(props)
    this.state = {
      currencies: []
    }

  }

  componentDidMount(){
    this.setState({currencies: []})
    fetch(this.props.url)
    .then(data => data.json())
    .then(data => data.RAW)
    .then(data => {
      Object.values(data).forEach(coin => {
        let temp = {
          name: coin.USD.FROMSYMBOL,
          mktCap: parseFloat(coin.USD.MKTCAP).toFixed(2),
          price:  parseFloat(coin.USD.PRICE).toFixed(2),
          volume: parseFloat(coin.USD.VOLUME24HOUR).toFixed(2),
          supply: parseFloat(coin.USD.SUPPLY).toFixed(2),
          change: parseFloat(coin.USD.CHANGEPCT24HOUR).toFixed(2),
          lastTradeID: parseFloat(coin.USD.LASTTRADEID).toFixed(2)
        }
        let currencies = this.state.currencies.slice()
        currencies.push(temp)
        this.setState({currencies})
      })
      const temp = this.state.currencies.slice().sort((obj1, obj2)=>{
        return obj2.mktCap - obj1.mktCap
      })
      temp.forEach((obj, index)=> obj["number"] = index+1)
      this.setState({currencies: temp})
    })
  }

  render() {
    const currencies = this.state.currencies.map((coin, number) => {
      coin[number] = number
      return <RowInfo key={number} {...coin} />
    })

    return (
        <div>
          <table id="table">
            <thead id="top">
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Market Cap</td>
                <td>Price</td>
                <td>Volume(24h)</td>
                <td>Circulating Supply</td>
                <td>Change (24h)</td>
                <td>Last Trade ID</td>
              </tr>
            </thead>
            <tbody>{currencies}</tbody>
          </table>
        </div>
    );
  }
}

Table.defaultProps = {
  url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,EOS,BCH,LTC,ETC,XRP,ADA,TRX,XLM,NEO,VEN,DASH,QTUM,BNB&tsyms=USD"
}

export default Table;
