import PropTypes from "prop-types";
import "./audio.css";

const Song = ({ title, url }) => {
  return (
    <div>
      <h3>{title}</h3>
      <audio controls>
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  );
};

Song.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default Song;
