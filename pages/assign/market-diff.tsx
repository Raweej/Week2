import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"



const Market = () => {
    const router = useRouter();
    const [tokens,setToken]:any = useState([]);
    
    const getToken = async (event:any) => {

        if(!event.target.token1.value || !event.target.token2.value){
            alert(`Some input empty`)
            event.preventDefault()
        }
        else{
            event.preventDefault()
            const data = {
                token1: event.target.token1.value.toUpperCase(),
                token2: event.target.token2.value.toUpperCase() 
            }

            const JSONdata = JSON.stringify(data)
            const endPoint = '/api/posts'

            const option ={
                method: 'post',
                header:{
                    'content-Type': 'application/json',
                },
                body: JSONdata,
            }
            const response = await fetch(endPoint, option)
            const result = await response.json()
            console.log("result: ",result)

            if(!result.success){
                alert(`Fail! cannot Fetch`)
            }
            else{
                setToken([...tokens,result])          
            }
        }
    }

    const handleRemoveItem = (data:any) =>{
        const findToken = tokens.filter((item:any) => item != data)
        setToken(findToken)      

    }

    return (
      <div >
        <button type="button" onClick={()=> router.push('/')}>Back to Home</button>

            <ul >
                <li><Link href="/assign/market-diff">
                    <a> Market-diff </a>
                    </Link>
                </li>

                <li><Link href="/assign/chart">
                    <a> Chart </a>
                    </Link>  
                </li>

                <li><Link href="/assign/trade">
                    <a> Trade </a>
                    </Link>  
                </li>
            </ul>

            <div >
                <h1 >Market Diff</h1>
                <form onSubmit={getToken}>
                    <label>Token 1</label><br/>
                    <input type="text" id="token1" name="token1" /><br/>

                    <label>Token 2</label><br/>
                    <input type="text" id="token2" name='token2'/><br/>
                    <button type="submit">Fetch</button>
                </form>
                
                <h2>List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Token 1</th>
                            <th>Token 2</th>
                            <th>Binance</th>
                            <th>FTX</th>
                            <th>Diff</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.sort(function(a:any,b:any){
                            const tokenA = a.nameT1 
                            const tokenB = b.nameT1
                            if(tokenA > tokenB){
                                return 1
                            }
                            else if(tokenA < tokenB){
                                return -1
                            }      
                            }).map((data:any,index:any) => {
                            return (
                                <tr key={index}>
                                    <td>{data.nameT1}</td>
                                    <td>{data.nameT2}</td>
                                    <td>{data.bi.price}</td>
                                    <td>{data.ftx.result.price}</td>
                                    <td>{(data.bi.price - data.ftx.result.price)}</td>
                                    <td>
                                        <button onClick={()=>handleRemoveItem(data)}>Del</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
            </div>

      </div>
    )
  }
  
  export default Market