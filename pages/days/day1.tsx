import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import me from './luna-terra.gif'


const Day1 = () => {
    return(
        <div >
            <h2>This is a heading LUNA in a div element</h2>
            <p>This is some <span style={{ color: 'red' }}>Luna</span> in a div element. </p>
            <Image
                src={me}
                alt='Picture Luna'
                width={350}
                height={150}
            /><br/>

            <button className={styles.button1}> YES</button>
            <button className={styles.button2}> NO</button><br/>

            <label>Choose your coin</label><br/>
            <select name="cars" id="cars">
                <option value="Luna">Luna</option>
                <option value="The Luna">The Luna</option>
                <option value="Yes Luna">Yes Luna</option>
                <option value="Ok Luna">Ok Luna</option>
            </select><br/><br/>
                
            <form action="/" method="post">
                <label >First name: </label>
                <input type="text" id="first" name="first" /><br/>
                <label >Last name: </label>
                <input type="text" id="last" name="last" /><br/>
                <button type="submit">Submit</button>
            </form>                   

        </div>
    )
}

export default Day1