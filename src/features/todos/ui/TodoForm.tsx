import { useState } from "react";
import { useAddTodo } from "../model";

export function TodoForm() {
  const addTodoMutation = useAddTodo();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setErrorMessage("Title must be at least 3 characters long");
      return;
    }
    setErrorMessage("");
    addTodoMutation.mutate(title, {
      onSuccess: () => setTitle(""),
      onError: (err: Error) => setErrorMessage(err.message),
    });
  };

  return (
    <form onSubmit={handleAddTodo} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrorMessage("");
          }}
          placeholder="Add a new todo"
          className="border-2 border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-colors duration-200"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2 animate-pulse">
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="mt-3 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200 transform hover:scale-105 cursor-pointer"
        disabled={addTodoMutation.isPending}
      >
        {addTodoMutation.isPending ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
            Adding...
          </span>
        ) : (
          "Add Todo"
        )}
      </button>
    </form>
  );
}
