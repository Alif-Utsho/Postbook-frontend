import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../../../Components/Navbar'
import Post from '../Post/Post'
import Request from './Connection/Request'
import Sent from './Connection/Sent'

class Newsfeed extends Component {
    state = {
        reload: false
    }

    

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData()
            this.setState({ reload: false })
        }
    }

    fetchData() {
        axios.get('/api/connection')
            .then(res => {
                this.setState({
                    ...res.data
                })
            })
            .catch(e => console.log(e))

        axios.get('/api/posts')
            .then(res => {
                this.setState({ ...res.data })
            })
            .catch(e => console.log(e))
    }

    reload() {
        this.setState({ reload: true })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.posts) {
    //         if (prevState.posts !== this.state.posts) {
    //             console.log('updated')
    //         }
    //     }
    // }

    render() {
        const { posts, request, sent, friends, authId } = this.state
        const friendList = []

        friends && friends.map(friend => {
            friend.sender.id === authId ? friendList.push(friend.receiver.id) : friendList.push(friend.sender.id)
            return null
        })
        return (
            <div>
                <Navbar reload={this.reload.bind(this)} />
                <div className="container col-lg-9">
                    <div className="d-flex justify-content-center mt-4">

                        <div className="col-lg-7 col-12 overflow-auto px-md-4" style={{ maxHeight: '630px' }}>

                            {
                                posts ?
                                    posts.filter(post => friendList.includes(post.user.id)).length > 0 ?
                                        posts
                                            .filter(post => friendList.includes(post.user.id))
                                            .map(post => {
                                                return <Post post={post} user={post.user} authId={authId} reload={this.reload.bind(this)} key={post.id} />
                                            }) :
                                        <div className="mt-5 py-4 alert alert-danger">
                                            <h3 className="text-center">No post yet</h3>
                                            <h5 className="text-center">Make more friends to see post</h5>
                                        </div>
                                    :
                                    <div className="d-flex justify-content-center mt-5 py-3">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>

                            }

                        </div>
                        <div className="vr mx-auto d-none px-0 d-lg-block my-3"></div>

                        <div className="col-4 bg-white d-none d-lg-block border-top border-primary rounded border-2">
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

                        {/* <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                                    <div className="offcanvas-header">
                                        <h5 id="offcanvasRightLabel">Request sent</h5>
                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <ul className="list-group list-group-flush overflow-auto">
                                        {sent && sent.length > 0 ? sent.map(s => <Sent sent={s} key={s.id} />) :
                                            <span className="text-center mt-5 p-5 mx-auto col-10 alert alert-danger">No sent requests</span>}
                                    </ul>
                                </div> */}

                        {/* Requests sent offcanvas */}
                    </div>


                </div>
            </div>
        );
    }
}

// const List = ({ request }) => {
//     return (
//         <li className="list-group-item d-flex justify-content-between align-items-start p-0 bg-transparent pb-1 border-bottom border-success">
//             <i className="fas fa-user me-1 fs-5 my-auto alert p-1 alert-success"></i>
//             <div className="ms-2 me-auto my-auto">
//                 <div className="fw-bold">{ request.sender.name }</div>
//                 <span className="text-muted">{request.sender_profile && request.sender_profile.bio.slice(0, 22)}{request.sender_profile && request.sender_profile.bio.length > 22 && '....' }</span>
//             </div>

//             <span className="my-auto">
//                 <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => this.addFriend(request.id)}
//                 >
//                     <i className="fas fa-user-plus me-1"></i>
//                     Confirm request
//                 </button>
//             </span>

//         </li>
//     )
// }
export default Newsfeed;