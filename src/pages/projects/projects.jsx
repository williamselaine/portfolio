/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/react";
import { colors, type, breakpoints } from "../../constants";
import { storage } from "../../firebase";
import Project from "./project";

const styles = {
  parent: {
    padding: "0px 0px 30px",
    backgroundColor: colors.yellow,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: colors.purple,
    font: type.h1,
    margin: "0px 0px 20px",
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
  },
  subtitle: {
    color: colors.purple,
    font: type.h3,
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    font: type.bodySemibold,
    padding: "0px 100px",
  },
  contentMobile: {
    padding: "0px 30px",
  },
};

const Projects = ({ width, content, photos, videos }) => {
  let isMobile = width < breakpoints.tablet;
  const [audioUrls, setAudioUrls] = useState([]);

  useEffect(() => {
    content &&
      content.projects &&
      content.projects.forEach((project) => {
        if (project.audio) {
          storage
            .child(project.audio)
            .getDownloadURL()
            .then((url) => {
              setAudioUrls((prevState) => [
                ...prevState,
                { title: project.title, url: url },
              ]);
            });
        }
      });
  }, [content]);

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>projects</h1>
      <div
        css={
          isMobile
            ? {
                ...styles.content,
                ...styles.contentMobile,
              }
            : styles.content
        }
      >
        {content.content.map((p, index) => {
          return <p key={index}>{p}</p>;
        })}
      </div>
      {content.projects.map((project, index) => {
        return (
          <Project
            isMobile={isMobile}
            {...project}
            photos={
              photos &&
              photos[project.title] &&
              Object.values(photos[project.title])
            }
            video={videos && videos[project.title]}
            audio={audioUrls.find((el) => el.title === project.title)}
            key={index}
            index={index}
          />
        );
      })}
    </div>
  ) : (
    <div />
  );
};

Projects.propTypes = {
  width: PropTypes.number,
  content: PropTypes.object,
  photos: PropTypes.object,
  videos: PropTypes.object,
};

export default Projects;
