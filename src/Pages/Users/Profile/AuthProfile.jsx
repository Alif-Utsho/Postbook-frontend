import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Navbar from '../../../Components/Navbar'
import Post from '../Post/Post'
import EditProfile from './EditProfile'
import Sent from '../Newsfeed/Connection/Sent'
import CreatePost from '../Post/CreatePost'
import ToastBar from '../../../Components/ToastBar'

export default class AuthProfile extends Component {
    state = {
        // user: {},
        connection: {},
        reload: false,
        editModalShow: false
    }


    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {

        // using JSON.stringify() this condition won't pass
        if (this.state.reload) {
            // console.log(prevState)
            // console.log(this.state)
            this.fetchData()
            this.setState({ reload: false })
            // axios.get('/api/profile/2')
            //     .then(res => this.setState({ ...res.data }))
            //     .catch(e => console.log(e))
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState)
    //     return nextState.user !== this.state.user
    // }

    async fetchData() {
        // axios.get('/api/profile/2')
        //     .then(res => this.setState({ ...res.data }))
        //     .catch(e => console.log(e))
        // axios.get('/api/connection')
        //     .then(res => this.setState({ connection: res.data }))
        //     .catch(e => console.log(e))

        let user = await axios.get('/api/profile')
        let connection = await axios.get('api/connection')
        let posts = await axios.get(`/api/postofuser/auth`)
        this.setState({
            ...user.data,
            connection: connection.data,
            ...posts.data
        })
    }

    modalShowHandler = (editProfile) => {
        if (editProfile) this.showModal = editProfile.handleShow
    }

    showToastHandler = (toast) => {
        if (toast) this.showToast = toast.toastShow
    }

    editClick = () => {
        this.showModal()
    }

    updateProfile = profile => {
        axios.put('/api/editprofile', profile)
            .then(res => {
                // profile.preventDefault()
                // window.location.reload()
                this.reload()
                this.showToast("Profile updated successfully")
            })
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { user, posts } = this.state
        const { friends, sent } = this.state.connection
        // const { id } = this.props
        
        return (
            <div>
                <Navbar reload={this.reload.bind(this)} />
                {
                    user ?
                        <div className="d-md-flex container justify-content-center">
                            <div className="col-md-4 py-md-5 py-2 bg-white shadow-sm" style={{ height: "650px" }}>

                                <div className="text-center">
                                    <i className="fas fa-user fs-3 fs-5 my-auto alert p-4 mb-4 rounded-circle alert-success"></i>
                                    <div className="my-auto">
                                        <h2 className="display-6 fw-bold">{user.name}</h2>
                                        <h5 className="fs-5 text-muted overflow-auto">{user.profile && user.profile.bio ? user.profile.bio : user.phone}</h5>
                                        <p className="text-dark">E-mail: {user.email}</p>
                                    </div>
                                    <div className="d-flex px-3 my-4 justify-content-between">

                                        <div className="p-2 mx-1 card rounded border-1 border-primary col-md-3">
                                            <Link className="text-decoration-none" to="/friend">
                                                <div className="d-flex justify-content-between">
                                                    <div className="text-center col-12 text-dark">
                                                        <h4><b>{friends.length}</b></h4>
                                                        <h6 className="text-muted">Friends</h6>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>


                                        <div className="p-2 mx-1 card rounded border-1 border-danger col-md-3">
                                            <div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                <div className="d-flex justify-content-between">
                                                    <div className="text-center col-12">
                                                        <h4><b>{user.sent.length}</b></h4>
                                                        <h6 className="text-muted">Following</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 mx-1 card rounded border-1 border-success col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <div className="text-center col-12">
                                                    <h4><b>{user.request.length}</b></h4>
                                                    <h6 className="text-muted">Follower</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mx-auto my-4">
                                        <div className="d-flex justify-content-center">
                                            {
                                                user.profile && user.profile.fb &&
                                                <div className="fs-2 d-flex mx-3">
                                                    <a href={user.profile.fb}>
                                                        <i className="fab fa-facebook-square text-primary"></i>
                                                    </a>
                                                </div>
                                            }
                                            {
                                                user.profile && user.profile.instagram &&
                                                <div className="fs-2 d-flex mx-3">
                                                    <a href={user.profile.instagram}>
                                                        <i className="fab fa-instagram-square text-danger"></i>
                                                    </a>
                                                </div>
                                            }
                                            {
                                                user.profile && user.profile.linkedin &&
                                                <div className="fs-2 d-flex mx-3">
                                                    <a href={user.profile.linkedin}>
                                                        <i className="fab fa-linkedin text-primary"></i>
                                                    </a>
                                                </div>
                                            }
                                            {
                                                user.profile && user.profile.github &&
                                                <div className="fs-2 d-flex mx-3">
                                                    <a href={user.profile.github}>
                                                        <i className="fab fa-github-square text-dark"></i>
                                                    </a>
                                                </div>
                                            }
                                        </div>
                                        <div className="mt-3">
                                            <div>
                                                <button type="button" className="mx-auto btn btn-outline-secondary" onClick={this.editClick}>
                                                    <i className="fas fa-user-edit"></i> Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Edit profile modal */}
                            <EditProfile user={user} updateProfile={this.updateProfile} ref={this.modalShowHandler} key={user.id} />
                            {sent && <Sent sent={sent} reload={this.reload.bind(this)}  />}

                            <div className="col-md-5 overflow-auto" style={{ height: "650px" }}>
                                <div className="col-12 col-lg-11 mx-auto mt-3">

                                    <CreatePost reload={this.reload.bind(this)} />

                                    <div className="card-header fs-5 border-0 d-flex">All posts <span className="ms-auto">{user.posts && user.posts.length}</span></div>
                                    {
                                        posts ?
                                            posts.length > 0 ?
                                                posts.map(post => {
                                                    return (
                                                        <Post post={post} user={user} authId={user.id} reload={this.reload.bind(this)} key={post.id} />
                                                    )
                                                }) :
                                                <div className="d-flex justify-content-center mt-5 py-4 alert alert-danger">
                                                    <h3>No post yet</h3>
                                                </div>
                                            :
                                            <div className="d-flex justify-content-center mt-5 py-3">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only"></span>
                                                </div>
                                            </div>

                                    }
                                </div>
                            </div>
                        </div> :
                        <div className="d-flex justify-content-center mt-5 py-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                }

                <ToastBar
                    ref={this.showToastHandler}
                />
            </div>

        )
    }
}



