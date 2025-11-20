import React, { useEffect, useRef, useState } from 'react'
import './CSS/Todo.css'
import TodoItems from './TodoItems.jsx';

let count = 0;

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        if (inputRef.current.value.trim() === "") return;
        setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }]);
        inputRef.current.value = "";
        localStorage.setItem("todos_count",count);
    }

    useEffect(() => {
    try {
        const saved = localStorage.getItem("todos");
        setTodos(saved ? JSON.parse(saved) : []);
        count=localStorage.getItem("todos_count");
    } catch (err) {
        console.error("localStorage blocked:", err);
        setTodos([]);   // fallback to empty array
    }
}, []);

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("todos", JSON.stringify(todos));
        }, 100);
    }, [todos]);

    return (
        <div className="todo">
            
            <div className="todo-header">To-Do List</div>

            <div className="todo-add">
                <input ref={inputRef} type="text" placeholder="Add your Task" className="todo-input" />
                <div onClick={add} className="todo-add-btn">ADD</div>
            </div>

            <div className="todo-list">
                {todos.map((item, index) => (
                    <TodoItems key={item.no} no={item.no} display={item.display} text={item.text} />
                ))}
            </div>

        </div>
    );
}

export default Todo;
