
function Navbar(props) {

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary pb-1">
                <div className="container-fluid">
                    <h6 className="navbar-brand d-flex mt-1"> {props.tittle} </h6>
                </div>
            </nav>
        </div>
    )
}

export default Navbar