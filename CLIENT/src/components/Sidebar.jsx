import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link className={({ isActive }) => (isActive ? 'active' : '')} to="/"> Home </Link>
            {/* <Link className={({ isActive }) => (isActive ? 'active' : '')} to="/create"> Create</Link>
            <Link className={({ isActive }) => (isActive ? 'active' : '')} to="/userlist">User List</Link> */}
            <Link className={({ isActive }) => (isActive ? 'active' : '')} to="/users">Users</Link>
        </div>
    );
}

export default Sidebar;
