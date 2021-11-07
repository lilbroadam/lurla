// TODO change to absolute path imports
import './Bookmarks.css';
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from 'react';
import * as tabs from "../../chromeServices/tabs";
import * as storage from "../../chromeServices/storage";

/**
 * Prefill redirect url with current tab's url
 */
async function prefillRedirectUrl() {
  var redirectUrlElem: any = document.getElementById('redirecturl-textbox');
  redirectUrlElem.value = await tabs.currentTabUrl();
}

/**
 * Call onSubmit() if e is the Enter key being pressed.
 */
function onKeyPress(e: any) {
  if (e.key == 'Enter') {
    onSubmit(e);
  }
}

/**
 * Read the textboxes and write the new abbreviated and redirect url to storage.
 * 
 * @param {textbox} abbreviatedurl-textbox
 * @param {textbox} redirecturl-textbox
 */
async function onSubmit(e: any) {
  var abbreviatedUrlElem: any = document.getElementById('abbreviatedurl-textbox');
  var redirectUrlElem: any = document.getElementById('redirecturl-textbox');

  var abbreviatedUrl = abbreviatedUrlElem.value;
  var redirectUrl = redirectUrlElem.value;
  storage.putAbbreviatedUrl(abbreviatedUrl, redirectUrl);

  // TODO notify the user if operation is successful
  alert(abbreviatedUrl + ' -> ' + redirectUrl);

  abbreviatedUrlElem.value = '';
}

export default function Bookmark() {
  const navBarColor = "#00A400";
  const backgroundColor = "#00D303";
  const contentStyle = {
    backgroundColor: backgroundColor,
  };

  useEffect(() => {
    prefillRedirectUrl();
  }, []);

  return (
    <div className="bookmarks">
      <Navbar color={navBarColor} title={"Add a new abbreviation"}/>
      <div className="bookmarks-content" style={contentStyle}>
        <div className="text">Abbreviate</div>
        <input className="textbox" id="redirecturl-textbox" onKeyPress={onKeyPress}/>
        <div className="text">as</div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <div className="text" style={{textAlign: "left"}}>ab.</div>
          <input className="textbox" id="abbreviatedurl-textbox" onKeyPress={onKeyPress}/>
          <div className="text" style={{textAlign: "right"}}>.com</div>
        </div>
        <div></div>
        <button onClick={onSubmit}>
          Abbreviate!
        </button>
        <div></div>
      </div>
    </div>
  );
}
