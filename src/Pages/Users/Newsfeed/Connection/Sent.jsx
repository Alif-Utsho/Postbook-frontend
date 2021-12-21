import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CancelBtn from '../../../../Components/ConButtons/CancelBtn';

export default class Sent extends Component {


    render() {
        const { sent } = this.props
        return (
            <div>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Request sent</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-group list-group-flush overflow-auto">
                            {sent && sent.length > 0 ? (sent.map(s => {
                                // <Sent sent={s} key={s.id} />
                                return (
                                    <li key={s.id} className="list-group-item d-flex justify-content-between align-items-start p-0 mt-2 bg-transparent pb-1 rounded-bottom border-0 border-bottom border-secondary">

                                        <i className="fas fa-user me-1 rounded-circle fs-5 my-auto alert p-1 alert-secondary"></i>
                                        <div className="ms-2 me-auto my-auto">
                                            <Link to={`/profile/${s.receiver.id}`} className="text-decoration-none text-dark">
                                                <div>{s.receiver.name}</div>
                                            </Link>
                                            {/* <span className="text-muted">{s.receiver_profile && s.receiver.profile.bio && s.receiver_profile.bio.slice(0, 20)}{sent.receiver_profile && sent.receiver_profile.bio.length > 20 && '....'}</span> */}
                                        </div>

                                        <span className="my-auto">
                                            <CancelBtn req_id={s.id} reload={this.props.reload} />
                                        </span>

                                    </li>)
                            })) :
                                <span className="text-center mt-5 p-5 mx-auto col-10 alert alert-danger">No sent requests</span>}
                        </ul>
                    </div>
                </div>

                
                    

            </div>
        )
    }
}
