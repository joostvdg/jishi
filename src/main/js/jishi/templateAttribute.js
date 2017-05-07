/*jshint esversion: 6 */

import React from 'react';
import Table from 'react-bootstrap/lib/Table';
const client = require('../client');

export class TemplateAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {templateAttribute: {}};
    }

    render() {
        return (
            <tr>
                <td><a href={this.props.templateAttribute._links.self.href}>{this.props.templateAttribute.key}</a></td>
                <td>{this.props.templateAttribute.value}</td>
                <td>{this.props.templateAttribute.description}</td>
                <td>{this.props.templateAttribute.valueType}</td>
            </tr>
        );
    }
}

export class TemplateAttributeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {templateAttributes: []};
    }

    render() {
        var templateAttributes = this.props.templateAttributes.map(templateAttribute =>
            <TemplateAttribute key={templateAttribute._links.self.href} templateAttribute={templateAttribute}/>
        );
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>value</th>
                        <th>description</th>
                        <th>valueType</th>
                    </tr>
                </thead>
                <tbody>
                    {templateAttributes}
                </tbody>
            </Table>
        );
    }
}

export class ShowTemplateAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {templateAttributes: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/templateAttribute'}).done(response => {
            this.setState({templateAttributes: response.entity._embedded.templateAttribute});
        });
    }

    render() {
        return (
            <div>
                <TemplateAttributeList templateAttributes={this.state.templateAttributes} />
            </div>
        );
    }
}

