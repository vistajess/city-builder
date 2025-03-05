import { useState } from "react";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    setIsOpen
  };
};