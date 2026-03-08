// src/hooks/useInfiniteSlider.js
import { useEffect } from "react";

export default function useInfiniteSlider() {
  useEffect(() => {
    const track = document.getElementById("sliderTrack");
    if (!track) return;

    const images = Array.from(track.children);
    images.forEach((img) => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });

    requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2;
      track.style.animationDuration = `${totalWidth / 50}s`; // 速度調整
      track.style.setProperty("--scroll-distance", `-${totalWidth}px`);
    });
  }, []);
}