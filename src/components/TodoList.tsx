import React from "react";
import Loader from "./Loader";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { TodoFormProps } from "@/types";

export default function TodoList({ state, dispatch }: TodoFormProps) {
  const removeTodo = async (id: number) => {
    await fetch(`http://localhost:3000/api/todolist/${id}`);

    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const updateTodo = async (index: number, id: number) => {
    await fetch(`http://localhost:3000/api/todolist/${id}`, {
      method: "PUT",
    });
    dispatch({ type: "UPDATE_TODO", payload: index });
  };
  return (
    <>
      <ul className="grid place-content-center m-6">
        {state.todoArray.length !== 0 && (
          <h1 className="text-3xl text-center mb-6">Todo Activities</h1>
        )}
        {state.todoArray.length !== 0 &&
          state.todoArray.map((todo, index) => (
            <li
              key={todo._id}
              className="bg-slate-500 bg-opacity-40 backdrop-blur-lg backdrop-filter hover:backdrop-blur-xl hover:bg-opacity-60 flex justify-between gap-5 m-3 items-center py-2 px-4 list-none hover:scale-105 transform transition-transform rounded-md"
            >
              <div className="">
                <h3 className="text-white text-lg font-semibold capitalize">
                  {todo.name}
                </h3>
              </div>
              <div className="flex gap-5">
                <FaCheck
                  onClick={() => {
                    updateTodo(index, todo._id);
                  }}
                  className="text-green-500 hover:text-green-600 cursor-pointer transition-colors duration-300 ease-in-out text-xl hover:scale-110 transform"
                />
                <RxCross1
                  onClick={() => {
                    removeTodo(todo._id);
                  }}
                  className="text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-300 ease-in-out text-xl hover:scale-110 transform"
                />
              </div>
            </li>
          ))}
        {state.isFetchLoading && (
          <div className="p-4 text-center">
            <Loader />
          </div>
        )}
      </ul>

      {state.completedTodo.length !== 0 && (
        <h1 className="text-3xl text-center m-6">Completed Activities</h1>
      )}
      <ul className="flex gap-4 mb-10">
        {state.completedTodo.length !== 0 &&
          state.completedTodo.map((todo) => {
            return (
              <li
                key={todo._id}
                className="bg-slate-500 bg-opacity-40 backdrop-blur-lg backdrop-filter hover:backdrop-blur-xl hover:bg-opacity-60 flex justify-between gap-5 m-3 items-center py-2 px-4 list-none hover:scale-105 transform transition-transform rounded-md"
              >
                <h3
                  className="text-white text-lg font-semibold capitalize"
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "gray",
                    textDecorationThickness: "3px",
                  }}
                >
                  {todo.name}
                </h3>

                <div className="">
                  <RxCross1
                    onClick={() => {
                      removeTodo(todo._id);
                    }}
                    className="text-red-500 hover:text-red-600 cursor-pointer transition-colors duration-300 ease-in-out text-xl hover:scale-110 transform"
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
