// src/hooks/useInviewClass.js
import { useEffect } from "react";

export function useInViewClass() {
  useEffect(() => {
    const targets = document.querySelectorAll(".inview, .inview_re");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-show");
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);
}


export function useInviewRowList(containerSelector = ".row_list") {
  useEffect(() => {
    const targets = document.querySelectorAll(`${containerSelector} dl`);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            observer.unobserve(entry.target); // 一度付けたら監視解除
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerSelector]);
}


export function useInviewCardList() {
  useEffect(() => {
    const cardLists = document.querySelectorAll(".card-list");
    const observers = [];

    cardLists.forEach((cardList) => {
      const items = cardList.querySelectorAll("div");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              items.forEach((item, index) => {
                const delay = index * 250;
                setTimeout(() => {
                  item.classList.add("inview");
                }, delay);
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(cardList);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
}