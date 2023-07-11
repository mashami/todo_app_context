import React from "react";
import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/TodoList/TodoList";
import Search from "@/components/Search/Search";
import { useTodosContext } from "@/utils/todosContext";

export default function Home() {
  const { isLoading } = useTodosContext();

  return (
    <main className={`flex flex-col space-y-6 relative`}>
      <div className="absolute top-1 right-2">
        <Search />
      </div>{" "}
      <AddTodo />
      {isLoading ? <p>Loading ...</p> : <TodoList />}
    </main>
  );
}
