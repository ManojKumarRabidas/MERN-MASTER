import '../App.css'
import List from './partials/users/List';
import Create from './partials/users/Create';
import Update from './partials/users/Update';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes, Navigate, NavLink } from 'react-router-dom';

export default function Users() {

    return (
        <div className="App" style={{ marginTop: "70px" }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light inner-navbar">
                <NavLink className={({ isActive }) => (isActive ? 'active navbar-brand inner-nav-item' : 'navbar-brand inner-nav-item')} to="list">List</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active navbar-brand inner-nav-item' : 'navbar-brand inner-nav-item')} to="create">Create</NavLink>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Routes>
                            <Route path="/" element={<Navigate to="list" />} />
                            <Route path='list' element={<List />} />
                            <Route path='create' element={<Create />} />
                            <Route path='update/:id' element={<Update />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}