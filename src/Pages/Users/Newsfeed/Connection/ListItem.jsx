import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UnfriendBtn from '../../../../Components/ConButtons/UnfriendBtn'

export default class ListItem extends Component {

    render() {
        const { friend, authId } = this.props
        return (
                <li className="list-group-item shadow-sm bg-white d-flex justify-content-between col-12 mx-auto border-start mb-2 border-primary border-0 border-2 rounded align-items-start">
                    <i className="fas rounded-circle fa-user me-2 p-2 fs-5 my-auto alert alert-success"></i>
                    <div className="ms-2 me-auto">
                        {
                            friend && friend.receiver.id === authId ?
                                <div>
                                    <Link to={`/profile/${friend.sender.id}`} className="text-decoration-none text-dark">
                                    <div className={friend.sender_profile && friend.sender_profile.bio ? "fw-bold" : "fw-bold my-auto mt-2"}>{friend.sender.name}</div>
                                    </Link>
                                    <span className="text-muted d-none d-md-block">{friend.sender_profile && friend.sender_profile.bio}</span>
                                </div> :
                                <div>
                                    <Link to={`/profile/${friend.receiver.id}`} className="text-decoration-none text-dark">
                                    <div className={friend.receiver_profile && friend.receiver_profile.bio ? "fw-bold" : "fw-bold my-auto mt-2"}>{friend.receiver.name}</div>
                                    </Link>
                                <span className="text-muted d-none d-md-block">{friend.receiver_profile && friend.receiver_profile.bio}</span>
                                </div>
                        }
                    </div>

                    <span className="my-auto">
                        <UnfriendBtn req_id={friend.id} reload={this.props.reload} />
                    </span>
                </li>
        )
    }
}
