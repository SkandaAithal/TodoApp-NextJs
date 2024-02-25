import { TodoFormProps } from "@/types";
import React, { FormEvent, useState } from "react";

export default function TodoForm({ state, dispatch }: TodoFormProps) {
  const [inputValue, setInput] = useState<string>("");
  const inputHandler = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setInput(value);
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "FETCH_REQUEST" });

    try {
      if (!inputValue) {
        throw new Error("Invalid input");
      }
      setInput("");
      const response = await fetch("http://localhost:3000/api/todolist", {
        method: "POST",
        body: JSON.stringify({ name: inputValue, completed: false }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      dispatch({ type: "ADD_TODO", payload: data.result });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };

  return (
    <>
      <form className="flex justify-center mt-8" onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Add todo"
          onChange={inputHandler}
          value={inputValue}
          className="flex-grow px-3 text-black py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </form>

      {state.isFetchError && <p className="text-red-600">Invalid input</p>}
    </>
  );
}
