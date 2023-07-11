import React, { useState } from "react";
import { Todo } from "@prisma/client";
import Button from "../Button/Button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TodoItemProps {
  getTodos: () => void;
  todo: Todo;
}

const TodoItem = ({ todo, getTodos }: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isChecked, setIsChecked] = useState(todo.completed);

  const deleteTodo = async (id: string) => {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/todos/delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        getTodos();
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    setIsDeleting(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setIsChecked(checked);
    updateTodo(todo.id, todo.title, checked);
  };

  const updateTodo = async (
    id: string,
    title?: string,
    completed?: boolean
  ) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/todos/update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id, title: updatedTitle, completed }),
      });
      if (response.ok) {
        getTodos();
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
    setIsSaving(false);
  };

  return (
    <div>
      {isUpdating ? (
        <div>
          <input
            value={updatedTitle}
            type="text"
            className="  outline-none bg-transparent"
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded"
            onClick={() => updateTodo(todo.id, todo.title)}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            className="bg-red-500 rounded"
            onClick={() => setIsUpdating(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        // <div className="flex items-center gap-2">
        //   <input
        //     width={24}
        //     type="checkbox"
        //     onChange={handleCheckboxChange}
        //     checked={isChecked}
        //     alt=""
        //     className=""
        //   />
        //   <p className={isChecked ? "text-white line-through" : "text-white"}>
        //     {todo.title}
        //   </p>
        //   <Button
        //     variant="secondary"
        //     text={isDeleting ? "Deleting" : "Delete"}
        //     onClick={() => deleteTodo(todo.id)}
        //   />
        //   <Button
        //     variant="primary"
        //     text={isUpdating ? "Updating.." : "Update"}
        //     onClick={() => setIsUpdating(true)}
        //   />
        // </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <input
                  width={24}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                  alt=""
                  className=""
                />
              </TableCell>
              <TableCell className="text-right">
                <p
                  className={
                    isChecked ? "text-white line-through" : "text-white"
                  }
                >
                  {todo.title}
                </p>
              </TableCell>
              <TableCell>
                <Button
                  variant="secondary"
                  text={isDeleting ? "Deleting" : "Delete"}
                  onClick={() => deleteTodo(todo.id)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="primary"
                  text={isUpdating ? "Updating.." : "Update"}
                  onClick={() => setIsUpdating(true)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TodoItem;
