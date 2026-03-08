// src/components/SnsShare.jsx
import React from "react";

const SnsShare = ({ url }) => {
  return (
    <div className="snsArea sec-scroll-point">
      <div className="inview fadeIn_up">
        <b>SHARE</b>
        <ul className="flexBox">
          <li>
            <a
              href={`https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`}
              rel="nofollow noopener"
              target="_blank"
            >
              <i className="fab fa-facebook-square" />
            </a>
          </li>
          <li>
            <a
              href={`http://twitter.com/share?url=${encodeURIComponent(url)}`}
              rel="nofollow noopener"
              target="_blank"
            >
              <img src="/img/logo-white.png" className="x_icon" alt="X" />
            </a>
          </li>
          <li>
            <a
              href={`https://line.me/R/msg/text/?${encodeURIComponent(url)}`}
              target="_blank"
              rel="nofollow noopener"
            >
              <i className="fab fa-line" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SnsShare;