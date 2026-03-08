import { useLayoutEffect } from "react";

export default function useStarRating(deps = []) {
  useLayoutEffect(() => {
    const blocks = document.querySelectorAll(".rev-box");

    blocks.forEach((block) => {
      const rating = parseFloat(block.dataset.rating);
      const container = block.querySelector(".stars");

      if (!container || isNaN(rating)) return;

      container.innerHTML = "";

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");

        if (rating >= i) {
          star.textContent = "★";
          star.classList.add("star", "filled-star");
        } else if (rating >= i - 0.5) {
          star.textContent = "☆";
          star.classList.add("star", "half-star");
        } else {
          star.textContent = "☆";
          star.classList.add("star", "empty-star");
        }

        container.appendChild(star);
      }

      const score = document.createElement("span");
      score.textContent = `（${rating}）`;
      container.appendChild(score);
    });
  }, deps);
}