'use strict';

/*jshint esversion: 6 */


import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link, NavLink
} from 'react-router-dom'

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Grid from 'react-bootstrap/lib/Grid';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'


const rest = require('rest');
const mime = require('rest/interceptor/mime');
const client = require('./client');

import {ShowTemplateAttribute} from './jishi/templateAttribute.js';
import {ShowLabels} from './jishi/labels.js';
import {ShowTemplate} from './jishi/templates';

class Navigation extends React.Component {

    render(){
        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">JiShi</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav >
                        <LinkContainer to="/"><NavItem eventKey={2}><Glyphicon glyph="home" /></NavItem></LinkContainer>
                        <LinkContainer to="/view/labels"><NavItem eventKey={3}>Labels</NavItem></LinkContainer>
                        <LinkContainer to="/view/templateAttributes"><NavItem eventKey={4}>Template Attributes</NavItem></LinkContainer>
                        <LinkContainer to="/view/templates"><NavItem eventKey={5}>Templates</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

class Home extends React.Component {
    render(){
        return (<p>Welcome!</p>);
    }
}

function MainPage(props) {
    return (
        <Grid >
            <Router >
                <div>
                    <Navigation />
                    <Route exact path="/" component={Home}/>
                    <Route path="/view/labels" component={ShowLabels}/>
                    <Route path="/view/templateAttributes" component={ShowTemplateAttribute}/>
                    <Route path="/view/templates" component={ShowTemplate}/>
                </div>
            </Router>
        </Grid>
    );
}

function App(props) {
    return (<MainPage />);
}

// Render the APP itself
const app = <App />;
ReactDOM.render(app, document.getElementById('react'));



// setInterval(app, 100);
