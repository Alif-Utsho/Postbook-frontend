import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Registration extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        errors: {}
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async e => {
        e.preventDefault()

        const { name, phone, email, password } = this.state
        let errors = {}

        if (!name) {
            errors["name"] = "Please provide a Name";
        }
        if (!phone) {
            errors["phone"] = "Please provide a Phone";
        }
        if (!email) {
            errors["email"] = "Please provide an Email";
        }
        if (!password) {
            errors["password"] = "Please provide a Password";
        }

        this.setState({ errors: errors })


        if (Object.values(errors).length <= 0) {
            axios.post('/api/register', this.state)
                .then(res => {
                    localStorage.setItem('token', res.data.token.token)
                    localStorage.setItem('user_id', window.btoa(res.data.token.id))
                    localStorage.setItem('usertype', window.btoa(res.data.token.type))

                    if (res.data.token.type === 'users') {
                        window.location.pathname = "/newsfeed"
                    }
                })
                .catch(e => {
                        let errors = {}
                        errors["message"] = e.response.data.message
                        this.setState({ errors: errors })
                        console.log(e.response.data.message)
                })
        }
    }

    render() {
        if (localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) !== 'users') window.location.pathname = "/newsfeed"
        else if (localStorage.getItem('token') && window.atob(localStorage.getItem('usertype')) !== 'admin') window.location.pathname = "/dashboard"

        const { errors } = this.state
        return (
            <div>
                <section className="vh-100 bg-success bg-opacity-75">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body p-4 p-sm-5  text-center">

                                        <Link className="alert alert-danger col-12 btn fs-2 fw-bold" to="/" style={{ fontFamily: "Yeseva One" }}>
                                            <i className="fas fa-link"></i>
                                            Postbook!!
                                        </Link>

                                        <h4 className="my-3">Sign up</h4>

                                        <form onSubmit={this.handleSubmit}>

                                            <div className="form-outline mb-3">
                                                <input type="text" id="name" name="name" onChange={this.onChange} value={this.state.name} className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Name" />
                                                {
                                                    errors.name &&
                                                    <div id="validationServer03Feedback" className="invalid-feedback text-start">
                                                        {errors.name}
                                                    </div>
                                                }
                                            </div>

                                            <div className="form-outline mb-3">
                                                <input type="text" id="phone" name="phone" onChange={this.onChange} value={this.state.phone} className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Phone" />
                                                {
                                                    errors.phone &&
                                                    <div id="validationServer03Feedback" className="invalid-feedback text-start">
                                                        {errors.phone}
                                                    </div>
                                                }
                                            </div>

                                            <div className="form-outline mb-3">
                                                <input type="text" id="email" name="email" onChange={this.onChange} value={this.state.email} className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="E-mail" />
                                                {
                                                    errors.email &&
                                                    <div id="validationServer03Feedback" className="invalid-feedback text-start">
                                                        {errors.email}
                                                    </div>
                                                }
                                            </div>

                                            <div className="form-outline mb-3">
                                                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} placeholder="Password" />
                                                {
                                                    errors.password &&
                                                    <div id="validationServer03Feedback" className="invalid-feedback text-start">
                                                        {errors.password}
                                                    </div>
                                                }
                                            </div>


                                            <button className="btn btn-primary btn-block col-12 btn-lg" type="submit">Submit</button>

                                        </form>

                                        <hr className="my-4" />

                                        <a href="/login" className="btn btn-success col-12">Login here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Registration