/*jshint esversion: 6 */

import React from 'react';
import Table from 'react-bootstrap/lib/Table';
const client = require('../client');

export class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {template: {}};
    }

    render() {
        return (
            <tr>
                <td><a href={this.props.template._links.self.href}>{this.props.template.name}</a></td>
                <td>{this.props.template.description}</td>
                <td>{this.props.template.type}</td>
            </tr>
        );
    }
}

export class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {templates: []};
    }

    render() {
        var templates = this.props.templates.map(template =>
            <Template key={template._links.self.href} template={template}/>
        );
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {templates}
                </tbody>
            </Table>
        );
    }
}

export class ShowTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {templates: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/template'}).done(response => {
            this.setState({templates: response.entity._embedded.ConfigurationItemTemplateRepository});
        });
    }

    render() {
        return (
            <div>
                <TemplateList templates={this.state.templates} />
            </div>
        );
    }
}

