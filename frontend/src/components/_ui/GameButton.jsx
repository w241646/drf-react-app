import React from "react";
import { useGameButton } from "../../hooks/useGameButton";

export const GameButton = () => {
  const visible = useGameButton();
  return (
    <a
      className={`floating_link ${visible ? "slide-out" : "slide-in"}`}
      href="#Game"
    >
      Game
    </a>
  );
};