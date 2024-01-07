
import { ReactHTML, ReactHTMLElement, useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import  Axios  from 'axios';



export type TaskType = {
  id: number;
  name?: string;
  completed: boolean;
  deleteTask:  (event: React.MouseEvent<HTMLButtonElement> , id: number) => void;
  completeTask:  (event: React.MouseEvent<HTMLButtonElement> , id: number) => void;
}

const URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

const App = () => {

  const [text, setText] = useState<string>("");
  const [data, setData] = useState<object[]>([]);
  const [excuse, setExcuse] = useState<string>("");
  const fetchData = () => {
    Axios.get(URL).then( (res) => {
      console.log(res.data);
      setData(res.data);
    });
  }
  const fetchExcuse = (e: React.MouseEvent<HTMLButtonElement>, excuse: string) => {
    const URL_EXCUSE = `https://excuser-three.vercel.app/v1/excuse/${excuse}/`;
    Axios.get(URL_EXCUSE).then( (res) => {
      console.log(res);
      setExcuse(res.data[0].excuse);
    });
  }

  useEffect( () => {
    console.log("component mounted");

    fetchData();



    return () => {
      console.log("component unmount")
    }
  }, [text])


  const [todoList, setTodoList] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setNewTask(e.target.value);
  }

  const addTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    const task: TaskType = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      name: newTask,
      completed: false,
      deleteTask: deleteTask,
      completeTask: completeTask
    }
    setTodoList(task.name !== "" ? [...todoList, task] : todoList);
  }
  
  const deleteTask = (event: React.MouseEvent<HTMLButtonElement>, index: number): void => {
    if (event) {
      event.preventDefault();

      console.log(index)
      const newTodoList = todoList.filter((t) => t.id !== index);
      setTodoList(newTodoList);
    }
  }
  const completeTask = (event: React.MouseEvent<HTMLButtonElement>,id:number) => {
    if (event) {
      event.preventDefault();
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setText(e.target.value);
  }

  return (<>
    <div className="App">
      <div className="addTask">
        <input onChange={ (event) => handleChange(event)}/>
        <button onClick={(event) => addTask(event)}>Add Task</button>
      </div>
      <br/> <br/>
      <div className="list">
      {todoList.map((task) => {
        return (
        <Task 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        deleteTask={deleteTask}
        completeTask={completeTask}
          />
        )
      })}

      </div>
      <input onChange={(e) => handleInputChange(e)}></input>
        <h3>{text}</h3>
      </div>

      <div style={{display:'flex', textAlign:'justify'}}>
        
        <button onClick={(e) => fetchExcuse(e, 'party')}>party</button>
        <button onClick={(e) => fetchExcuse(e, 'office')}>office</button>
        <button onClick={(e) => fetchExcuse(e, 'family')}>family</button>
        
      </div>
      <h3>{excuse}</h3>
      </>
  );
}

export default App;
