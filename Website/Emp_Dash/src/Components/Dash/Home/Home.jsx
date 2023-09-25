import "./Home.css"

const Home = (props) =>{
    return(
        <div className={props.homeClass}>
            <div>Welcome to Home {props.user}</div>
        </div>
    )
}

export default Home