import { TaskType } from "../App"
import '../App.css';

const Task: React.FC<TaskType> = ({id, name, completed, deleteTask, completeTask}) => {

return (
    <>
        {/**/}
        <div className="task"
        style={{ backgroundColor: completed===true ? "green" : "white" }}>
            <h1>{id}:{name}</h1><span>&nbsp;</span>
           
            <button onClick={(e) => deleteTask(e,id)} >delete</button>
            <button onClick={(e) => completeTask(e,id)} >complete</button>
        </div>
        <br/>

    </>
)
}

export default Task