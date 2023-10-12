import "./Home.css"
import "../dark.css"

const Home = (props) =>{
    return(
        <div className={[props.themeClass]}>
            <div className="homeTitle">Welcome @<span className="homeTitleUser">{props.user}</span></div>
        </div>
        
    )
}

export default Home 