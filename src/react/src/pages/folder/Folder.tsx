// TODO change to absolute path imports
import './Folder.css';
import Navbar from "../../components/navbar/Navbar";
import * as storage from "../../chromeServices/storage";
import { useEffect, useState } from 'react';
import Radium from 'radium';

const backgroundColor = "#FEC900";
const navBarColor = "#FEA511";

// TODO replace with proto
interface Abbreviation {
  abbreviatedUrl: string;
  redirectUrl: string;
}

function LurlaGrid(props: any) {
  const textBoxStyle = {
    backgroundColor: backgroundColor,
    border: 'none',
    boxShadow: `0 0 0 1px ${backgroundColor}`,
    ':focus': {
      backgroundColor: navBarColor,
      borderRadius: '2pt',
      boxShadow: '0 0 0 1px grey',
      outline: 'none',
      transition: '.2s',
    },
    ':hover': {
      backgroundColor: navBarColor,
      outline: '1px solid black',
      outlineWidth: '1px',
      transition: '.2s',
    }
  };

  // Radium requires each element using interactive styles have a unique key
  var keyNum: number = 0;

  return (
    <div>
      <table style={{width: '100%'}}>
        <tr>
          <th>Abbreviated URL</th>
          <th></th>
          <th>Redirect URL</th>
        </tr>
        {
          props.abbreviations.map( (abbr: Abbreviation) => (
            <tr>
              {/* <input className="textbox" id="redirecturl-textbox" onKeyPress={onKeyPress}/> */}
              <input style={textBoxStyle} key={`${keyNum++}`} value={abbr.abbreviatedUrl}/>
              <td>{'->'}</td>
              <input style={textBoxStyle} key={`${keyNum++}`} type="url" value={abbr.redirectUrl}/>
            </tr>
          ))
        }
      </table>
    </div>
  );
}

export default function Folder() {
  const contentStyle = {
    backgroundColor: backgroundColor
  };

  const [abbreviations, setAbbreviations] = useState<Array<Abbreviation>>([]);

  useEffect(() => {
    async function readAbbreviations () {
      var redirectMap: any = await storage.getRedirectMap();
      var abbrs: Abbreviation[] = [];
      for (var abbr in redirectMap) {
        abbrs.push({
          abbreviatedUrl: abbr,
          redirectUrl: redirectMap[abbr],
        });
      }
      setAbbreviations(abbrs);
    }
    readAbbreviations();
  }, []);
  
  const StyledLurlaGrid = Radium(LurlaGrid);

  return (
    <div className="folder">
      <Navbar color={navBarColor}/>
      <div className="folder-content" style={contentStyle}>
        <div id="display">{
          <StyledLurlaGrid abbreviations={abbreviations} />
        }</div>
      </div>
    </div>
  );
}
