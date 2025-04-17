import { Todo } from "@/entities/todo";
import { TodoItem } from "./TodoItem";

interface TodoListItemsProps {
  todos: Todo[];
}

export function TodoListItems({ todos }: TodoListItemsProps) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
