import { FaPlay, FaPause, FaClock, FaFastForward } from "react-icons/fa";

const Icon = ({ color, id, className }) => {
  switch (id) {
    case "Play":
      return <FaPlay color={color} className={className} />;

    case "Pause":
      return <FaPause color={color} className={className} />;

    case "Clock":
      return <FaClock color={color} className={className} />;

    case "FastForward":
      return <FaFastForward color={color} className={className} />;

    default:
      return null;
  }
};

export default Icon;
