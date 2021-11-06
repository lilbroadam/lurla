// TODO change to absolute path imports
import './Popup.css';
import { Link } from 'react-router-dom';
import bookmarkIcon from "../../img/bookmark_icon_75x75.png";
import folderIcon from "../../img/folder_icon_75x75.png";
import settingsIcon from "../../img/settings_icon_75x75.png";

// TODO figure out why borderColor is being 
// optimized-out when set in CSS in prod
function PopupButton(props: any) {
  return (
    <button
      className="button"
      style={{
        backgroundImage: `url(${props.backgroundIcon})`,
        borderColor: 'black',
      }}
    />
  );
}

export default function Popup() {
  return (
    <div className="popup">
      <div className="button-row">
        <Link to="/bookmarks">
          <PopupButton backgroundIcon={bookmarkIcon} />
        </Link>
        <Link to="/folder">
          <PopupButton backgroundIcon={folderIcon} />
        </Link>
        <Link to="/settings">
          <PopupButton backgroundIcon={settingsIcon} />
        </Link>
      </div>
    </div>
  );
}
