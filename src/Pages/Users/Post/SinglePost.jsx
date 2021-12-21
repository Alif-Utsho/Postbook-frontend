import axios from 'axios';
import React, { Component } from 'react';
import Navbar from '../../../Components/Navbar'
import Post from './Post';
import Comment from './Comment';
import ReactList from './ReactList';
import { Link } from 'react-router-dom';

class SinglePost extends Component {

    state = {
        reload: false,
        newComment: ''
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.fetchData()
            this.setState({ reload: false })
        }
    }

    onchangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fetchData() {
        axios.get(`/api/post/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))

        axios.get(`/api/comments/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))

        axios.get(`/api/reacts/${this.props.id}`)
            .then(res => this.setState({ ...res.data }))
            .catch(e => console.log(e))
    }

    handleComment = () => {
        axios.post(`/api/createcomment`, { 'desc': this.state.newComment, 'post_id': this.state.post.id })
            .then(res => {
                this.setState({ reload: true, newComment: '' })
            })
            .catch(e => console.log(e))
    }


    reactModalShowHandler = (reactList) => {
        if (reactList) this.showReactModal = reactList.handleShow
    }

    reactClick = () => {
        this.showReactModal()
    }

    reload() {
        this.setState({
            reload: true
        })
    }
    render() {
        const { post, comments, reacts, authuser, authId } = this.state
        return (
            <div>
                {window.atob(localStorage.getItem('usertype')) !== 'admin' && <Navbar reload={this.reload.bind(this)} />}

                {
                    window.atob(localStorage.getItem('usertype')) === 'admin' &&
                    <div className="offset-3 my-auto p-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/dashboard" className=" text-decoration-none">Dashboard</Link></li>
                                <li class="breadcrumb-item"><Link to="/posts" className=" text-decoration-none">Posts</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">{post ? post.user.name : "404 not found"}</li>
                            </ol>
                        </nav>
                    </div>
                }

                {
                    post ?
                        authuser && authId ?
                            ((authuser.send_byfriends.filter(friend => friend.receiver === post.user_id).length > 0) ||
                                (authuser.rec_byfriends.filter(friend => friend.sender === post.user_id).length > 0)) ||
                                post.user_id === authId || window.atob(localStorage.getItem('usertype')) === 'admin' ?
                                Object.keys(post).length > 0 ?
                                    <div className="col-12 p-1 col-md-6 mx-auto">
                                        <div>
                                            <Post post={post} user={post.user} authId={authId} reload={this.reload.bind(this)} showReact key={post.id} />
                                            {
                                                reacts && reacts.length > 0 &&
                                                <div className="ps-3 my-2"> <span onClick={this.reactClick} style={{ cursor: 'pointer' }}> <i className="far fa-heart me-1 text-danger" ></i> {reacts[reacts.length - 1].user.name} {reacts.length > 1 && ` and ${reacts.length - 1} others`} loved </span> </div>
                                            }
                                        </div>
                                        <hr />
                                        {
                                            window.atob(localStorage.getItem('usertype')) !== 'admin' &&
                                            (
                                                post.isComment ?
                                                    <div className="d-flex justify-content-between shadow-sm">
                                                        <div className={this.state.newComment.trim().length > 0 ? "form-group col-11" : "form-group col-12"}>
                                                            <textarea name="newComment" onChange={this.onchangeHandler} value={this.state.newComment} className="form-control border-0 border-start border-primary rounded-0 rounded-start" id="exampleFormControlTextarea1" rows="2" placeholder="Write a comment"></textarea>
                                                        </div>

                                                        <div className={this.state.newComment.trim().length > 0 ? "d-flex col-1" : "d-flex d-none col-1"}>
                                                            <button onClick={this.handleComment} className="btn btn-outline-primary border-0 rounded-0 rounded-end ms-auto col-12"><i className="fas fs-5 fa-paper-plane"></i></button>
                                                        </div>
                                                    </div> :
                                                    <div className="py-1 my-3 alert-danger rounded text-center">Commenting off by the author</div>
                                            )
                                        }

                                        <div className="mt-2">
                                            {
                                                comments &&
                                                comments.map(comment => {
                                                    return <Comment comment={comment} key={comment.id} reload={this.reload.bind(this)} authId={authId} />
                                                })
                                            }
                                        </div>
                                    </div> :
                                    <div className="d-flex justify-content-center mt-5">
                                        <div className="alert alert-danger col-6 text-center fs-1">No Post found</div>
                                    </div> :
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="alert alert-danger col-6 text-center fs-1">You are not supposed to see this post</div>
                                </div> :
                            <div className="d-flex justify-content-center mt-5 py-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div> :
                        <div className="d-flex justify-content-center mt-5">
                            <div className="alert alert-danger col-6 text-center fs-1">No Post found</div>
                        </div>
                }

                {
                    post &&
                    <ReactList
                        reacts={reacts ? reacts : []}
                        ref={this.reactModalShowHandler}
                        key={`react${post.id}`}
                        reload={this.reload.bind(this)}
                        reloadPost={this.reload.bind(this)}
                    />
                }

            </div>
        );
    }
}

export default SinglePost;