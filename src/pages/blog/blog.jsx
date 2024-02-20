/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { colors, type, breakpoints } from "../../constants";
import { jsx } from "@emotion/react";
import Post from "./post";
import { useParams, Link } from "react-router-dom";

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

const Blog = ({ width, content, photos, videos }) => {
  let isMobile = width < breakpoints.tablet;
  const [blog, setBlog] = useState({});
  const { title } = useParams();

  useEffect(() => {
    if (content && content.blogs) {
      setBlog(
        content.blogs.find((el) => {
          return el.title === title;
        }),
      );
    }
  }, [content]);

  return blog && Object.keys(blog).length > 0 ? (
    <div css={styles.parent}>
      <Post
        isMobile={isMobile}
        hasLink={false}
        {...blog}
        photos={
          photos && photos[blog.title] && Object.values(photos[blog.title])
        }
        video={videos && videos[blog.title]}
      />
      <Link to={`/blog`}>Back to List</Link>
    </div>
  ) : (
    <div />
  );
};

Blog.propTypes = {
  width: PropTypes.number,
  content: PropTypes.object,
  photos: PropTypes.object,
  videos: PropTypes.object,
};

export default Blog;
