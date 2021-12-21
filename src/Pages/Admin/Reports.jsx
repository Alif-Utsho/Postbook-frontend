import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


export default function Reports() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/reports')
            .then(res => setData(res.data))
            .catch(e => console.log(e))
    }, [data.length])


    const { reports } = data

    return (
        <div>
            <div className="d-flex">
                <div className="col-3">
                    <Sidebar />

                </div>
                <div className="w-100">
                    <div className="bg-primary">
                        <Navbar tittle="Post lists" />
                    </div>

                    <div className="table-responsive m-3" style={{ height: '620px' }}>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th scope="col" className="col-2">Reporter</th>
                                    <th scope="col">Report description</th>
                                    <th scope="col">Post content</th>
                                    <th scope="col" className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports && reports.map((report, index) => {
                                        return (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td> {report.user.name} </td>
                                                <td> {report.desc} </td>
                                                <td> {report.post.desc} </td>
                                                <td className="text-center"> <Link to={`/posts/${report.post.id}`} className="btn btn-sm text-decoration-none btn-primary">View Post</Link></td>
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
