import { Button } from "../components/ui/button";
import { useState } from "react";

const StateDemo = () => {
  const [name, setName] = useState("rodgers");
  const [grade, setGrade] = useState(75);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setName("John");
    setGrade(90);
    console.log(name);
  };

  const handleIcrement = () => {
    setCount((prevState) => prevState + 1);
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">
        Hello, {name}, your grade is {grade}
      </h1>
      <Button onClick={handleClick} className="mr-2">
        Change Name
      </Button>
      <Button onClick={handleIcrement} className="mr-2">
        {count}
      </Button>
      <Button onClick={handleIcrement}>{count}</Button>
    </div>
  );
};

export default StateDemo;
