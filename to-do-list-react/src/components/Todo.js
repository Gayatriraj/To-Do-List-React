import React, { useState } from "react";
import "./css/Todo.css"; 
import ConfirmationDialog from "./ConfirmationDialog";
const Todo = ({ todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [originalText, setOriginalText] = useState(todo.text);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteHandler = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const editHandler = () => {
    setIsEditing(true);
    setOriginalText(todo.text); 
  };

  const saveHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            text: newText,
          };
        }
        return item;
      })
    );
    setIsEditing(false);
  };

  const cancelHandler = () => {
    setNewText(originalText);
    setIsEditing(false);
  };

  const textChangeHandler = (e) => {
    setNewText(e.target.value);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={textChangeHandler}
          className="todo-input"
        />
      ) : (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {todo.text}
        </li>
      )}
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
      {isEditing ? (
        <>
          <button onClick={saveHandler} className="trash-btn" style={{ marginLeft: '10px' }}>
            <i className="fas fa-save"></i>
          </button>
          <button onClick={cancelHandler} className="trash-btn" style={{ marginLeft: '10px' }}>
            <i className="fas fa-times"></i> 
          </button>
        </>
      ) : (
        <button onClick={editHandler} className="trash-btn" style={{ marginLeft: '10px' }}>
          <i className="fas fa-edit"></i>
        </button>
      )}
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this task?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Todo;
