/** @jsxRuntime classic */
/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx } from "@emotion/react";
import { colors, type } from "../constants";
import { Song } from "./";
import "./audio.css";

const Album = ({ isMobile, album, image, audio }) => {
  const styles = {
    project: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "unset",
      minWidth: isMobile ? "unset" : "500px",
      maxWidth: isMobile ? "300px" : "620px",
      boxShadow: colors.boxShadow,
      backgroundColor: colors.pink,
      borderRadius: "4px",
      margin: isMobile ? "0px 30px 20px" : "0px 100px 20px 100px",
      padding: "30px",
      transition: "box-shadow 1s",
      "&:hover": {
        transition: "box-shadow 1s",
        boxShadow: colors.boxShadowLight,
      },
    },
    column: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "0px 10px",
    },
    subtitle: {
      color: colors.lightred,
      font: type.h3,
      width: "100%",
      textAlign: isMobile ? "center" : "right",
    },
    artistName: {
      color: colors.lightred,
      font: type.h2,
      width: "100%",
      textAlign: isMobile ? "center" : "left",
    },
    image: {
      margin: "0px 10px 0px 0px",
      width: "250px",
      height: "250px",
    },
    songcontainer: {
      maxHeight: "400px",
      overflowY: "scroll",
      padding: "5px 15px",
      backgroundColor: colors.offpink,
    },
  };
  return (
    <div css={styles.project}>
      <div css={styles.column}>
        {image && <img css={styles.image} src={image[0].src} alt="album art" />}
        <h1 css={styles.artistName}>{album.artist}</h1>
      </div>
      <div css={styles.column}>
        <h1 css={styles.subtitle}>{album.title}</h1>
        <div css={styles.songcontainer}>
          {audio &&
            audio.map((song, index) => {
              return <Song {...song} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

Album.propTypes = {
  isMobile: PropTypes.bool,
  album: PropTypes.object,
  image: PropTypes.array,
  audio: PropTypes.array,
};

export default Album;
