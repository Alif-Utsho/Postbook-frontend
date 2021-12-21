import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class ReactList extends Component {

    state = {
        modalShow: false,
        users: []
    }

    handleShow = () => {
        this.props.reload()
        this.props.reloadPost()
        this.setState({ modalShow: true })
    }
    handleClose = () => {
        this.props.reload()
        this.setState({ modalShow: false })
    }


    render() {
        // console.log(this.props)
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reacts</Modal.Title>
                    </Modal.Header>
                    {
                        this.props.reacts &&
                        <Modal.Body>
                            <div className=" mb-2">
                                <div className="form-group">
                                    {/* {this.props.reacts.map(react => this.getUser(react.id))} */}
                                    {/* {this.props.reacts && console.log(this.props.reacts)} */}
                                    {/* {this.props.reacts.map(react => {
                                        return react.user.map(user=> <h5>{user.name}</h5>)
                                    })} */}
                                    <div className="d-flex border-1 border-bottom border-secondary pb-1 mx-auto">
                                        <i className="far fa-heart text-danger me-2 my-auto"></i>
                                        <h6 className="my-auto fw-bold">{this.props.reacts.length}</h6>
                                    </div>
                                    {
                                        this.props.reacts.reverse().map(react => {
                                            return (
                                                <div key={react.user.id}>
                                                    <Link onClick={this.handleClose} to={`/profile/${react.user.id}`} className="d-flex mt-2 text-decoration-none text-dark">
                                                        <i className="fas rounded-circle fa-user me-3 border border-light rounded-circle p-2 fs-6 my-auto alert alert-success position-relative">
                                                            <i className="fas fa-heart position-absolute top-100 text-danger start-100 translate-middle" style={{fontSize: '12px', marginTop: '-6px', marginLeft: '-2px'}}></i>
                                                        </i>
                                                        <div className="my-auto"><b>{react.user.name}</b></div>
                                                    </Link>
                                                </div >
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                    }
                </Modal>
            </div>
        )
    }
}
