import "./TaskContent.css";

const TaskContent = (props) => {
  const updateFinish = (id) => {
    props.setList(
      props.list.map((list) => {
        if (list.id === id) {
          if (list.finish === true) {
            return { ...list, finish: false, buttonText: "Task Finished" };
          } else {
            return { ...list, finish: true, buttonText: "Relist Task" };
          }
        } else {
          return list;
        }
      }),
    );
  };

  const removeKey = (id) => {
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