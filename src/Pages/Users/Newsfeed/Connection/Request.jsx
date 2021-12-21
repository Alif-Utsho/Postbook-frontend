import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ConfirmBtn from '../../../../Components/ConButtons/ConfirmBtn';

export default class Request extends Component {

    render() {
        const { request } = this.props
        return (
            <div>
                <li className="list-group-item align-items-start p-0 bg-transparent my-2 pb-1 rounded-bottom border-0 border-bottom border-success">

                    <div className="ms-2 me-auto d-flex my-auto">
                        <i className="fas fa-user rounded-circle me-2 fs-5 my-auto alert alert-success"></i>
                        <div className="my-auto">
                            <Link to={`/profile/${request.sender.id}`} className="text-decoration-none text-dark">
                                <div className="fw-bold">{request.sender.name}</div>
                            </Link>
                            {/* <span className="text-muted">{request.sender_profile && request.sender_profile.bio.slice(0, 30)}{request.sender_profile && request.sender_profile.bio.length > 30 && '....'}</span> */}

                            
                            <div className="mt-1">
                                <ConfirmBtn req_id={request.id} reload={this.props.reload} />
                            </div>

                        </div>
                    </div>
                    
                </li>
            </div>
        )
    }
}
