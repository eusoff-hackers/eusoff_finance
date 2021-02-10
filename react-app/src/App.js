import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Menu, Container } from 'semantic-ui-react'
import Home from './pages/home';
import InputForm from './pages/input';
import Claims from './pages/claims';
import Preview from './pages/preview';

function App() {
  const [activeItem, setActiveItem] = useState("");
  return (
    <Router>
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header>
              Eusoff Finance
            </Menu.Item>
            <Menu.Item
              name='general'
              active={activeItem === 'input'}
              onClick={() => {
                // setActiveItem('input');
                window.location.href = "http://localhost:3000/input"
              }}
            >
              General
            </Menu.Item>

            <Menu.Item
              name='receipts'
              active={activeItem === 'claims'}
              onClick={() => {
                // setActiveItem('claims');
                window.location.href = "http://localhost:3000/claims"
              }}
            >
              Receipts
            </Menu.Item>
          </Container>
        </Menu>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/previewB">
            <Preview html={localStorage.getItem("formB")}/>
          </Route>
          <Route path="/claims">
            <Claims setActiveItem={() => setActiveItem("claims")}/>
          </Route>
          <Route path="/input">
            <InputForm setActiveItem={() => setActiveItem("input")}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
