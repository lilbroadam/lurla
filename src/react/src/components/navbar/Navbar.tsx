import './Navbar.css';
import backArrowIcon from "../../img/back_arrow_50x50.png";
import { useHistory } from 'react-router';

export default function Navbar(props: any) {
  const color = props.color;
  const title: string = props.title;

  const history = useHistory();

  const goBack = () => history.goBack(); 

  const navBarStyle = {
    backgroundColor: color,
    boxShadow: `0px 4px 2px 2px ${color}`,
  }

  const backArrowStyle= {
    backgroundImage: `url(${backArrowIcon})`,
    backgroundColor: color,
  };

  return (
    <div className="navbar" style={navBarStyle}>
      <button className="back-arrow" style={backArrowStyle} onClick={goBack}/>
      <div className="title-text">{title}</div>
    </div>
  );
}
