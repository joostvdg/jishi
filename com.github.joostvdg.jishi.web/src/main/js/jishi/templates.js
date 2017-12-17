/*jshint esversion: 6 */

import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import SplitButton from 'react-bootstrap/lib/SplitButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Panel from 'react-bootstrap/lib/Panel';

import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import {TemplateAttributeList} from './templateAttribute';
import {LabelList} from './labels';

const client = require('../client');

export class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {template: {}};
    }

    render() {
        return (
            <tr>
                <td>{this.props.template.name}</td>
                <td>{this.props.template.description}</td>
                <td>{this.props.template.type}</td>
                <td><TemplateViewModal template={this.props.template}  /></td>
                <td><Glyphicon glyph="edit" /></td>
                <td><a href={this.props.template._links.self.href} target="_blanc"><Glyphicon glyph="new-window" /></a></td>
            </tr>
        );
    }
}

export class TemplateViewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            template:  props.template,
            templateAttributes: '',
            labels: ''
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    componentDidMount() {
        let link = this.props.template._links.self.href;
        link = link.replace('http://localhost:8080', ''); // TODO: add server base url?

        // set templateAttributes
        client({method: 'GET', path: link + '/templateAttributes'}).done(response => {
            this.setState({templateAttributes: response.entity._embedded.templateAttribute});
        });

        // set labels
        client({method: 'GET', path: link + '/labels'}).done(response => {
            this.setState({labels: response.entity._embedded.label});
        });
    }

    render() {

        const templateAttributesList = this.state.templateAttributes;
        const labelsList = this.state.labels;

        return (
            <div>
                <Button bsSize='small' onClick={this.open}>
                    <Glyphicon glyph="info-sign" />
                </Button>

                <Modal bsSize="large" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Template</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped condensed hover fill>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{this.state.template.name}</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>{this.state.template.type}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{this.state.template.description}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <Panel header="Attributes">
                            <TemplateAttributeList templateAttributes={templateAttributesList} />
                        </Panel>
                        <hr />
                        <Panel header="Labels">
                            <LabelList labels={labelsList} />
                        </Panel>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    // <td><Glyphicon glyph="info-sign" /></td>
}

export class TemplateEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            template:  props.template,
            edit: props.edit
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleChange1(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const key = target.name;

        const updatedTemplate = this.state.template;
        updatedTemplate[key] = value;
        this.setState({
            template: updatedTemplate
        });
    }

    handleSubmit1(event) {
        event.preventDefault();

        fetch('/watchlist', {
            method: this.state.edit ? 'POST' : 'PUT',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.template)
        });

        this.setState({ showModal: false });
        // this.setState({ watchList: {name: ''} });
    }

    render() {
        return (
            <div>
                <Button bsStyle="success" bsSize={this.state.edit ? 'small' : 'large'} onClick={this.open}>
                    <Glyphicon glyph={this.state.edit ? 'edit' : 'plus'}/>
                </Button>

                <Modal bsSize="large" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Template</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit1}>
                            <FormGroup controlId="newTemplateInputName">
                                <ControlLabel>Id</ControlLabel>
                                <FormControl type="text" value={this.state.template.id} name="name" readOnly />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button type="submit">{this.state.edit ? 'Update' : 'Create'}</Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
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
                        <th>Open</th>
                        <th>Edit</th>
                        <th>Resource</th>
                    </tr>
                </thead>
                <tbody>
                    {templates}
                </tbody>
            </Table>
        );
    }
}

export class ShowTemplateDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {templates: []};
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/template'}).done(response => {
            this.setState({templates: response.entity._embedded.ConfigurationItemTemplateRepository});
        });
    }

    onSelect(event) {
        console.log("onSelect");
    }

    onClick(event) {
        console.log("handleButtonClick");
        if (event) {
            console.log(event)
        }
    }

    render() {
        const templates = this.state.templates;
        const arr = templates instanceof Array ? templates : [templates];
        const items = arr.map((template) =>
            <MenuItem onClick={this.onClick(template)}>{template.name}</MenuItem>
        );

        return (
            <SplitButton title="Dropdown">
                {items}
            </SplitButton>
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

