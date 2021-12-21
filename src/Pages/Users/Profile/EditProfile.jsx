import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class EditProfile extends Component {

    state = {
        id: '',
        name: '',
        bio: '',
        fb: '',
        instagram: '',
        linkedin: '',
        github: '',
        modalShow: false
    }

    componentDidMount() {
        this.setState({
            id: this.props.user.id,
            name: this.props.user.name
        })

        this.props.user.profile &&
            this.setState({
                bio: this.props.user.profile.bio,
                fb: this.props.user.profile.fb,
                instagram: this.props.user.profile.instagram,
                linkedin: this.props.user.profile.linkedin,
                github: this.props.user.profile.github
            })
    }

    onchangeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleShow = () => {
        this.setState({modalShow: true})
    }
    handleClose = () => {
        this.setState({modalShow: false})
    }

    handleSubmit = () => {
        this.props.updateProfile(this.state)
        this.setState({modalShow: false})
    }


    render() {
        const { name, bio, fb, instagram, linkedin, github } = this.state
        return (
            <div>
                {/* <div className="modal fade" id="editProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header border-0 alert-secondary">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={bio && bio.length > 101} onClick={() => this.props.updateProfile(this.state)} className="btn btn-warning">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">User name</label>
                                <input type="name" name="name" value={name} onChange={this.onchangeHandle} className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <input type="bio" name="bio" value={bio || ''} onChange={this.onchangeHandle} placeholder="Describe yourself within 101 letters" className="form-control" />
                                {bio && bio.length > 101 && <div id="emailHelp" className="form-text text-danger">Bio length should be less than 101</div>}
                            </div>
                            <div>
                                <div>
                                    <label className="form-label">Social links</label>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-2 fs-3 py-0 bg-transparent" id="basic-addon1"><i className="fab fa-facebook-square text-primary"></i></span>
                                    <input type="text" name="fb" value={fb || ''} onChange={this.onchangeHandle} className="form-control" placeholder="facebook.com/example" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-2 fs-3 py-0 bg-transparent" id="basic-addon1"><i className="fab fa-instagram-square text-danger"></i></span>
                                    <input type="text" name="instagram" value={instagram || ''} onChange={this.onchangeHandle} className="form-control" placeholder="instagram.com/example" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-2 fs-3 py-0 bg-transparent" id="basic-addon1"><i className="fab fa-linkedin text-primary"></i></span>
                                    <input type="text" name="linkedin" value={linkedin || ''} onChange={this.onchangeHandle} className="form-control" placeholder="linkedin.com/example" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-2 fs-3 py-0 bg-transparent" id="basic-addon1"><i className="fab fa-github-square text-dark"></i></span>
                                    <input type="text" name="github" value={github || ''} onChange={this.onchangeHandle} className="form-control" placeholder="github.com/example" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={this.handleSubmit}
                            disabled={(bio && bio.length > 101) || name.length<=0}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
