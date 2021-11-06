import './App.css';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import Popup from './pages/popup/Popup';
import Bookmark from './pages/bookmarks/Bookmarks';
import Folder from './pages/folder/Folder';
import Settings from './pages/settings/Settings';
import React from 'react';
const Radium = require('radium');

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Popup} />
      <Route exact path="/bookmarks" component={Bookmark} />
      <Route exact path="/folder" component={Folder} />
      <Route exact path="/settings" component={Settings} />
    </Router>
  );
}

// class App extends React.Component {
//   render() {
//     return (
//       <Router>
//         <Route exact path="/" component={Popup} />
//         <Route exact path="/bookmarks" component={Bookmark} />
//         <Route exact path="/folder" component={Folder} />
//         <Route exact path="/settings" component={Settings} />
//       </Router>
//     );
//   }
// }
// export default Radium(App);