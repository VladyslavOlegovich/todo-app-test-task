import { Todo } from "@/entities/todo";
import { useDeleteTodo, useToggleTodo } from "../model";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const deleteTodoMutation = useDeleteTodo();
  const toggleTodoMutation = useToggleTodo();

  return (
    <li
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in ${
        deleteTodoMutation.isPending ? "opacity-50 animate-fade-out" : ""
      }`}
    >
      <div className="flex items-center group flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            toggleTodoMutation.mutate({
              id: todo.id,
              completed: !todo.completed,
            })
          }
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50 transition-transform duration-200 group-hover:scale-110 cursor-pointer"
          disabled={toggleTodoMutation.isPending}
        />
        <span
          title={todo.title} // Tooltip for full text on hover
          className={`ml-3 text-gray-700 transition-colors duration-200 group-hover:text-blue-600 break-words flex-1 min-w-0 ${
            todo.completed ? "line-through opacity-60" : ""
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => deleteTodoMutation.mutate(todo.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:bg-red-300 transition-all duration-200 transform hover:scale-105 flex-shrink-0 ml-2 cursor-pointer"
        disabled={deleteTodoMutation.isPending}
      >
        {deleteTodoMutation.isPending ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-4 w-4 mr-1 text-white"
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
            Deleting...
          </span>
        ) : (
          "Delete"
        )}
      </button>
    </li>
  );
}
