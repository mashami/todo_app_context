import { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "@prisma/client";

interface TodoContextProviderProps {
  children: React.ReactNode;
}

interface TodoContextTypes {
  getTodos: () => void;
  todos: Todo[];
  isLoading: boolean;
  handleSearch: (searchValue: string) => void;
}

export const TodosContext = createContext<TodoContextTypes | null>(null);

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("Context must be used within a context provider");
  }

  return context;
};

// Context Provider Component
export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/todos/getAll/");
      if (res.ok) {
        const data = await res.json();
        setTodos(data.data);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue) {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (filteredTodos.length <= 0) {
        return getTodos();
      }

      setTodos(filteredTodos);
    } else {
      getTodos();
    }
  };

  const value = { getTodos, todos, isLoading, handleSearch };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
