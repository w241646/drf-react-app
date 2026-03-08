import React from "react";
import { useInviewCardList } from "../../hooks/useInviewCardList";

export const CardList = ({ children }) => {
  const ref = useInviewCardList();
  return <div ref={ref} className="card-list">{children}</div>;
};