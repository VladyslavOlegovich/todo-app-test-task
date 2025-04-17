"use client";

import { useTodos } from "../model";
import { TodoForm } from "./TodoForm";
import { TodoListItems } from "./TodoListItems";

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
        Error loading todos
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Todo App
      </h1>
      <TodoForm />
      {todos && todos.length > 0 ? (
        <TodoListItems todos={todos} />
      ) : (
        <p className="text-gray-500 text-center">No todos yet. Add one!</p>
      )}
    </div>
  );
}
