import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const retiveTodos = () => {
    const getStoredTodos = localStorage.getItem("todos");
    if (getStoredTodos) {
      return JSON.parse(getStoredTodos);
    } else {
      return [];
    }
  };

  const [todos, setTodos] = useState(retiveTodos);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState('');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault()

    if (input != "" && title != "") {
      setTodos([...todos, 
        {
        id: todos.length + 1,
        text: input,
        description: title,
        completed: false
        }
      ])
    }
      setInput("");
      setTitle("");
  };

  const handleDeleteTodo = (id) => {
    const deleteTodo = todos.filter((todo) => {
      return todo.id !== id;
    })
    setTodos(deleteTodo)
  }

  const handleComplete = (id) => {
    const completedTodos = todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }else {
        return todo;
      }
    })
    setTodos(completedTodos);
  }
  return (
    <>
      <div>
        <h1>Todo App</h1>
        <form onSubmit={handleAddTodo}>
          <label htmlFor="title">Title:
        <input
          placeholder="add todo title..."
          required
          value={input}
          onChange={handleInput}
        />
        </label>
        <label htmlFor="description">Description:
        <input
          placeholder="add todo description..."
          required
          value={title}
          onChange={handleTitle}
        />
        </label>
        <button type="submit">Add</button>
        </form>
      </div>
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id}
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
            >
            {" "}
            <h3>{todo.text}</h3> 
            <p>{todo.description}</p>
            <button onClick={() => handleDeleteTodo(todo.id)}>delete</button>
            <button onClick={() => handleComplete(todo.id)}>{todo.completed ? 'Incomplete' : 'Complete'}</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
