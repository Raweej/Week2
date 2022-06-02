// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

// const api_Binace: string = 'https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT'

// export async function getStaticProps () {
//     const res = await fetch(api_Binace)
//     const data = await res.json()
//     console.log(data)
//     return{
//         props: {obj: data}
//     }
// }