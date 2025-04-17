import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo as toggleTodoApi,
} from "@/shared/api";
import { Todo } from "@/entities/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await getTodos();
  return response.data;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await createTodo({ title, completed: false });
  return response.data;
};

export const removeTodo = async (id: number): Promise<void> => {
  await deleteTodo(id);
};

export const toggleTodo = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  const response = await toggleTodoApi(id, completed);
  console.log("toggleTodo response:", response.data);
  return { id, title: "", completed };
};
