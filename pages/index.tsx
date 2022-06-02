import Head from 'next/head'
import Link from 'next/link'
// import '../styles/home.css'


const Home = () => {
  return (
  <div className='flex w-[100%] max-w-[1280px] m-auto'>
    <div className="md:text-3xl text-blue-600 p-2 flex-none w-14 h-14">
      <ul>
        <li className="font-serif ">
          <Link href='/days/day1'><a >Day1</a></Link>
        </li>
        <li className='font-mono'>
          <Link href='/assign/market-diff'><a>Assign</a></Link>
        </li>
      </ul>
      
    </div>
  </div>
  )
}

export default Home
