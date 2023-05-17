import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {ListRoutes} from './routes/index';
import { DefaultLayout } from './components/layout/DefaultLayout';


function App() {
  return (
    <div className="App">
      {ListRoutes.map((route, index) => {
        const Layout = route.isShowHeader ? DefaultLayout : React.Fragment;
        return (
          <Routes key={index}>
            <Route path={route.path} element={<Layout><route.component /></Layout>} />
          </Routes>
        )
      })}
    </div>
  );
}

export default App;
