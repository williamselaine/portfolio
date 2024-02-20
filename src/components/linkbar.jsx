/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { colors } from "../constants";
import { useState } from "react";

const Linkbar = ({ links, images, backed }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    parent: {
      display: "flex",
      width: "100%",
      backgroundColor: backed ? "unset" : colors.yellow,
    },
    container: {
      backgroundColor: backed ? colors.pink : "transparent",
      transition: "box-shadow 2s",
      borderRadius: "3px",
      boxShadow: backed
        ? isHovered
          ? colors.boxShadow
          : colors.boxShadowDark
        : "unset",
      padding: backed ? "10px 15px" : "unset",
      margin: "30px auto",
      width: "200px",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "space-evenly",
    },
    link: {
      opacity: 1.0,
      transition: "opacity 0.5s",
      "&:hover": {
        opacity: 0.4,
      },
    },
    image: {
      height: "32px",
      transform: "rotate(0deg)",
      transition: "transform 2s",
    },
    imageSpin: {
      height: "32px",
      transform: "rotate(720deg)",
      transition: "transform 2s",
    },
  };

  return (
    <div css={styles.parent}>
      <div css={styles.container}>
        {links.map((link, index) => {
          return link ? (
            <a
              css={styles.link}
              href={link}
              key={index}
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img css={styles.image} src={images[index]} alt="link" />
            </a>
          ) : (
            <img
              css={isHovered ? styles.imageSpin : styles.image}
              src={images[index]}
              alt="link"
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

Linkbar.propTypes = {
  links: PropTypes.array,
  images: PropTypes.array,
  backed: PropTypes.bool,
};

export default Linkbar;
