import { FC, useState } from "react";

import Button from "components/Button";

interface CounterProps {
  limit: number;
}

const Counter: FC<CounterProps> = ({ limit }) => {
  const [count, setCount] = useState(0);
  const isLimitReached = limit ? count === limit : false;

  return (
    <div className="counter">
      <h3>Counter: {count}</h3>
      <Button
        onClick={() => {
          if (isLimitReached) return;
          setCount(count + 1);
        }}
      >
        Increment
      </Button>
      <Button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrement
      </Button>
      {isLimitReached && <span>You reached the limit!</span>}
    </div>
  );
};

export default Counter;
