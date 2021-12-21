import axios from 'axios'
import React, { Component } from 'react'

export default class AddBtn extends Component {

    state = {
        req_sent: false
    }

    addFriend = async receiver => {
        const res = await axios.post('/api/addfriend', { 'receiver': receiver })
        if (res.data.status === 200) {
            this.setState({ req_sent: true })
            this.props.reload()
        }
    }

    render() {
        return (
            <div>
                <button
                    className={this.state.req_sent ? "btn btn-outline-success btn-sm" : "btn-sm btn btn-primary"}
                    disabled={this.state.req_sent}
                    onClick={() => this.addFriend(this.props.user_id)}
                >
                    <i className="fas fa-user-plus me-1"></i>
                    {this.state.req_sent ? 'Request sent' : 'Add friend'}
                </button>
            </div>
        )
    }
}
