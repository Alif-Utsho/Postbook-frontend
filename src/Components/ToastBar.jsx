import React, { Component } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

export default class ToastBar extends Component {

    state = {
        message: '',
        showToast: false
    }
    toastShow = (message) => {
        this.setState({ message: message, showToast: true })
    }
    render() {
        return (
            <ToastContainer className="p-3" position={'bottom-start'}>
                <Toast show={this.state.showToast} onClose={() => this.setState({ showToast: false })} delay={5000} autohide={true}>
                    <Toast.Header closeButton={true}>
                        <i className="fas fa-link"></i>&nbsp;
                        <strong className="me-auto">Postbook!!</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body className="border-0 border border-primary border-bottom rounded-bottom border-2 text-black">{this.state.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        )
    }
}
