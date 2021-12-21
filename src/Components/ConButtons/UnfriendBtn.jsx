import axios from 'axios'
import React, { Component } from 'react'


export default class UnfriendBtn extends Component {

    state = {
        unfriended: false
    }

    unfriend = id => {
        axios.put('/api/unfriend', { id })
            .then(res =>{
                this.setState({ unfriended: true })
                this.props.reload()
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-danger btn-sm"
                    disabled={this.state.unfriended}
                    onClick={() => this.unfriend(this.props.req_id)}
                >
                    <i className="fas fa-user-minus me-1"></i>
                    {this.state.unfriended ? 'Unfriended' : 'Unfriend'}
                </button>
            </div>
        )
    }
}
