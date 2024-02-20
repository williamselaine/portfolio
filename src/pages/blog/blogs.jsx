/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { colors, type, breakpoints } from "../../constants";
import { jsx } from "@emotion/react";
import Post from "./post";

const styles = {
  parent: {
    padding: "0px 0px 30px",
    backgroundColor: colors.yellow,
    width: "100%",
    maxWidth: "100%",
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
    maxWidth: "100%",
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

const Blogs = ({ width, content, photos, videos }) => {
  const [sortedContent, setSortedContent] = useState([]);
  let isMobile = width < breakpoints.tablet;

  useEffect(() => {
    const sorted =
      content &&
      content.blogs &&
      content.blogs.sort(function (a, b) {
        return new Date(b.date.toDate()) - new Date(a.date.toDate());
      });
    setSortedContent(
      content &&
        content.blogs && [
          ...content.blogs.sort(function (a, b) {
            return new Date(b.date.toDate()) - new Date(a.date.toDate());
          }),
        ],
    );
  }, [content]);

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>blog</h1>
      {sortedContent &&
        sortedContent.map((project, index) => {
          return (
            <Post
              isMobile={isMobile}
              hasLink={true}
              {...project}
              photos={
                photos &&
                photos[project.title] &&
                Object.values(photos[project.title])
              }
              video={videos && videos[project.title]}
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

Blogs.propTypes = {
  width: PropTypes.number,
  content: PropTypes.object,
  photos: PropTypes.object,
  videos: PropTypes.object,
};

export default Blogs;
