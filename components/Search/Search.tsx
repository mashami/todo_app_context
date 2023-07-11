import { useTodosContext } from "@/utils/todosContext";
import React, { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");

  const { handleSearch } = useTodosContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleSearch(newValue);
  };

  return (
    <div>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        className="outline-none bg-transparent border border-blue-600 px-4 py-2 mt-4 mb-8 w-64 text-white absolute -top-12 right-0"
        placeholder="Search tasks"
      />
    </div>
  );
};

export default Search;
