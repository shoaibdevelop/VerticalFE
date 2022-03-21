import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Search from "./@modules/search/search";
import SearchList from "./@modules/search/searchList";
import SearchDetails from "./@modules/search/searchDetails";

function App() {
  return (
    <div className="App">
      <div className="background"></div>{" "}
      <Router>
        <Routes>
          <Route path="/" element={<Search/>}/>
          <Route path="/search" element={<SearchList/>}/>
          <Route path="/details/:id" element={<SearchDetails />}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;