import React, { useState, useEffect } from "react";
import { useDebounce } from "@hooks/index";
const Home: React.FC = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 2000);

  useEffect(() => {
    console.log("Debounced Value:", debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="border p-2"
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default Home;
