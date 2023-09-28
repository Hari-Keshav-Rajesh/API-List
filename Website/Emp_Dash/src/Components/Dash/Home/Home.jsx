import "./Home.css"
import "../dark.css"

const Home = (props) =>{
    return(
        <div className={[props.themeClass]}>
            <div>Welcome to Home {props.user}</div>
        </div>
    )
}

export default Home 