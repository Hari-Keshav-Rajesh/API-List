import { v4 } from "uuid";
import "./TaskForm.css";
import axios from "axios";
import Cookies from "js-cookie";



const TaskForm = (props) => {

  const onInput = (event) => {
    props.setValue(event.target.value);
  };
 
  const onSubmit = async(event) => {
    event.preventDefault();
    const newid = v4()
    if (props.value) {
      props.setList([
        ...props.list,
        {
          title: props.value,
          id: newid,
          finish: false,
          buttonText: "Task Finished",
        },
      ]);
      try {
        const config = {
          headers: {
              Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
        const response = await axios.post('http://localhost:8000/addList',{
          title:props.value,
          id:newid,
          finish:false,
        },config);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
      props.setValue("");
    }
  };

  const onDeleteAll = async() => {
    props.setList([]);
    try {
      const config = {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
      }
      const response = await axios.delete('http://localhost:8000/deleteAllList',config)
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return (
    <div className="TaskFormWrapper">
      <form onSubmit={onSubmit} className="TaskFormArea">
        <input
          className="TaskFormInput"
          type="text"
          value={props.value}
          placeholder="Enter Your Task"
          onChange={onInput}
        />

        <button type="submit" className="addButton" onSubmit={onSubmit}>
          Confirm
        </button>

        <button className="deleteAll" onClick={onDeleteAll}>
          Delete All
        </button>
      </form>
      <h2 className="subHeader">List of Tasks</h2>
    </div>
  );
};

export default TaskForm;