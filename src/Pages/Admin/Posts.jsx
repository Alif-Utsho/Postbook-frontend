import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


export default function Posts() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/posts')
            .then(res => setData(res.data))
            .catch(e => console.log(e))
    }, [data.length])

    const { posts } = data

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
                                    <th scope="col" className="col-2">Author</th>
                                    <th scope="col">Post content</th>
                                    <th scope="col" className="text-center">Reports</th>
                                    <th scope="col" className="text-center">Reacts</th>
                                    <th scope="col" className="text-center">Comments</th>
                                    <th scope="col" className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts && posts.map((post, index) => {
                                        return (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td> {post.user.name} </td>
                                                <td> {post.desc} </td>
                                                <td className="text-center">
                                                    {
                                                        post.reports.length >= 5 ?
                                                            <span className="badge rounded-circle bg-danger">{post.reports.length}</span> :
                                                            <span> {post.reports.length} </span>
                                                    }
                                                </td>
                                                <td className="text-center"> {post.reacts.length} </td>
                                                <td className="text-center"> {post.comments.length} </td>
                                                <td className="text-center">
                                                    <Link to={`/posts/${post.id}`} className="btn btn-sm text-decoration-none btn-primary">
                                                        View
                                                    </Link>
                                                </td>
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
