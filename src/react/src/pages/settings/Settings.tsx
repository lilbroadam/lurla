// TODO change to absolute path imports
import './Settings.css';
import Navbar from "../../components/navbar/Navbar";

export default function Settings() {
  const navBarColor = "#636363";
  const backgroundColor = "#9B9B9B";
  const contentStyle = {backgroundColor: backgroundColor};

  return (
    <div className="settings">
      <Navbar color={navBarColor} title={"Settings"}/>
      <div className="settings-content content" style={contentStyle}>
        <h2>
          Coming soon!
        </h2>
      </div>
    </div>
  );
}
