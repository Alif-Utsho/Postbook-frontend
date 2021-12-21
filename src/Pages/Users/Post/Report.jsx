import axios from 'axios';
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

export default class Report extends Component {

    state = {
        report: '',
        modalShow: false
    }

    componentDidMount() {
        
    }

    onchangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReportShow = () => {
        this.setState({ modalShow: true })
    }
    handleReportClose = () => {
        this.setState({ modalShow: false })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/createreport', { desc: this.state.report, post_id: this.props.post.id })
            .then(res => {
                this.handleReportClose()
                this.props.reload()
                this.props.showToast(res.data.message)
            })
            .catch(e => console.log(e))

        this.setState({ report: '' })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} onHide={this.handleReportClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Report this post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className=" mb-2">
                            <div className="form-group">
                                <textarea name="report" onChange={this.onchangeHandler} value={this.state.report} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write about the post and send to Admin"></textarea>
                            </div>
    
                            <div className={this.state.report.trim().length > 0 ? "d-flex" : "d-flex d-none"}>
                                <button onClick={this.handleSubmit} className="btn btn-primary mt-2 ms-auto col-12">Submit Report</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
