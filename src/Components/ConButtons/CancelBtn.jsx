import axios from 'axios'
import React, { Component } from 'react'


export default class CancelBtn extends Component {
    state = {
        canceled: false
    }

    cancelRequest = id => {
        axios.put('/api/cancelrequest', { id })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ canceled: true })
                    this.props.reload()
                }
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                <button
                    disabled={this.state.canceled}
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.cancelRequest(this.props.req_id)}
                >
                    <i className="fas fa-user-times me-1"></i>
                    {this.state.canceled ? 'Cancelled' : 'Cancel'}
                </button>
            </div>
        )
    }
}
