import React, { useState } from "react";
import "./TodoList.css";
interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      alert("Please enter a todo");
      return;
    }
    if (editingIndex === null) {
      setTodos([...todos, { text: newTodo, completed: false }]);
    } else {
      const newTodos = [...todos];
      newTodos[editingIndex].text = newTodo;
      setTodos(newTodos);
      setEditingIndex(null);
    }
    setNewTodo("");
  };

  const handleDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggle = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewTodo(todos[index].text);
  };

  return (
    <div className="todo-list-container">
      <form onSubmit={handleSubmit}>
        <div tabIndex={0}>
          <input
            className="todo-input"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <button type="submit" className="add-todo-button">
          {editingIndex === null ? "Add" : "Save"} Todo
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li className="todo-item" key={index}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleToggle(index)}>Toggle</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
