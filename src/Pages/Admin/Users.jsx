import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


function Users() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/users')
            .then(res => setData(res.data))
            .catch(e => console.log(e))
    }, [data.length])

    const { users } = data

    return (
        <div>
            <div className="d-flex">
                <div className="col-3">
                    <Sidebar />

                </div>
                <div className="w-100">
                    <div className="bg-primary">
                        <Navbar tittle="User lists" />
                    </div>

                    <div className="table-responsive m-3" style={{ height: '620px' }}>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Friends</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users && users.map((user, index) => {
                                        return (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td> {user.name} </td>
                                                <td> {user.email} </td>
                                                <td> {user.phone} </td>
                                                <td> {user.send_byfriends.length + user.rec_byfriends.length} </td>
                                                <td> <Link to={`/profile/${user.id}`} className="btn btn-sm text-decoration-none btn-primary">Profile</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;