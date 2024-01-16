import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Main/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
