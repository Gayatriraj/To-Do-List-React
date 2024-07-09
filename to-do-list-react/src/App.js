import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import LandingPage from "./components/LandingPage";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState("landing");

  const filterHandler = useCallback(() => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [status, todos]);

  const saveLocalTodos = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status, filterHandler, saveLocalTodos]);

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  const handleShowTodoList = () => {
    setCurrentPage("todoList");
  };

  const handleClear = () => {
    setFilteredTodos(todos);
  };

  const handleSearch = (term) => {
    console.log("Search term:", term, todos);
    setFilteredTodos(
      todos.filter((todo) =>
        todo.text.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const renderPage = () => {
    switch (currentPage) {

      case "todoList":
        return (
          <div className="page-container">
            <Header onSearch={handleSearch} onClear={handleClear} />
            <TodoForm todos={todos} setTodos={setTodos} setStatus={setStatus} />
            <TodoList
              todos={todos}
              setTodos={setTodos}
              filteredTodos={filteredTodos}
            />
          </div>
        );
      default:
        return <LandingPage showTodoList={handleShowTodoList} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
