import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

export default class EditComment extends Component {

    state = {
        editComment: '',
        modalShow: false
    }

    componentDidMount() {
        this.setState({
            editComment: this.props.comment.desc
        })
    }

    onchangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleShow = () => {
        this.setState({ modalShow: true })
    }
    handleClose = () => {
        this.setState({ modalShow: false })
    }

    handleSubmit = () => {
        this.props.editComment({ desc: this.state.editComment, id: this.props.comment.id })
        this.setState({ modalShow: false })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className=" mb-2">
                            <div className="form-group">
                                <textarea name="editComment" onChange={this.onchangeHandler} value={this.state.editComment} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write down your thoughts here and share with friends"></textarea>
                            </div>

                            <div className={this.state.editComment.trim() !== this.props.comment.desc && this.state.editComment.trim().length > 0 ? "d-flex" : "d-flex d-none"}>
                                <button onClick={this.handleSubmit} className="btn btn-warning mt-2 ms-auto col-12">Save Changes</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
