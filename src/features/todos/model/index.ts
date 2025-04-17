import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, addTodo, removeTodo, toggleTodo } from "../api";
import { Todo } from "@/entities/todo";
import { v4 as uuidv4 } from "uuid";
import {
  getStoredTodos,
  saveStoredTodos,
  getDeletedTodoIds,
  addDeletedTodoId,
  getToggledTodos,
  saveToggledTodo,
} from "@/shared/lib/storage";

export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const serverTodos = await fetchTodos();
      const deletedIds = getDeletedTodoIds();
      const storedTodos = getStoredTodos();
      const toggledTodos = getToggledTodos();

      const filteredServerTodos = serverTodos.filter(
        (todo) => !deletedIds.includes(todo.id)
      );

      const mergedTodos = [
        ...filteredServerTodos.map((todo) => ({
          ...todo,
          completed: toggledTodos[todo.id] ?? todo.completed,
        })),
        ...storedTodos.map((todo) => ({
          ...todo,
          completed: toggledTodos[todo.id] ?? todo.completed,
        })),
      ];

      return mergedTodos;
    },
    refetchOnMount: "always",
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => {
      if (title.trim().length < 3) {
        throw new Error("Title must be at least 3 characters long");
      }
      return addTodo(title);
    },
    onMutate: async (title: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      const tempId = parseInt(uuidv4().replace(/-/g, "").slice(0, 10), 16);
      const tempTodo: Todo = {
        id: tempId,
        title,
        completed: false,
      };
      queryClient.setQueryData(["todos"], [...previousTodos, tempTodo]);
      return { previousTodos, tempId };
    },
    onSuccess: (newTodo: Todo, variables, context) => {
      const { tempId } = context!;
      const currentTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      const updatedTodo = { ...newTodo, id: tempId };
      queryClient.setQueryData(
        ["todos"],
        currentTodos.map((todo) => (todo.id === tempId ? updatedTodo : todo))
      );
      const storedTodos = getStoredTodos();
      saveStoredTodos([...storedTodos, updatedTodo]);
    },
    onError: (err, title, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await removeTodo(id);
      addDeletedTodoId(id);
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      const updatedTodos = previousTodos.filter((todo) => todo.id !== id);
      queryClient.setQueryData(["todos"], updatedTodos);
      const storedTodos = getStoredTodos();
      saveStoredTodos(storedTodos.filter((todo) => todo.id !== id));
      const toggledTodos = getToggledTodos();
      delete toggledTodos[id];
      localStorage.setItem("toggledTodos", JSON.stringify(toggledTodos));
      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodo(id, completed),
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData(
        ["todos"],
        previousTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
      return { previousTodos };
    },
    onSuccess: (
      _updatedTodo: Todo,
      variables: { id: number; completed: boolean }
    ) => {
      const { id, completed } = variables;
      const currentTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData(
        ["todos"],
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
      saveToggledTodo(id, completed);
    },
    onError: (err, vars, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
};
