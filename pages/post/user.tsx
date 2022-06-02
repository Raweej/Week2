import Link from "next/link"

export async function getStaticProps () {
    const res = await fetch("https://ftx.com/api/markets/BTC/USDT")
    const datas = await res.json()
    console.log(datas)
    return{
        props: datas
    }
}

const Post = (datas:any) => {
    const name = [{first:"raweeroj",last:"anontachutikarn"}]
    const obj = []
    obj.push(datas)
    console.log(datas)
    return(
        <>
            <Link href="/"><a>Back to index</a></Link>
            <h1>This is Post User page</h1>
            {obj.map((data) => (
                <div>
                    <a>
                        <h3>{data.result.name}</h3>
                    </a>
                </div>
            ))}

        </>
    )    
}

export default Post