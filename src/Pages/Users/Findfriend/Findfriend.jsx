import React, { Component } from 'react'
import axios from 'axios';

import Navbar from '../../../Components/Navbar'
import ListItem from './ListItem'

export default class Findfriend extends Component {

    state = {
        clicked: false,
        users: [],
        req_sent: false,
        reload: false,
        search: '',
        authId: ''
    }


    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevState) {
        if (this.state.reload) {
            this.fetchData()
            this.setState({ reload: false })
        }
    }

    reload() {
        this.setState({ reload: true })
    }

    fetchData() {
        axios.get('/api/users')
            .then(res => {
                this.setState({
                    ...res.data
                })
            })
            .catch(e => console.log(e))
    }


    searchHandle = e => {
        const searchtext = e.target.value
        searchtext.length > 0 ? this.setState({
            clicked: true,
            search: searchtext
        }) :
            this.setState({
                clicked: false,
                filters: []
            })

    }



    render() {
        const { clicked } = this.state
        return (
            <div className="vh-100">
                <Navbar reload={this.reload.bind(this)} />

                <div className="col-lg-6 mx-auto mt-5 container">

                    <div className="form-floating d-flex">
                        <input type="text" name="searchvlaue" className="form-control" onChange={this.searchHandle} autoComplete="off" id="email" placeholder="E-mail address" />
                        <label htmlFor="email"> <i className="far fa-edit"></i> &nbsp; User name</label>
                    </div>

                    <div className="mt-5">
                        <ul className="list-group list-group-flush">

                            {
                                clicked ?
                                    // ((clicked && filters.length > 0) ?
                                    this.state.users.filter(user =>
                                        user.name
                                            .toLowerCase()
                                            .includes(this.state.search.toLowerCase())
                                    ).map(user => {
                                        return (
                                            <ListItem
                                                key={user.id}
                                                user={user}
                                                reload={this.reload.bind(this)}
                                                authId={this.state.authId}
                                            />
                                        )
                                    }) :
                                    // <h1 className="alert alert-danger text-center">No user found</h1>) :
                                    <h1 className="alert alert-success text-center">Search your friends</h1>
                            }


                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

// const ListItem = ({ user, req_sent, addFriend }) => {
//     return (
//         <li className="list-group-item d-flex justify-content-between align-items-start">
//             <i className="fas fa-user me-1 fs-4 my-auto text-success"></i>
//             <div className="ms-2 me-auto">
//                 <div className="fw-bold">{user.name}</div>
//                 <span className="text-muted">{user.profile && user.profile.bio}</span>
//             </div>
//             <span>
//                 <button
//                     className="btn btn-primary"
//                     disabled={req_sent === user.id}
//                     onClick={() => addFriend(user.id)}>
//                     <i className="fas fa-user-plus me-1"></i>
//                     {user.sent.filter(req => user.id === req.receiver.id) ? 'Request sent' : 'Add friend'}
//                 </button>
//             </span>

//         </li>
//     )
// }
