import { useState } from 'react';
import './App.css';

function App() {
     const [todo,setTodo] = useState('')
     const [todos,setTodos] = useState([])
    const [editId,setEditId] = useState(0)
     const handleSubmit = (e) =>{
      e.preventDefault()

      if(editId){
        const editTodo = todos.find((i)=>i.id === editId)
        const updatedTodos = todos.map((t)=>
         t.id === editTodo.id ? 
         (t = {id:t.id,todo}):{id:t.id,todo:t.todo}
        )
        setTodos(updatedTodos);
        setEditId(0)
        setTodo("")
        return;
      }
      if(todo !== ''){

        setTodos([{id:`${todo}-${Date.now()}`,todo},...todos]) 
        setTodo(" ")
      }
     }
  
     
     const handleDelete = (id) =>{
       const filteredData = todos.filter((todo)=>todo.id !== id)
       setTodos([...filteredData])
     }

     const handleEdit =(id) =>{
        const editTodo = todos.find((i)=>i.id === id)
        if(editTodo){
          setTodo(editTodo.todo)
          setEditId(id)
        }
     }
  return (
    <div className="App">
       <div className='container'>
        <h1>Todo List App</h1>
        <form className='todoForm' onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
          <button>{editId?"Edit":"Go"}</button>
        </form>
        <ul className='allTodos'>

          {todos.map((todo,i)=>{
            return <li className='singleTodo' key={todo.id}><span className='todoText'>{todo.todo} </span><button onClick={()=>handleEdit(todo.id)}>Edit</button>
            <button onClick={()=>handleDelete(todo.id)}>Delete</button></li>
          })}
          
         
        </ul>
       </div>

    </div>
  );
}

export default App;
