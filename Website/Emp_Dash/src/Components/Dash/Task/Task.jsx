import "./Task.css"
import "../dark.css"
import TaskList from "./TaskList"

const Task = (props) => {
    return(
        <div className={[props.themeClass]}>
            <div>
                <TaskList user={props.user}/>
            </div>
        </div>
    )
}

export default Task 