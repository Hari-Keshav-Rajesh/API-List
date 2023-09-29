import { useState } from "react"
import TaskForm from "./Task Form/TaskForm";
import TaskContent from "./Task Content/TaskContent";
import "./TaskList.css"

const TaskList = () => {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);

    var TaskFormProps = { value, setValue, list, setList };
    var TaskContentProps = { list, setList };

    return (
        <div className="TaskList">
        <div className="TaskListTitle">Employee To-Do List</div>
        <TaskForm {...TaskFormProps} />
        <TaskContent {...TaskContentProps} />
        </div>
    )
}

export default TaskList