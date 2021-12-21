import React, { Component } from 'react'
import axios from 'axios'

import Navbar from '../../../../Components/Navbar'
import ListItem from './ListItem'
import Request from './Request'
import Sent from './Sent'

export default class Friend extends Component {

    state = {
        reload: false,
        authId: ''
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData();
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get('/api/connection')
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true })
    }
    render() {
        const { friends, request, sent, authId } = this.state
        return (
            <div>
                <Navbar reload={this.reload.bind(this)} />

                <div className="mt-4 p-1">
                    <div className="d-md-flex justify-content-center">
                        <div className="col-md-4">
                            <h5 className="card-header mx-auto mb-3 border-bottom d-flex border-0 border-primary">Friends <span className="ms-auto">{friends && friends.length}</span> </h5>
                            <ul className="list-group list-group-flush overflow-auto" style={{height: "550px"}}>
                                {
                                    friends ?
                                        ((friends && friends.length > 0) ?
                                            friends.map(friend => {
                                                return (
                                                    <ListItem
                                                        key={friend.id}
                                                        friend={friend}
                                                        reload={this.reload.bind(this)}
                                                        authId={authId}
                                                    />
                                                )
                                            }) :
                                            <h3 className="alert alert-danger text-center col-10 col-md-10 mt-md-5 mx-auto">You have no friends</h3>) :
                                        <div className="d-flex justify-content-center mt-5 py-3">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </div>

                                }


                            </ul>
                        </div>
                        <div className="vr mx-5 d-none d-lg-block"></div>
                        <div className="mt-md-0 col-md-3 col-12 mt-4 mt-md-0">
                            <div className="bg-white border-top border-primary rounded border-2">

                                <div className="fs-6 border-bottom mb-4 d-flex my-auto card-header rounded-top">
                                    Friend Requests
                                    <span className="ms-auto fs-6">{request && request.length}</span>
                                </div>
                                {
                                    request &&
                                    <ul className="list-group list-group-flush px-1 overflow-auto" style={{ height: '500px' }}>
                                        {
                                            request.length > 0 ?
                                                request.map(req => <Request request={req} key={req.id} reload={this.reload.bind(this)} />) :
                                                <span className="text-center mt-5 p-5 alert alert-danger">No friend requests</span>
                                        }
                                    </ul>
                                }
                                <button className="btn btn-outline-secondary col-12 mx-auto m-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">View Sent requests</button>
                                <Sent sent={sent} reload={this.reload.bind(this)} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
