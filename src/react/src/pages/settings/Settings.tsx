// TODO change to absolute path imports
import './Settings.css';
import Navbar from "../../components/navbar/Navbar";

export default function Settings() {
  const navBarColor = "#636363";
  const backgroundColor = "#9B9B9B";
  const contentStyle = {backgroundColor: backgroundColor};

  return (
    <div className="settings">
      <Navbar color={navBarColor} />
      <div className="settings-contentcontent" style={contentStyle}>
        settings
      </div>
    </div>
  );
}
