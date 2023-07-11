import React, { useState, useContext } from "react";
// import Button from "../Button/Button";
import { useTodosContext } from "@/utils/todosContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { getTodos } = useTodosContext();

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTodoTitle(e.target.value);
  };

  const handleAddTodo = async () => {
    setIsAdding(true);

    try {
      const response = await fetch("/api/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todoTitle }),
      });
      console.log("my response is", response);
      if (response.ok) {
        setTodoTitle("");
        getTodos();
      }
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
    setIsAdding(false);
  };

  return (
    <div className="flex">
      {/* <input
        type="text"
        value={todoTitle}
        className="px-2 py-3 text-black"
        onChange={handleInputChange}
      /> */}
      <Input type="text" placeholder="Enter to do" disabled={true} />

      {/* <Button
        text={isAdding ? "adding..." : "Add todo"}
        variant="primary"
        onClick={handleAddTodo}
      /> */}
      <Button variant={"default"}>Add todo</Button>
    </div>
  );
};

export default AddTodo;
