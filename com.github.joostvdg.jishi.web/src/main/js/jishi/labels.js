/*jshint esversion: 6 */

import React from 'react';
import Table from 'react-bootstrap/lib/Table';

const client = require('../client');


export class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {label: {}};
    }

    render() {
        return (
            <tr>
                <td><a href={this.props.label._links.self.href}>{this.props.label.label}</a></td>
            </tr>
        )
    }
}

export class LabelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {labels: []};
    }

    render() {
        var labels = this.props.labels.map(label =>
            <Label key={label._links.self.href} label={label}/>
        );
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                    {labels}
                </tbody>
            </Table>
        )
    }
}

export class ShowLabels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {labels: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/label'}).done(response => {
            this.setState({labels: response.entity._embedded.label});
        });
    }

    render() {
        return (
            <div>
                <LabelList labels={this.state.labels} />
            </div>
        );
    }
}

