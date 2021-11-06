import './Navbar.css';
import backArrowIcon from "../../img/back_arrow_50x50.png";
import { useHistory } from 'react-router';

export default function Navbar(props: any) {
  var color = props.color;

  const history = useHistory();
  
  const goBack = () => history.goBack(); 

  var backArrowButton = <button
      className="back-arrow"
      style={{
        backgroundImage: `url(${backArrowIcon})`,
        backgroundColor: `${color}`
      }}
      onClick={goBack}
    />

  // const style = {{backgroundColor: "${}"}}

  return (
    // <div className="navbar">
    //   <button className="back-arrow"
    //           id="back-button">
    //           style={{ backgroundImage: `url(${bookmarkIcon})` }}
    //           </button>
    //   <div className="title-text">Add a new abbreviation</div>
    // </div>

    <div className="navbar"
          style={{
            backgroundColor: `${color}`,
            boxShadow: `0px 4px 2px 2px ${color}`,
          }}>
      {backArrowButton}
      <div className="title-text">Add a new abbreviation</div>
    </div>
  );
}
