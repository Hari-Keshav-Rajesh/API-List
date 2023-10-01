import { useState } from "react"
import TaskForm from "./Task List/Task Form/TaskForm";
import TaskContent from "./Task List/Task Content/TaskContent";
import "./TaskList.css"

const TaskList = (props) => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);

    var TaskFormProps = { value, setValue, list, setList };
    var TaskContentProps = { list, setList };

    return (
        <div className="TaskList">
        <div className="TaskListTitle">{props.user}'s To-Do List</div>
        <TaskForm {...TaskFormProps} />
        <TaskContent {...TaskContentProps} />
        </div>
    )
}

export default TaskList