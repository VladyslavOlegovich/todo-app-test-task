import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getTodos = () => api.get("/todos?_limit=10");

export const createTodo = (todo: { title: string; completed: boolean }) =>
  api.post("/todos", todo);

export const deleteTodo = (id: number) => api.delete(`/todos/${id}`);

export const toggleTodo = (id: number, completed: boolean) =>
  api.patch(`/todos/${id}`, { completed });
