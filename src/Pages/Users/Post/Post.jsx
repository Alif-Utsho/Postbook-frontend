import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditPost from './EditPost'
import Report from './Report'
import ToastBar from '../../../Components/ToastBar'

export default class Post extends Component {

    state = {
        liked: false,
        // reacts: []
        // reactCount
        readmore: false,
        reload: false
    }

    componentDidMount() {
        this.fetchData()

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.reload) {
            this.setState({ reload: false })
        }

    }

    fetchData() {
        this.props.post.reacts && this.props.post.reacts
            .filter(react => react.user_id === this.props.authId).length > 0 &&
            this.setState({ liked: true })
    }

    likeClick = e => {

        !this.state.liked ? (
            axios.post('/api/like', { post_id: this.props.post.id })
                .then(res => {
                    this.reload()
                    this.props.reload()
                })
                .catch(e => console.log(e))
        ) : (

            axios.put('/api/unlike', { post_id: this.props.post.id })
                .then(res => {
                    this.reload()
                    this.props.reload()
                })
                .catch(e => console.log(e))
        )
        this.setState({
            liked: !this.state.liked
        })

    }

    deletePost = post_id => {
        axios.put('/api/deletepost', { id: post_id })
            .then(res => {
                this.props.reload()
                this.showToast(res.data.message)
            })
            .catch(e => console.log(e))
    }

    editPost = ({ desc, id }) => {
        axios.put('/api/editpost', { desc, id })
            .then(res => {
                this.props.reload()
                this.showToast(res.data.message)
            })
            .catch(e => console.log(e))

        this.setState({ newPost: '' })
    }

    commentOff = post_id => {
        console.log(post_id)
        axios.put('/api/commentoff', { id: post_id })
            .then(res => {
                this.props.reload()
                this.showToast(res.data.message)
            })
            .catch(e => console.log(e))
    }

    commentOn = post_id => {
        axios.put('/api/commenton', { id: post_id })
            .then(res => {
                this.props.reload()
                this.showToast(res.data.message)
            })
            .catch(e => console.log(e))
    }

    modalShowHandler = (editPost) => {
        if (editPost) this.showModaledit = editPost.handleEditShow
    }
    editClick = () => {
        this.showModaledit()
    }

    reportModalShowHandler = (reportModal) => {
        if (reportModal) this.showModalreport = reportModal.handleReportShow
    }
    reportClick = () => {
        this.showModalreport()
    }

    showToastHandler = (toast) => {
        if (toast) this.showToast = toast.toastShow
    }


    reload() {
        this.setState({ reload: true })
    }

    render() {
        const { post, user } = this.props
        const { authId } = this.props

        const d = new Date()
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        var postStr = ''
        const postY = post.created_at.slice(0, 4)
        const postM = post.created_at.slice(5, 7)
        let postD = post.created_at.slice(8, 10)
        var postT = post.created_at.slice(11, 16)

        const postH = postT.slice(0, 2)
        const postMin = postT.slice(3, 5)

        if (parseInt(postH) + 6 >= 24) {
            postD = (parseInt(postD) + 1).toString()
            postT = (parseInt(postH) - 18).toString().concat(':').concat(postMin).concat(' AM')
        }
        else if (parseInt(postH) + 6 > 12) {
            postT = (parseInt(postH) - 6).toString().concat(':').concat(postMin).concat(' PM')
        }
        else postT = (parseInt(postH) + 6).toString().concat(':').concat(postMin).concat(' AM')


        if (d.getDate().toString() === postD && d.getFullYear().toString() === postY) {
            postStr = postT
        }
        else if (d.getDate().toString() === (parseInt(postD) + 1).toString() && d.getFullYear().toString() === postY) {
            postStr = 'Yesterday'.concat(' at ').concat(postT)
        }
        else if (d.getFullYear().toString() === postY) {
            postStr = postD.concat(' ').concat(month[postM - 1]).concat(' at ').concat(postT)
        }
        else if (d.getFullYear().toString() !== postY) {
            postStr = (month[postM - 1]).concat(' ').concat(postY) //.concat(' at ').concat(postT)
        }


        return (

            <div className="rounded my-3 bg-white border-2 border-start border-primary shadow-sm">
                <div className="card-body pb-0">
                    <div className="d-flex mb-2">
                        <i className="fas rounded-circle fa-user me-2 fs-6 my-auto alert p-2 alert-success"></i>
                        <div>
                            <Link to={`/profile/${user.id}`} className="text-decoration-none text-dark">
                                <h6 className="card-title fs-6 fw-bold">{user.name}</h6>
                            </Link>
                            <h6 className="card-subtitle text-muted" style={{ fontSize: '14px' }}>
                                {postStr}
                                {post.created_at !== post.updated_at && ` • updated`}
                            </h6>
                        </div>
                        <div className="ms-auto">
                            <button className="bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-h text-secondary"></i></button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {
                                    (user.id === authId || window.atob(localStorage.getItem('usertype')) === 'admin') ?
                                        <div>
                                            {
                                                window.atob(localStorage.getItem('usertype')) !== 'admin' &&
                                                <div>

                                                    <li><button className="dropdown-item" onClick={this.editClick}><i className="fas fa-pen"></i>  Edit post</button></li>
                                                    {
                                                        post.isComment ?
                                                            <li><button className="dropdown-item" onClick={() => this.commentOff(post.id)}><i className="fas fa-comment-slash"></i>  Turn off commenting</button></li> :
                                                            <li><button className="dropdown-item" onClick={() => this.commentOn(post.id)}><i className="far fa-comment-alt"></i>  Turn on commenting</button></li>

                                                    }
                                                </div>

                                            }

                                            <li><button onClick={() => this.deletePost(post.id)} className="dropdown-item text-danger"><i className="fas fa-trash-alt"></i> Delete post</button></li>
                                        </div> :
                                        <div>
                                            {
                                                post.reports &&
                                                    post.reports.filter(report => report.user_id === authId).length > 0 ?
                                                    <li className="dropdown-item"> You have already reported to this post </li> :
                                                    <li><button className="dropdown-item" onClick={this.reportClick}><i className="fas fa-bug"></i> Report to admin</button></li>

                                            }
                                        </div>
                                }
                            </ul>
                        </div>

                    </div>
                    <p className="card-text mb-3">
                        {
                            post.desc.length > 130 ?
                                (
                                    !this.state.readmore ?
                                        <span>
                                            <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark" style={{ cursor: 'default' }}>
                                                {post.desc.slice(0, 130)}...
                                            </Link>
                                            <b onClick={() => this.setState({ readmore: true })} style={{ cursor: 'pointer' }}> See more</b>
                                        </span> :
                                        <span>
                                            {post.desc}
                                            <b onClick={() => this.setState({ readmore: false })} style={{ cursor: 'pointer' }}> <br /> See less</b>
                                        </span>
                                ) :
                                <span>{post.desc}</span>
                        }
                    </p>
                    <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark" style={{ cursor: 'pointer' }}>

                        {/* {
                        (post.reacts && post.reacts.length > 0) || (post.comments && post.comments.length > 0) && 1
                    } */}

                        {
                            !this.props.showReact &&
                            <p className="mb-0">
                                {
                                    post.reacts && post.reacts.length > 0 &&

                                    <span>
                                        <i className="far fa-heart me-1 text-danger" ></i>
                                        {post.reacts.length}
                                    </span>
                                }
                                {
                                    post.comments && post.comments.length > 0 &&
                                    <span className="ms-3">
                                        <i className="far me-1 fa-comment-alt"></i>
                                        {post.comments.length}
                                    </span>
                                }

                            </p>
                        }

                    </Link>
                    <hr className="col-12 mb-1" />
                    {
                        window.atob(localStorage.getItem('usertype')) !== 'admin' &&
                        <div className="d-flex col-md-10 mx-auto justify-content-between">
                            <div className={this.state.liked ? "btn btn-sm text-danger fw-bold" : "btn btn-sm"} onClick={this.likeClick}><i className={this.state.liked ? "fas fa-heart me-1" : "far fa-heart me-1"} ></i>Love</div>
                            {
                                post.isComment ?
                                    <div className="btn btn-sm">

                                        <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                                            <i className="far fa-comment-alt me-1"></i>Comment
                                        </Link>
                                    </div> :
                                    <div className="btn btn-sm">
                                        <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                                            <i className="fas fa-comment-slash me-1"></i>Comment off
                                        </Link>
                                    </div>
                            }
                            <div className="btn btn-sm">
                                <div onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.host}/posts/${post.id}`)
                                    this.showToast("Post link copied to your clipboard.")
                                }
                                }>
                                    <i className="far fa-share-square me-1"></i>Share
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {/* edit post modal */}
                <EditPost
                    post={post}
                    editPost={this.editPost}
                    ref={this.modalShowHandler}
                    reload={this.props.reload}
                    key={post.id}
                />

                <Report
                    post={post}
                    editPost={this.editPost}
                    ref={this.reportModalShowHandler}
                    reload={this.props.reload}
                    showToast={this.showToast}
                    key={`report${post.id}`}
                />

                <ToastBar
                    ref={this.showToastHandler}
                />

            </div>
        )
    }
}

