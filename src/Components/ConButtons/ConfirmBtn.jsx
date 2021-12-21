import axios from 'axios';
import React, { Component } from 'react'
import DeleteBtn from './DeleteBtn';


export default class ConfirmBtn extends Component {

    state = {
        confirmed: false
    }

    confirmRequest = async id => {
        const res = await axios.put('/api/confirmrequest', { id });
        if (res.status === 200) {
            this.setState({ confirmed: true })
            this.props.reload()
        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="me-1">
                    <DeleteBtn reload={this.props.reload} req_id={this.props.req_id} />
                </div>
                <button
                    className="btn btn-success btn-sm"
                    disabled={this.state.confirmed}
                    onClick={() => this.confirmRequest(this.props.req_id)}
                >
                    <i className="fas fa-user-check me-1"></i>
                    {this.state.confirmed ? 'Confirmed' : 'Confirm'}
                </button>
            </div>
        )
    }
}
