import styles from '../../styles/Home.module.css'
import Link from "next/link"
import { useRouter } from 'next/router'
import TradeToken from '../components/TradeToken'
import { useState } from 'react'

const Trade = () =>{
    const router = useRouter()
    const [order, setOder]:any = useState('')

    const getToken = async(event:any) =>{
        if(!event.target.token1.value || !event.target.token2.value){
            alert(`Some input empty`)
            event.preventDefault()
        }
        else{
            event.preventDefault()
            const nameToken1 = event.target.token1.value.toUpperCase()
            const nameToken2 = event.target.token2.value.toUpperCase()
            
            setOder({Token1: nameToken1, Token2: nameToken2})
            
        }
    }
    return(
        <div>
            <button onClick={()=>router.push('/')}> Back to Home </button>
            <ul>
                <li><Link href="/assign/market-diff"><a> Market-diff </a>
                    </Link></li>
                <li><Link href="/assign/chart"><a> Chart </a>
                    </Link>  </li>
                <li><Link href="/assign/trade"><a> Trade </a>
                    </Link></li>
            </ul>
            <div>
                <h1>Trade</h1>
                    <form onSubmit={getToken}>
                        <label>Token 1</label><br/>
                        <input type="text" id="token1" name="token1" /><br/>

                        <label>Token 2</label><br/>
                        <input type="text" id="token2" name='token2'/><br/>
                        <button type="submit">Fetch</button>
                    </form>
                <TradeToken props={order}/>
                
            </div>
        </div>
    )
}

export default Trade