import "./TaskContent.css";
import axios from "axios";
import { useEffect } from "react"

const TaskContent = (props) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getList');
  
        if (response.status === 200) {
          if (response.data && response.data.Array) {
            props.setList(
              response.data.Array.map((list) => {
                return {
                  id: list[1],
                  title: list[0],
                  finish: list[2],
                  buttonText: list[2] ? "Relist Task" : "Task Finished",
                };
              })
            );
          } else {
            console.error("No data received from the API.");
          }
        } else {
          console.error("Received a non-200 status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
  
    fetchData();
  }, []);
  


  const updateFinish = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/updateListStatus/${id}`);
      if (response.status === 200) {
        props.setList((prevList) =>
          prevList.map((list) => {
            if (list.id === id) {
              // Toggle finish value
              const newFinish = !list.finish;
              return {
                ...list,
                finish: newFinish,
                buttonText: newFinish ? "Relist Task" : "Task Finished",
              };
            }
            return list;
          })
        );
      } else {
        console.error("Received a non-200 status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  

  const removeKey = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deleteList/${id}`)
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
    const updatedList = props.list.filter((list) => list.id !== id);
    props.setList(updatedList);
  };

  return (
    <div className="TaskList"> 
      {props.list.map((list, index) => {
        return (
          <li className="TaskelementList" key={list.id}>
            <div
              className="Taskinside"
              style={{
                backgroundColor: list.finish ? "#86DC3D" : "#FFE800",
              }}
            >
              <div className="TasktitleList">
                {index + 1}) {list.title}
              </div>
              <button className="Taskfinish" onClick={() => updateFinish(list.id)}
                style={{
                    borderColor: list.finish ? "#FFE800" : "#86DC3D",
                }}
              >
                <span>{list.buttonText}</span>
              </button>
            </div>
            <button className="Taskdelete" onClick={() => removeKey(list.id)}>
              Delete Task
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default TaskContent;