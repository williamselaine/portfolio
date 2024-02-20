/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";
import { colors } from "../../constants";

const MediaColumn = ({ audio, photos, video, title, isMobile }) => {
  const styles = {
    image: {
      maxWidth: isMobile ? "300px" : "350px",
      margin: "10px 0px",
      objectFit: "contain",
      boxShadow: colors.boxShadowDark,
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
      maxWidth: "400px",
    },
    player: {
      backgroundColor: colors.lightblue,
      color: colors.lightblue,
    },
  };

  return (
    <div css={styles.column}>
      {audio && (
        <audio controls>
          <source css={styles.player} src={audio.url} type="audio/mpeg" />
        </audio>
      )}
      {video && (
        <video css={styles.image} controls>
          <source css={styles.player} src={video.src} type="video/mp4" />
        </video>
      )}
      {photos &&
        photos.map((photo, index) => {
          return (
            <img src={photo.src} css={styles.image} alt={title} key={index} />
          );
        })}
    </div>
  );
};

MediaColumn.propTypes = {
  audio: PropTypes.object,
  photos: PropTypes.array,
  title: PropTypes.string,
  video: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default MediaColumn;
