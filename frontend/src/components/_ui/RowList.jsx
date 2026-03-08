import React from "react";
import { useInviewRowList } from "../../hooks/useInviewRowList";

export const RowList = ({ children }) => {
  const ref = useInviewRowList();
  return <div ref={ref} className="row_list">{children}</div>;
};