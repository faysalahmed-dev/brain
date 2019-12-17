import { useState } from "react";

export default (initialValue = true) => {
  const [value, setValue] = useState(initialValue);
  const handleToggle = () => {
    setValue(!value);
  };
  return [value, handleToggle];
};
