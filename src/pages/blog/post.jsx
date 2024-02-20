/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { colors, type } from "../../constants";
import PropTypes from "prop-types";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import "./post.css";

const styles = {
  title: {
    color: colors.purple,
    font: type.h1,
    margin: "0px 0px 20px",
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "100%",
    textDecoration: "none",
  },
  postTitle: {
    color: colors.purple,
    font: type.h2,
    width: "100%",
    padding: "0px",
    margin: "0px",
  },
  postSubtitle: {
    color: colors.purple,
    font: type.h4,
    fontStyle: "italic",
  },
  project: {
    display: "flex",
    flexDirection: "column",
    boxShadow: colors.boxShadow,
    backgroundColor: colors.pink,
    borderRadius: "4px",
    margin: "0px 100px 20px 100px",
    padding: "30px",
    transition: "box-shadow 1s",
    maxWidth: "660px",
    width: "660px",
    "&:hover": {
      transition: "box-shadow 1s",
      boxShadow: colors.boxShadowLight,
    },
  },
  projectMobile: {
    margin: "0px 30px 20px",
    maxWidth: "calc(100% - 100px)",
    width: "calc(100% - 100px)",
  },
  projectHeader: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "10px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerMobile: {
    flexDirection: "column",
  },
  projectBody: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
  },
  projectBodyMobile: {
    flexDirection: "column",
    alignItems: "center",
  },
  para: {
    maxWidth: "100%",
    margin: "0px 0px 32px 0px",
    whiteSpace: "pre-wrap",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    font: type.bodySemibold,
    padding: "0px 100px",
    maxWidth: "100%",
  },
  contentMobile: {
    padding: "0px 30px",
  },
  highlightedText: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    margin: "0px 0px 32px 0px",
  },
  highlightedTextRegular: {
    font: type.h5,
    fontStyle: "italic",
    color: colors.purple,
  },
  highlightedTextLarge: {
    font: type.h4,
    fontStyle: "italic",
    color: colors.purple,
  },
  image: {
    maxWidth: "600px",
    maxHeight: "800px",
    width: "auto",
    height: "auto",
    objectFit: "scale-down",
  },
  imageMobile: {
    maxWidth: "100%",
  },
  caption: {
    font: type.bodySemibold,
    fontStyle: "italic",
    float: "right",
  },
  imageParent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "32px",
  },
};

const Post = ({
  isMobile,
  hasLink,
  title,
  subtitle,
  date,
  photos,
  video,
  body,
  highlighted_text,
}) => {
  let d = moment(date.toDate());
  return (
    <div
      css={
        isMobile
          ? {
              ...styles.project,
              ...styles.projectMobile,
            }
          : styles.project
      }
    >
      <div css={styles.projectHeader}>
        <div
          css={
            isMobile
              ? {
                  ...styles.header,
                  ...styles.headerMobile,
                }
              : styles.header
          }
        >
          {hasLink ? (
            <h1 css={styles.postTitle}>
              <Link css={styles.postTitle} to={`/blog/${title}`}>
                {title}
              </Link>
            </h1>
          ) : (
            <h1 css={styles.postTitle}>{title}</h1>
          )}
          <h2 css={styles.postSubtitle}>{d.format("DD.MM.YYYY")}</h2>
        </div>
        <h2 css={styles.postSubtitle}>{subtitle}</h2>
      </div>
      <div
        css={
          isMobile
            ? {
                ...styles.projectBody,
                ...styles.projectBodyMobile,
              }
            : styles.projectBody
        }
      >
        <div
          css={{
            ...styles.content,
            ...styles.contentMobile,
          }}
        >
          {body &&
            body.map((p, index) => {
              return (
                <React.Fragment key={index}>
                  <ReactMarkdown css={styles.para} key={index}>
                    {p.replaceAll("\\n", "\n\n")}
                  </ReactMarkdown>
                </React.Fragment>
              );
            })}
          {video && (
            <video css={styles.image} controls>
              <source css={styles.player} src={video.src} type="video/mp4" />
            </video>
          )}
          {photos &&
            photos.map((photo, index) => {
              return (
                <div css={styles.imageParent} key={index}>
                  <span css={styles.caption}>{photo.alt}</span>
                  <img
                    src={photo.src}
                    css={
                      isMobile
                        ? { ...styles.image, ...styles.imageMobile }
                        : styles.image
                    }
                    alt={photo.alt}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const HighlightedText = ({ highlighted_text }) => {
  const highlightedTextArr = highlighted_text.split("<br />");
  highlightedTextArr.map((el) => {
    return el.replace("<br />", "");
  });
  return (
    <div css={styles.highlightedText}>
      {highlightedTextArr.map((text, index) => {
        const isLink = text.includes("http");
        return (
          <span
            css={
              index === 0
                ? styles.highlightedTextLarge
                : styles.highlightedTextRegular
            }
            key={index}
          >
            {isLink ? <a href={text}>{text}</a> : text}
          </span>
        );
      })}
    </div>
  );
};

HighlightedText.propTypes = {
  highlighted_text: PropTypes.string,
};

Post.propTypes = {
  isMobile: PropTypes.bool,
  hasLink: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  photos: PropTypes.array,
  video: PropTypes.object,
  index: PropTypes.number,
  highlighted_text: PropTypes.string,
  body: PropTypes.array,
  date: PropTypes.object,
};

export default Post;
