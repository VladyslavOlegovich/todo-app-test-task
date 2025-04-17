import { Todo } from "@/entities/todo";

// Keys for localStorage
const ADDED_TODOS_KEY = "addedTodos";
const DELETED_TODO_IDS_KEY = "deletedTodoIds";
const TOGGLED_TODOS_KEY = "toggledTodos";

// Helper to safely parse JSON from localStorage
const safelyParseJSON = <T>(value: string | null, defaultValue: T): T => {
  if (!value) return defaultValue;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing JSON from localStorage:`, error);
    return defaultValue;
  }
};

export const getStoredTodos = (): Todo[] => {
  return safelyParseJSON(localStorage.getItem(ADDED_TODOS_KEY), []);
};

export const saveStoredTodos = (todos: Todo[]) => {
  localStorage.setItem(ADDED_TODOS_KEY, JSON.stringify(todos));
};

export const getDeletedTodoIds = (): number[] => {
  return safelyParseJSON(localStorage.getItem(DELETED_TODO_IDS_KEY), []);
};

export const addDeletedTodoId = (id: number) => {
  const deletedIds = getDeletedTodoIds();
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    localStorage.setItem(DELETED_TODO_IDS_KEY, JSON.stringify(deletedIds));
  }
};

export const getToggledTodos = (): Record<number, boolean> => {
  return safelyParseJSON(localStorage.getItem(TOGGLED_TODOS_KEY), {});
};

export const saveToggledTodo = (id: number, completed: boolean) => {
  if (id == null || isNaN(id)) {
    console.error("Invalid ID for saveToggledTodo:", id);
    return;
  }
  const toggledTodos = getToggledTodos();
  toggledTodos[id] = completed;
  localStorage.setItem(TOGGLED_TODOS_KEY, JSON.stringify(toggledTodos));
};

export const clearStorage = () => {
  localStorage.removeItem(ADDED_TODOS_KEY);
  localStorage.removeItem(DELETED_TODO_IDS_KEY);
  localStorage.removeItem(TOGGLED_TODOS_KEY);
};
