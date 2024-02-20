/** @jsxRuntime classic */
/** @jsx jsx */
import PropTypes from "prop-types";
import { jsx } from "@emotion/react";
import { colors, type, breakpoints } from "../../constants";
import Linkbar from "../../components/linkbar";
import github from "../../assets/github.png";
import blossom from "../../assets/blossom.png";

const styles = {
  parent: {
    position: "absolute",
    left: "0px",
    top: "100px",
    height: "calc(100% - 100px)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.yellow,
  },
  title: {
    color: colors.purple,
    font: type.h1,
    margin: "10px auto",
    display: "inline-block",
    textAlign: "center",
  },
  photos: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  image: {
    height: "250px",
    margin: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    font: type.bodySemibold,
    padding: "0px 100px",
    backgroundColor: colors.yellow,
    maxWidth: "420px",
  },
  contentMobile: {
    padding: "0px 30px",
  },
};

const Home = ({ width, photos, content }) => {
  let isMobile = width < breakpoints.mobile;

  return content ? (
    <div css={styles.parent}>
      <h1 css={styles.title}>{content.title}</h1>
      <div css={styles.photos}>
        {photos &&
          Object.values(photos).map((image, index) => {
            if (!isMobile || (isMobile && index === 0)) {
              return (
                <img
                  src={image.src}
                  css={styles.image}
                  alt="selfy"
                  key={index}
                />
              );
            }
            return null;
          })}
      </div>
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
        {content.content &&
          content.content.map((paragraph, index) => {
            return (
              <p css={styles.paragraph} key={index}>
                {paragraph}
              </p>
            );
          })}
      </div>
      <Linkbar
        links={["", "https://github.com/williamselaine", ""]}
        images={[blossom, github, blossom]}
      />
    </div>
  ) : (
    <div />
  );
};

Home.propTypes = {
  width: PropTypes.number,
  photos: PropTypes.object,
  content: PropTypes.object,
};

export default Home;
