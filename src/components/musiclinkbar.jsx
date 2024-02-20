/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { colors, type } from "../constants";
import { useState } from "react";

const MusicLinkbar = ({ links, icons, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const styles = {
    parent: {
      display: "flex",
      width: "100%",
      backgroundColor: colors.yellow,
    },
    container: {
      backgroundColor: colors.pink,
      transition: "box-shadow 2s",
      borderRadius: "3px",
      boxShadow: isHovered ? colors.boxShadow : colors.boxShadowDark,
      padding: "30px",
      margin: "30px auto",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "space-evenly",
      minWidth: isMobile ? "unset" : "500px",
      maxWidth: isMobile ? "300px" : "620px",
      flexWrap: "wrap",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      minWidth: isMobile ? "100%" : "calc(50% - 30px)",
      maxWidth: isMobile ? "100%" : "calc(50% - 30px)",
      padding: "10px 15px",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: "100%",
    },
    rowSpaced: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100px",
    },
    link: {
      opacity: 1.0,
      transition: "opacity 0.5s",
      "&:hover": {
        opacity: 0.4,
      },
    },
    title: {
      color: colors.lightred,
      font: type.h3,
      width: "100%",
      textAlign: "left",
    },
    subtitle: {
      font: type.body,
      width: "100%",
      textAlign: "left",
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
  if (links) {
    return (
      <div css={styles.parent}>
        <div css={styles.container}>
          {links.map((linkMeta, i) => {
            return (
              <div
                css={styles.column}
                key={i}
                onMouseOver={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div css={styles.rowSpaced}>
                  <h3 css={styles.title}>{linkMeta.title}</h3>
                  <div css={styles.row}>
                    {linkMeta.links.map((link, j) => {
                      if (links && icons && icons[link.icon]) {
                        return (
                          <a css={styles.link} href={link.link} key={j}>
                            <img
                              css={
                                isHovered === i
                                  ? { ...styles.image, ...styles.imageSpin }
                                  : styles.image
                              }
                              src={icons && icons[link.icon].src}
                              alt="link"
                            />
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
                <div css={styles.subtitle}>{linkMeta.subtitle}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div />;
};

MusicLinkbar.propTypes = {
  links: PropTypes.array,
  images: PropTypes.array,
};

export default MusicLinkbar;
