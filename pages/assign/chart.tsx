import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic";


const Chart = () => {
    const router = useRouter()
    const [datas, setDatas]:any = useState([])
    const arr:any = [];

    const ChartToken = dynamic(() => import("../components/ChartToken"),{
        ssr:false
    })

    const getToken = async(event:any) => {
        if(!event.target.token1.value || !event.target.token2.value){
            alert(`Some input empty`)
            event.preventDefault()
        }
        else{
            event.preventDefault()
            const nameToken1 = event.target.token1.value.toUpperCase()
            const nameToken2 = event.target.token2.value.toUpperCase()


            const ulrBinance = await fetch(`https://api1.binance.com/api/v3/klines?interval=1h&symbol=${nameToken1}${nameToken2}`)
                .then(res => res.json())
                .catch((err) => console.error(err))

            

            for(let i = 0; i < ulrBinance.length; i++){
                
                const time = ulrBinance[i][0]
                const date = new Date(time*1000).toISOString().slice(0,10).replace('T','')
                // const dateFull = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

                let op: number = ulrBinance[i][1]
                let hi: number = ulrBinance[i][2]
                let lo: number = ulrBinance[i][3]
                let clo: number = ulrBinance[i][4]

                const obj = {
                    time: date,
                    open: op,
                    high: hi,
                    low: lo,
                    close: clo
                }
                arr.push(obj)
                setDatas(arr)   
            }
        }
    }

    return(
        <div>
            <button type="button" onClick={()=> router.push('/')}>Back to Home</button>
            <ul >
                <li><Link href="/assign/market-diff"><a> Market-diff </a>
                    </Link></li>
                <li><Link href="/assign/chart"><a> Chart </a>
                    </Link>  </li>
                <li><Link href="/assign/trade"><a> Trade </a>
                    </Link></li>
            </ul>
            <div>
                <h1>Chart</h1>
                    <form onSubmit={getToken}>
                        <label>Token 1</label><br/>
                        <input type="text" id="token1" name="token1" /><br/>

                        <label>Token 2</label><br/>
                        <input type="text" id="token2" name='token2'/><br/>
                        <button type="submit">Fetch</button>
                    </form>
                <ChartToken props={datas}/>
            </div>
        </div>
    )
}
export default Chart