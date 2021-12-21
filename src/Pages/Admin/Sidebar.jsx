import axios from 'axios';
import { Link } from 'react-router-dom';


function Sidebar() {

    function signout() {
        axios.put('/api/signout')
            .then(res => {
                localStorage.clear()
                window.location.pathname = "/login"
            })
            .catch(e => console.log(e))
    }

        return (
            <div className="bg-dark vh-100">
                <span className="d-flex align-items-center mb-3 p-2 border-bottom">
                    <span className="fs-5 fw-bold btn col-12 text-white">
                        <i className="fas fa-link"></i> Postbook
                    </span>
                </span>

                <ul className="list-unstyled ps-0 ms-4">
                    <li className="mb-1">
                        <Link to="/dashboard" className="btn rounded text-white">
                            <i className="fas fa-tachometer-alt"></i> &nbsp;
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="/users" className="btn rounded text-white">
                            <i className="fas fa-users"></i> &nbsp;
                            Users
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link to="/posts" className="btn rounded text-white">
                            <i className="fas fa-copy"></i> &nbsp;
                            Posts
                        </Link>
                    </li>

                    <li className="mb-1">
                        <Link to="/reports" className="btn rounded text-white">
                            <i className="fas fa-file-alt"></i> &nbsp;
                            Reports
                        </Link>
                    </li>
                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed text-white " data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                            <i className="fas fa-user-alt"></i> &nbsp;
                            Account
                        </button>
                        <div className="collapse ms-5" id="account-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                                <li><span onClick={signout} className="link-dark rounded text-danger text-decoration-none" style={{ cursor: 'pointer' }}>Sign out</span></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }

export default Sidebar;