import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { useState } from "react";

const TradeToken = (props:any) =>{
    const router = useRouter()
    const token = {
        token1: props.props.Token1,
        token2: props.props.Token2
    }
    const [time,setTime]:any = useState()
    const [asks,setAsks]:any = useState([])
    const [bids,setBids]:any = useState([])
    const [amout,setAmout]:any = useState(0)
    const [symbol,setSymbol]:any = useState()
    const [order,setOrder]:any = useState([])

 
    const orderFetch = async() =>{  

            const JSONdata = JSON.stringify(token)
            const endPoint = '/api/order'

            const option ={
                method: 'post',
                header:{
                    'content-Type': 'application/json',
                },
                body: JSONdata,
            }
            const response = await fetch(endPoint, option)
            const result = await response.json()
            if(result.success){
                Object.keys(result).map(key=>{
                    const ask = result.order.asks.slice(0,5)
                    const bid = result.order.bids.slice(0,5)
                    const timeStamp = result.order.lastUpdateId
                    setAsks(ask)
                    setBids(bid)
                    setTime(timeStamp)  
                })
            }

    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            orderFetch()
        },1000)
        return ()=> clearInterval(interval)
    },)

    const onBuy = async() =>{
        const date = time
        const priceAvg = () =>{
            let a:number = 0
            let b:number = 0
            asks.map((item:any)=>{
                a = a + (item[0]*item[1])
                b = b + parseFloat(item[1])
            })
            return a/b
        }
        const objBuy ={
            date: date,
            symbol: `${token.token1}_${token.token2}`,
            type: "Buy",
            price: priceAvg(),
            input: amout,
            output: amout/priceAvg()
        }
        setOrder([...order,objBuy])
    }
    
    const onSell = async() =>{
        const date = time
        const priceAvg = () =>{
            let a:number = 0
            let b:number = 0
            bids.map((item:any)=>{
                a = a + (item[0]*item[1])
                b = b + parseFloat(item[1])
            })
            return a/b
        }
        const objSell ={
            date: date,
            symbol: `${token.token1}_${token.token2}`,
            type: "Sell",
            price: priceAvg(),
            input: amout,
            output: amout/priceAvg()
        }
        setOrder([...order,objSell])
    }
    return(
        <div>   
                <h2>Ask</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Price(USDT)</th>
                            <th>Amout(BTC)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asks.map((item:any,index:number)=>{
                            return(
                                <tr key={index}>{item[0]}
                                    <td>{item[1]}</td>
                                    <td>{(item[0]*item[1])}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <h2>Bids</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Price(USDT)</th>
                            <th>Amout(BTC)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                        <tbody>
                            {bids.map((item:any,index:number)=>{
                                return(
                                    <tr key={index}>{item[0]}
                                        <td>{item[1]}</td>
                                        <td>{(item[0]*item[1])}</td>
                                    </tr>
                                )
                            })}
                        </tbody>    
                </table>
                
                <h4>Amout</h4>
                <input type="text" id="amout" onChange={event =>setAmout(event.currentTarget.value)}></input>
                <select value={symbol}
                    onChange={(e)=>{setSymbol(e.target.value)}}>
                    <option value={token.token2}>{token.token2}</option>
                    <option value={token.token1}>{token.token1}</option>
                </select><br/>
                <button type='button' onClick={onBuy}>Buy</button>&nbsp;
                <button type='button' onClick={onSell}>Sell</button>

                <h2>Order history</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Input</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item:any,index:number)=>{
                            return(
                                <tr key={index}>
                                    <td>{`#${index}`}</td>
                                    <td>{item.date}</td>
                                    <td>{item.symbol}</td>
                                    <td>{item.type}</td>
                                    <td>{item.price}</td>
                                    <td>{item.input}</td>
                                    <td>{item.output}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>                   
        </div>
    )
}
export default TradeToken