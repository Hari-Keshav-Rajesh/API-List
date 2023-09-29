import "./Task.css"
import "../dark.css"
import TaskList from "./Task List/TaskList"

const Task = (props) => {
    return(
        <div className={[props.themeClass]}>
            <div>
                <TaskList />
            </div>
        </div>
    )
}

export default Task 