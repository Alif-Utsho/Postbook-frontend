import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'

import CreatePost from '../Pages/Users/Post/CreatePost';
import axios from 'axios';
import ToastBar from './ToastBar';


export default class Navbar extends Component {
    state = {
        modalShow: false
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            axios.get('/api/username')
                .then(res => this.setState({ ...res.data }))
                .catch(e => console.log(e))
        }
    }

    handleShow = () => {
        this.setState({ modalShow: true })
    }
    handleClose = () => {
        this.setState({ modalShow: false })
    }


    showToastHandler = (toast) => {
        if (toast) this.showToast = toast.toastShow
    }


    signout() {
        // axios.get('/api/signout')
        //     .then((res) => {
        //     }).catch((err) => {
        //         console.log(err)
        //     });
        axios.put('/api/signout', localStorage.getItem('token'))
            .then(res => {
                localStorage.clear()
                window.location.pathname = "/login"
            })
            .catch(e => console.log(e))
    }
    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2c75a8' }}>
                    <div className="container-lg">
                        <Link className="navbar-brand" to="/" style={{ fontFamily: "Yeseva One" }}><i className="fas fa-link"></i> Postbook!!</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {
                                localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) === 'users' &&

                                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                    <li className="nav-item px-lg-4">
                                        <Link className="nav-link" to="/newsfeed"><i className="fas fa-home fs-5"></i> <span className="d-lg-none ms-2 fw-normal">Newsfeed</span></Link>
                                    </li>
                                    <li className="nav-item px-lg-4">
                                        <button className="nav-link border-0 bg-transparent" onClick={this.handleShow} ><i className="far fa-plus-square fs-5"></i> <span className="d-lg-none ms-2">Create post</span></button>
                                    </li>
                                    <li className="nav-item px-lg-4">
                                        <Link className="nav-link border-0 bg-transparent" to="/friend"><i className="fas fa-user-friends fs-5"></i> <span className="d-lg-none ms-2">Friends</span> </Link>
                                    </li>

                                    <li className="nav-item px-lg-4">
                                        <Link className="nav-link" to="/findfriend"><i className="fas fa-search fs-5"></i> <span className="d-lg-none ms-2 fw-normal">Search </span></Link>
                                    </li>

                                </ul>
                            }

                            {
                                this.state.user ?
                                    (
                                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                        {
                                            window.atob(localStorage.getItem('usertype')) === 'users' ?

                                                <div className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle active" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="fas fa-user-tag fs-6 px-2"><span className="fs-6 fw-normal ms-2" style={{ fontFamily: 'arial' }}> {this.state.user.name.substring(0, this.state.user.name.indexOf(" ")) || this.state.user.name} </span></i>
                                                    </Link>
                                                    <ul className="dropdown-menu shadow" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" to="/profile"><i className="fas fa-address-card me-2"></i>Profile</Link></li>
                                                        <li><Link className="dropdown-item" to="/friend"><i className="fas fa-user-friends me-2"></i>Friends</Link></li>
                                                        {/* <li><Link className="dropdown-item" to="#"><i className="fas fa-user-lock me-2 text-danger"></i>Block list</Link></li> */}
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><button className="dropdown-item" onClick={this.signout}><i className="fas fa-sign-out-alt text-danger me-2"></i>Logout</button></li>
                                                    </ul>
                                                </div> :
                                                <div>
                                                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                                        <li className="nav-item px-lg-1 border border-info rounded">
                                                            <Link className="nav-link" to="/dashboard"> <span className="fw-normal">Admin Dashboard</span></Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                        }
                                        </ul>
                                    )
                                    :
                                    (
                                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                        <li className="nav-item px-lg-1">
                                            <Link className="btn btn-success" to="/registration"> <span className="fw-normal">Registration </span></Link>
                                        </li>
                                        <li className="nav-item px-lg-1">
                                            <Link className="btn btn-warning" to="/login"> <span className="fw-normal">Login</span></Link>
                                        </li>

                                    </ul>
                                    )
                            }
                        </div>
                    </div>
                </nav>

                {/* crete post modal */}
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreatePost reload={this.props.reload} hideModal={this.handleClose} showToast={this.showToast} />
                    </Modal.Body>
                </Modal>


                <ToastBar
                    ref={this.showToastHandler}
                />
            </div>
        )
    }
}
