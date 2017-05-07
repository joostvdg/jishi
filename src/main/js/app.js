'use strict';

/*jshint esversion: 6 */


import React from 'react';
import ReactDOM from 'react-dom';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';

const rest = require('rest');
const mime = require('rest/interceptor/mime');
const client = require('./client');

import {ShowTemplateAttribute} from './jishi/templateAttribute.js';
import {ShowLabels} from './jishi/labels.js';
import {ShowTemplate} from './jishi/templates';

function formatDate(date) {
    return date.toLocaleDateString();
}

function MainPageHeader(props) {
    return (
        <PageHeader>
            JiShi Frontend
            <small>[powered by Spring & ReactJS]</small>
            <br />
            Hello, {props.name}
        </PageHeader>
    );
}

function MainPage(props) {
    return (
        <Grid >
            <MainPageHeader name="Joost"/>
            <hr />
            <h2>Labels</h2>
            <ShowLabels />
            <hr />
            <h2>TemplateAttributes</h2>
            <ShowTemplateAttribute />
            <hr />
            <h2>Templates</h2>
            <ShowTemplate />
        </Grid>
    );
}

function App(props) {
    return (<MainPage name="Joost"/>);
}

// Render the APP itself
const app = <App name="Joost"/>;
ReactDOM.render(app, document.getElementById('react'));



// setInterval(app, 100);
