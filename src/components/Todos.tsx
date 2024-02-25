import React, { useEffect, useReducer } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

import { Action, TodoState, initialState } from "@/types";
export default function Todos() {
  const reducerFunction = (state: TodoState, action: Action): TodoState => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, isFetchLoading: true, isFetchError: false };

      case "FETCH_SUCCESS":
        const filteredTodosArray = action.payload.filter(
          (todo: { completed: boolean }) => !todo.completed
        );
        const updateTodosArray = action.payload.filter(
          (todo: { completed: boolean }) => todo.completed
        );
        return {
          ...state,
          isFetchLoading: false,
          isFetchError: false,
          todoArray: filteredTodosArray,
          completedTodo: updateTodosArray,
        };
      case "FETCH_FAILURE":
        return { ...state, isFetchLoading: false, isFetchError: true };

      case "ADD_TODO":
        return {
          ...state,
          isFetchLoading: false,
          isFetchError: false,
          todoArray: [...state.todoArray, action.payload],
        };
      case "DELETE_TODO":
        const filteredArray = state.todoArray.filter(
          (todo) => todo._id !== action.payload
        );
        const filteredCompleted = state.completedTodo.filter(
          (todo) => todo._id !== action.payload
        );

        return {
          ...state,
          isFetchError: false,
          todoArray: filteredArray,
          completedTodo: filteredCompleted,
        };
      case "UPDATE_TODO":
        state.todoArray[action.payload].completed = true;
        const filteredTodoArray = state.todoArray.filter(
          (todo) => !todo.completed
        );
        const updateTodoArray = state.todoArray.filter(
          (todo) => todo.completed
        );
        return {
          ...state,
          isFetchError: false,
          todoArray: filteredTodoArray,
          completedTodo: [...state.completedTodo, ...updateTodoArray],
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const getInitialDataFetch = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await fetch("http://localhost:3000/api/todolist");
      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data.result });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };
  useEffect(() => {
    getInitialDataFetch();
  }, []);

  return (
    <>
      <TodoForm dispatch={dispatch} state={state} />
      <TodoList dispatch={dispatch} state={state} />
    </>
  );
}
