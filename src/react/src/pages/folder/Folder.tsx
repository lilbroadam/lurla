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

  // TODO display ellipsis for overflowing text
  const textBoxStyle: Object = {
    backgroundColor: backgroundColor,
    border: 'none',
    boxShadow: `0 0 0 1px ${backgroundColor}`,
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
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
      // textOverflow: 'none',
      // textOverflow: 'clip',
      transition: '.2s',
    }
  };

  // Radium requires each element using interactive styles have a unique key
  var keyNum: number = 0;
  var formNum: number = 0;

  const onFormSubmit = async (event: any) => {
    event.preventDefault();

    var oAbbrUrl: string = event.target.originalAbbreviatedUrl.value;
    var abbrUrl: string = event.target.abbreviatedUrl.value;
    var redirUrl: string = event.target.redirectUrl.value;
    
    if (event.nativeEvent.submitter.name == 'put-submit') {
      if (oAbbrUrl != abbrUrl) {
        await storage.removeAbbreviatedUrl(oAbbrUrl);
      }
      storage.putAbbreviatedUrl(abbrUrl, redirUrl);
    } else if (event.nativeEvent.submitter.name == 'del-submit') {
      alert(`Deleted \"${oAbbrUrl}\"`);
      storage.removeAbbreviatedUrl(oAbbrUrl);
    }

    // alert('submitted: ' + oAbbrUrl + ' | ' + abbrUrl + ' -> ' + redirUrl);
  }

  const deleteButton = (formName) => {
    return (
      <button
        form={formName}
        name="del-submit"
        type="submit"
        value="Submit"
      >
        d
      </button>
    );
  }

  const tableRows = props.abbreviations.map((abbr: Abbreviation) => (
    <tr>
      {/* TODO use validation */}
      <form noValidate
        id={`form-${++formNum}`}
        onSubmit={onFormSubmit} />
      <input
        form={`form-${formNum}`}
        name="originalAbbreviatedUrl"
        type="hidden"
        value={abbr.abbreviatedUrl} />
      <td>
        <input
          defaultValue={abbr.abbreviatedUrl}
          form={`form-${formNum}`}
          key={`${keyNum++}`}
          name="abbreviatedUrl"
          style={textBoxStyle} />
      </td>
      <td>
        {'→'}
      </td>
      <td style={{display: 'flex'}}>
        <input
          defaultValue={abbr.redirectUrl}
          form={`form-${formNum}`}
          key={`${keyNum++}`}
          name="redirectUrl"
          style={textBoxStyle}
          type="url" />
        <input
          form={`form-${formNum}`}
          name="put-submit"
          style={{display: 'none'}}
          type="submit"
          value ="Submit" />
        { deleteButton(`form-${formNum}`) }
      </td>
    </tr>
  ))

  // TODO the spacing gap between table head cells allows the border lines of
  // table data cells to be viewed between them. Possible solutions:
  // - https://stackoverflow.com/questions/8479090/remove-spacing-between-table-cells-and-rows
  // - https://stackoverflow.com/questions/351058/space-between-two-rows-in-a-table
  const stickyHeader: any = {position: 'sticky', top: '0', backgroundColor: backgroundColor};

  return (
    <div style={{display: 'table'}}>
      {/* TODO make (max) width and height percentages to take up rest of page */}
      {/* TODO fix scrollbar displaying on top of table */}
      {/* https://www.youtube.com/watch?v=rMlsGBPSEzo */}
      <table style={{display: 'block', height: '200px', overflowY: 'auto', overflowX: 'hidden'}}>
        <thead>
          <tr>
            <th style={stickyHeader}>Abbreviated URL</th>
            <th style={stickyHeader}></th>
            <th style={stickyHeader}>Redirect URL</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
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
      <Navbar color={navBarColor} title={"Manage abbreviations"}/>
      <div className="folder-content" style={contentStyle}>
        <div id="display">{
          <StyledLurlaGrid abbreviations={abbreviations} />
        }</div>
      </div>
    </div>
  );
}
