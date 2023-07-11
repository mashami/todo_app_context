import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useTodosContext } from "@/utils/todosContext";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TodoList = () => {
  const { todos, getTodos } = useTodosContext();

  return (
    <div>
      {/* {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} getTodos={getTodos} />
              ))} */}
      <Table>
        <TableCaption>A list of todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>validation</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {" "}
          {todos.map((todo) => (
            <TableRow>
              <TableCell>
                <input
                  width={24}
                  type="checkbox"
                  // onChange={handleCheckboxChange}
                  // checked={isChecked}
                  alt=""
                  className=""
                />
              </TableCell>
              <TableCell>
                <p>
                  {/* className={isChecked ? "text-white line-through" : "text-white"} */}

                  {todo.title}
                </p>
              </TableCell>
              <TableCell>
                <Button variant={"default"}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button variant={"destructive"}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
