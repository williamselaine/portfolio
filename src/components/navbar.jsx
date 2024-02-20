/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { jsx, keyframes, css } from "@emotion/react";
import { colors, type, breakpoints } from "../constants";
import burger from "../assets/burger.svg";

const Navbar = ({ width }) => {
  const [isMobile, setIsMobile] = useState(width < breakpoints.tablet);
  const [showNav, setShowNav] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setIsMusic(loc && loc.pathname === "/music");
  }, [loc]);

  useEffect(() => {
    setIsMobile(width < breakpoints.tablet);
  }, [width]);

  const wiggle = keyframes`
  0% {
    transform: rotate(0deg) translate(-45px, 0px);
    transform-origin: 25% 50%;
  }
  25% {
    transform: rotate(1deg) translate(-45px, 0px);
    transform-origin: 25% 50%;
  }
  50% {
    transform: rotate(-1deg) translate(-45px, 0px);
    transform-origin: 25% 50%;
  }
  80% {
    transform: rotate(0deg) translate(-45px, 0px);
    transform-origin: 25% 50%;
  }
`;
  const navbarMobile = css`
    margin: 0px;
    list-style-type: none;
    display: flex;
    flex-direction: horizontal;
    transition:
      transform 1s,
      opacity 0.75s;
    transform: translate(-45px, 0px);
    opacity: 1;
    animation: ${wiggle} 1.5s;
    animation-delay: 1.25s;
    z-index: 5;
  `;
  const styles = {
    navbar: {
      margin: "0px",
      listStyleType: "none",
      display: "flex",
      flexDirection: "horizontal",
      justifyContent: "flex-end",
      zIndex: "5",
    },
    navbarMobileHide: {
      margin: "0px",
      listStyleType: "none",
      display: "flex",
      flexDirection: "horizontal",
      transition: "transform 1s, opacity 1s",
      transform: "translate(-385px, 0px)",
      opacity: "0.0",
    },
    navItem: {
      margin: "10px",
      backgroundColor: "transparent",
      transition: "background-color 1s",
      a: {
        color: isMusic ? colors.lightred : colors.purple,
        font: type.h4,
        transition: "color 1s",
      },
      "&:hover": {
        backgroundColor: isMusic ? colors.lightred : colors.purple,
        a: {
          color: colors.pink,
          transition: "color 1s",
        },
        transition: "background-color 0.5s",
      },
    },
    button: {
      marginTop: "10px",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
      opacity: "1.0",
      transition: "opacity 0.5s",
      float: "right",
      "&:hover": {
        opacity: "0.4",
        transition: "opacity 0.5s",
      },
    },
  };

  return (
    <React.Fragment>
      {isMobile && (
        <button css={styles.button} onClick={() => setShowNav((nav) => !nav)}>
          <img src={burger} alt="menu"></img>
        </button>
      )}

      <ul
        css={
          isMobile
            ? showNav
              ? navbarMobile
              : styles.navbarMobileHide
            : styles.navbar
        }
      >
        <li css={styles.navItem}>
          <Link to="/">home</Link>
        </li>
        <li css={styles.navItem}>
          <Link to="/projects">projects</Link>
        </li>
        <li css={styles.navItem}>
          <Link to="/music">music</Link>
        </li>
        <li css={styles.navItem}>
          <Link to="/blog">blog</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Navbar;
