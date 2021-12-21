import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class EditPost extends Component {

    state = {
        editPost: '',
        modalShow: false
    }

    componentDidMount() {
        this.setState({
            editPost: this.props.post.desc
        })
    }

    onchangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditShow = () => {
        this.setState({ modalShow: true })
    }
    handleEditClose = () => {
        this.setState({ modalShow: false })
    }

    handleSubmit = () => {
        this.props.editPost({ desc: this.state.editPost, id: this.props.post.id})
        this.setState({ modalShow: false })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className=" mb-2">
                            <div className="form-group">
                                <textarea name="editPost" onChange={this.onchangeHandler} value={this.state.editPost} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write down your thoughts here and share with friends"></textarea>
                            </div>

                            <div className={this.state.editPost.trim() !== this.props.post.desc && this.state.editPost.trim().length > 0 ? "d-flex" : "d-flex d-none"}>
                                <button onClick={this.handleSubmit} className="btn btn-warning mt-2 ms-auto col-12">Save Changes</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
