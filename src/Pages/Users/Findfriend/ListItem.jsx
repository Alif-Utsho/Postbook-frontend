import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AddBtn from '../../../Components/ConButtons/AddBtn';
import CancelBtn from '../../../Components/ConButtons/CancelBtn';
import ConfirmBtn from '../../../Components/ConButtons/ConfirmBtn';
import UnfriendBtn from '../../../Components/ConButtons/UnfriendBtn';

export default class Listitem extends Component {
    state = {
        authId: 2
    }



    render() {
        const { user, authId } = this.props

        let friends = [];
        if (user && (user.send_byfriends || user.rec_byfriends)) {
            friends = user.send_byfriends.concat(user.rec_byfriends)
        }

        return (
            <div>
                <li className="list-group-item d-flex justify-content-between border-start mb-2 border-primary border-0 border-2 rounded align-items-start">
                    <i className="fas fa-user me-2 fs-5 my-auto alert p-2 alert-success"></i>
                    <div className="ms-2 me-auto">
                        <Link to={`/profile/${user.id}`} className="text-decoration-none text-dark">
                            <div className={user.profile ? "fw-bold" : "fw-bold my-auto mt-2"}>{user.name}</div>
                        </Link>
                        <span className="text-muted d-md-block d-none">{user.profile && user.profile.bio}</span>
                    </div>

                    {/* <span className="my-auto">
                        <button
                            className="btn btn-primary"
                            // disabled={this.state.req_sent}
                            disabled={receiver.includes(user.id) || this.state.req_sent}
                            onClick={() => this.addFriend(user.id)}
                        >
                            <i className="fas fa-user-plus me-1"></i>
                            {receiver.includes(user.id) || this.state.req_sent && 'Request sent'}
                            {sender.includes(user.id) && 'Confirm request'}
                        </button>
                    </span> */}


                    {/*  */}
                    <div className="my-auto">
                    {
                        user.sent.filter(send => send.receiver === authId).length > 0 &&
                        <ConfirmBtn req_id={user.sent.find(send => send.receiver === authId).id} reload={this.props.reload} key={user.sent.find(send => send.receiver === authId).id} />

                    }

                    {
                        user.request.filter(req => req.sender === authId).length > 0 &&
                        <CancelBtn req_id={user.request.find(req => req.sender === authId).id} reload={this.props.reload} key={user.request.find(req => req.sender === authId).id} />
                    }

                    {
                        friends.filter(frnd => frnd.sender === authId || frnd.receiver === authId).length > 0 &&
                        <UnfriendBtn req_id={friends.find(frnd => frnd.sender === authId || frnd.receiver === authId).id} reload={this.props.reload} />
                    }
                    {
                        (
                            !(user.sent.filter(send => send.receiver === authId).length > 0) &&
                            !(user.request.filter(req => req.sender === authId).length > 0) &&
                            !(friends.filter(frnd => frnd.sender === authId || frnd.receiver === authId).length > 0)
                        ) &&
                        <AddBtn user_id={user.id} reload={this.props.reload} />
                    }
                    </div>
                </li>
            </div>
        )
    }
}
