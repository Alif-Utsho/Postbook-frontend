import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditComment from './EditComment';

export default class Comment extends Component {

    state = {
        
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.reload()
    }

    deleteComment = post_id => {
        axios.put('/api/deletecomment', { id: post_id })
            .then(res => {
                this.props.reload()
            })
            .catch(e => console.log(e))
    }

    editComment = ({ desc, id }) => {
        axios.put('/api/editcomment', { desc, id })
            .then(res => {
                this.props.reload()
            })
            .catch(e => console.log(e))
    }


    modalShowHandler = (editComment) => {
        if (editComment) this.showModal = editComment.handleShow
    }

    editClick = () => {
        this.showModal()
    }

    render() {
        const { comment, authId } = this.props

        return (
            <div className="bg-white rounded shadow-sm mb-2">
                <div className="d-flex p-2">
                    <div>
                        <i className="fas rounded-circle fa-user me-2 alert p-2 alert-success" style={{ fontSize: '15px' }}></i>
                    </div>
                    <div className="row">
                        <div className=" d-flex">
                                <Link to={`/profile/${comment.user.id}`} className="text-decoration-none text-dark">
                                    <h6 className="card-title fs-6 fw-bold mb-0">{comment.user.name}</h6>
                                </Link>
                                
                        </div>
                        
                        <div className="card-text mb-0">{comment.desc}</div>
                    </div>
                    {
                        (comment.user.id === authId) &&
                        <div className="ms-auto">
                            <button className="bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-h text-secondary"></i></button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                                <div>
                                    <li><button className="dropdown-item" onClick={this.editClick}><i className="fas fa-pen"></i>  Edit comment</button></li>

                                    <li><button onClick={() => this.deleteComment(comment.id)} className="dropdown-item text-danger"><i className="fas fa-trash-alt"></i> Delete comment</button></li>
                                </div>

                            </ul>
                        </div>
                    }
                </div>


                <EditComment
                    comment={comment}
                    editComment={this.editComment}
                    ref={this.modalShowHandler}
                    reload={this.props.reload}
                    key={comment.id}
                />

            </div>
        )
    }
}
