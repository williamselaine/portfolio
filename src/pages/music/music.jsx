/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/react";
import { colors, type, breakpoints } from "../../constants";
import { MusicLinkbar, Album } from "../../components/";

const styles = {
  parent: {
    padding: "0px 0px 30px",
    backgroundColor: colors.yellow,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background-color 1s",
  },
  title: {
    color: colors.lightred,
    font: type.h1,
    margin: "10px",
    display: "flex",
    maxWidth: "100%",
    textAlign: "center",
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
};

const Music = ({ width, photos, audio, content, icons }) => {
  document.addEventListener(
    "play",
    function (e) {
      var audios = document.getElementsByTagName("audio");
      for (var i = 0, len = audios.length; i < len; i++) {
        if (audios[i] !== e.target) {
          audios[i].pause();
        }
      }
    },
    true,
  );

  let isMobile = width < breakpoints.tablet;
  return content && content.links ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>{content.title}</h1>
      <MusicLinkbar
        links={content.links}
        icons={icons}
        backed={true}
        isMobile={isMobile}
      />
      {content.albums.map((album, index) => {
        return (
          <Album
            isMobile={isMobile}
            album={album}
            image={
              photos &&
              photos[album.title] &&
              Object.values(photos[album.title])
            }
            key={index}
            audio={audio && audio[album.title]}
          />
        );
      })}
    </div>
  ) : (
    <div />
  );
};

Music.propTypes = {
  width: PropTypes.number,
  photos: PropTypes.object,
  content: PropTypes.object,
  icons: PropTypes.object,
};

export default Music;
