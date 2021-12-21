import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Navbar from '../../../Components/Navbar'
import Post from '../Post/Post'
import UnfriendBtn from '../../../Components/ConButtons/UnfriendBtn'
import CancelBtn from '../../../Components/ConButtons/CancelBtn'
import ConfirmBtn from '../../../Components/ConButtons/ConfirmBtn'
import AddBtn from '../../../Components/ConButtons/AddBtn'

export default class Profile extends Component {

    // Searched profile
    state = {
        // user
        // request
        // sent
        // friends
        reload: false,
        authId: 2
    }

    componentDidMount() {
        this.fetchData()

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user) {
            if (this.state.authId === this.state.user.id) {
                window.location.pathname = "/profile"
            }
        }
        if (this.state.reload) {
            this.fetchData()
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get(`/api/profile/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
        axios.get(`/api/postofuser/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
        // axios.get('/api/connection')
        //     .then(res => this.setState({ ...res.data }))
        //     .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { user, posts, authId } = this.state
        let friends = [];
        if (user && (user.send_byfriends || user.rec_byfriends)) {
            friends = user.send_byfriends.concat(user.rec_byfriends)
        }
        return (
            <div>
                {user && window.atob(localStorage.getItem('usertype')) !== 'admin' && <Navbar reload={this.reload.bind(this)} />}

                {
                    user && window.atob(localStorage.getItem('usertype')) === 'admin' &&
                    <div className="offset-3 my-auto p-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/dashboard" className=" text-decoration-none">Dashboard</Link></li>
                                <li class="breadcrumb-item"><Link to="/users" className=" text-decoration-none">Users</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">{user.name}</li>
                            </ol>
                        </nav>
                    </div>
                }

                {user ?
                    <div>

                        <div className="container">
                            <div className="d-flex justify-content-center text-center text-md-start">
                                <div className="col-md-7 shadow-sm col-12 mt-3 bg-white p-3 border-primary border-3 border-top rounded-top">
                                    <div className="d-md-flex">
                                        <i className="fas fa-user fs-1 me-2 mb-md-0 mb-2 fs-5 me-md-3 my-auto alert p-md-5 rounded-circle alert-success"></i>
                                        <div className="my-auto col-md-6">
                                            <h3 className="fw-bold">{user.name}</h3>
                                            <h5 className="fs-5 text-muted">{user.profile && user.profile.bio && user.profile.bio}</h5>
                                            <p className="text-dark"><i class="fas text-muted fa-envelope"></i> {user.email}</p>
                                        </div>
                                        <div className="ms-auto">
                                            {
                                                user && window.atob(localStorage.getItem('usertype')) !== 'admin' && friends.filter(frnd => frnd.sender === authId || frnd.receiver === authId).length > 0 &&
                                                <div className="d-flex justify-content-md-end justify-content-center">
                                                    {
                                                        user.profile && user.profile.fb &&
                                                        <div className="fs-2 d-flex mx-2">
                                                            <a href={user.profile.fb}>
                                                                <i className="fab fa-facebook-square text-primary"></i>
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        user.profile && user.profile.instagram &&
                                                        <div className="fs-2 d-flex mx-2">
                                                            <a href={user.profile.instagram}>
                                                                <i className="fab fa-instagram-square text-danger"></i>
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        user.profile && user.profile.linkedin &&
                                                        <div className="fs-2 d-flex mx-2">
                                                            <a href={user.profile.linkedin}>
                                                                <i className="fab fa-linkedin text-primary"></i>
                                                            </a>
                                                        </div>
                                                    }
                                                    {
                                                        user.profile && user.profile.github &&
                                                        <div className="fs-2 d-flex mx-2">
                                                            <a href={user.profile.github}>
                                                                <i className="fab fa-github-square text-dark"></i>
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            <div className="mt-md-5 mt-2">
                                                <div>


                                                    {
                                                        user && window.atob(localStorage.getItem('usertype')) !== 'admin' && user.sent.filter(send => send.receiver === authId).length > 0 &&
                                                        <ConfirmBtn req_id={user.sent.find(send => send.receiver === authId).id} reload={this.reload.bind(this)} key={user.sent.find(send => send.receiver === authId).id} />

                                                    }

                                                    {
                                                        user && window.atob(localStorage.getItem('usertype')) !== 'admin' && user.request.filter(req => req.sender === authId).length > 0 &&
                                                        <CancelBtn req_id={user.request.find(req => req.sender === authId).id} reload={this.reload.bind(this)} key={user.request.find(req => req.sender === authId).id} />
                                                    }

                                                    {
                                                        user && window.atob(localStorage.getItem('usertype')) !== 'admin' && friends.filter(frnd => frnd.sender === authId || frnd.receiver === authId).length > 0 &&
                                                        <UnfriendBtn req_id={friends.find(frnd => frnd.sender === authId || frnd.receiver === authId).id} reload={this.reload.bind(this)} />
                                                    }
                                                    {
                                                        user && window.atob(localStorage.getItem('usertype')) !== 'admin' &&
                                                        (
                                                            !(user.sent.filter(send => send.receiver === authId).length > 0) &&
                                                            !(user.request.filter(req => req.sender === authId).length > 0) &&
                                                            !(friends.filter(frnd => frnd.sender === authId || frnd.receiver === authId).length > 0)
                                                        ) &&
                                                        <AddBtn user_id={user.id} reload={this.reload.bind(this)} />
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="text-muted border-1 my-4 col-11 mx-auto border border-primary" />
                                    <div className="d-flex px-md-5 justify-content-between">

                                        <div className="p-2 mx-1 my-md-0 my-2 card rounded border-1 border-primary col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-user-friends mt-auto display-6 text-muted d-none d-md-flex"></i>
                                                <div className="text-center">
                                                    <h3><b>{friends.length}</b></h3>
                                                    <h6 className="text-muted">Friends</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 mx-1 my-md-0 my-2 card rounded border-1 border-danger col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-user-minus mt-auto display-6 text-muted d-none d-md-flex"></i>
                                                <div className="text-center">
                                                    <h3><b>{user.sent.length}</b></h3>
                                                    <h6 className="text-muted">Following</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 mx-1 my-md-0 my-2 card rounded border-1 border-success col-md-3">
                                            <div className="d-flex justify-content-between">
                                                <i className="fas fa-user-plus mt-auto display-6 text-muted d-none d-md-flex"></i>
                                                <div className="text-center">
                                                    <h3><b>{user.request.length}</b></h3>
                                                    <h6 className="text-muted">Follower</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-lg-7 mx-auto mt-4">
                                <div className="card-header fs-4 border-0 d-flex">Posts <span className="ms-auto">{user.posts.length}</span></div>
                                {
                                    friends.filter(frnd => frnd.sender === authId || frnd.receiver === authId).length > 0 || authId === 1 ?
                                        posts ?
                                            posts.length > 0 ?
                                                posts.map(post => {
                                                    return (
                                                        <Post post={post} user={user} authId={authId} key={post.id} reload={this.reload.bind(this)} />
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
                                            </div> :
                                        <div className="d-flex justify-content-center mt-5 py-4 alert alert-danger">
                                            <h3>Make friend to see posts</h3>
                                        </div>

                                }
                            </div>
                        </div>

                    </div>
                    :
                    // <div className="d-flex justify-content-center mt-5 py-3">
                    //     <div className="spinner-border text-primary" role="status">
                    //         <span className="sr-only"></span>
                    //     </div>
                    // </div>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="alert alert-danger col-6 text-center fs-1">No User found</div>
                    </div>
                }
            </div>
        )
    }
}


// const PostItem = ({ post, user }) => {
//     const d = new Date()
//     const m = d.getMonth() + 1;
//     const date = d.getFullYear() + '-' + m + '-' + d.getDate();
//     return (
//         <div className="rounded my-3 bg-light border-3 border-start border-primary shadow-sm">
//             <div className="card-body pb-0">
//                 <div className="d-flex mb-2">
//                     <i className="fas rounded-circle fa-user me-2 fs-5 my-auto alert p-2 alert-success"></i>
//                     <div>
//                         <h5 className="card-title fs-6 fw-bold">{user.name}</h5>
//                         <h6 className="card-subtitle text-muted">{post.created_at.slice(11, 16)}{date === post.created_at.slice(0, 10) ? '' : ',' + ' ' + post.created_at.slice(0, 10)}</h6>
//                     </div>

//                 </div>
//                 <p className="card-text fs-5">{post.desc}</p>
//                 <p> <span>48 Loves </span> &nbsp;•&nbsp; <span>176 Comments</span> </p>
//                 {/* <hr className="col-12 mb-1 col-md-7" />
//                  <div className="d-flex col-12 col-md-6">
//                     <div className={this.state.liked ? "btn btn-sm col-4 text-danger fw-bold" : "btn btn-sm col-4"} onClick={this.likeClick}><i className={this.state.liked ? "fas fa-heart me-1" : "far fa-heart me-1"} ></i>Love</div> <div className="vr"></div>
//                     <div className="btn btn-sm col-5"><i className="far fa-comment me-1"></i>Comment</div> <div className="vr"></div>
//                     <div className="btn btn-sm col-4"><i className="far fa-share-square me-1"></i>Share</div>
//                 </div> */}
//             </div>
//         </div>
//     )
// }