import React, {Component} from 'react'
import './RowInfo.css'

const RowInfo = ({name, mktCap, price, volume, supply, change, number, lastTradeID}) => {
    return <tr className="row">
      <td className="number"> {number} </td>
      <td className="name">{name}</td>
      <td>${mktCap}</td>
      <td>${price}</td>
      <td>${volume}</td>
      <td>{supply} {name}</td>
      { change > 1 ? <td className="up">{change}%</td>
      : <td className="down">{change}%</td>
      }
      <td>{lastTradeID}</td>

    </tr>
}

export default RowInfo;
