import CountUp from "react-countup";
import "./body.css";
function Body() {
  return (
    <div className="image-container">
      <img
        className="background-image"
        src="src\assets\Design.png" // Replace with your image URL
        alt="Background"
      />
      <div className="text-overlay">
        <div className="first_stat">
          <span>
            <CountUp end={10} duration={4} /> 
            <span>+</span>
          </span>
          <span>Number of players</span>
        </div>
      </div>
    </div>
  );
}

export default Body;
