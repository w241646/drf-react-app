import React from "react";
import { useAnchorsNav } from "../../hooks/useAnchorsNav";

export const AnchorsNav = ({ sections }) => {
  const { selected, fixed } = useAnchorsNav(sections);

  return (
    <ul className={`anchors ${fixed ? "fixed" : ""}`}>
      {sections.map((sec) => (
        <li
          key={sec}
          className={`${sec} ${selected === sec ? "selected" : ""}`}
          onClick={() => {
            const target = document.querySelector(`.${sec}-section`);
            target?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {sec}
        </li>
      ))}
    </ul>
  );
};