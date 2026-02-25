import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiCall } from "../../../utils/api";
// import LoadingSpinner from "../../components/LoadingSpinner";

function Read() {
    let [users, setUsers] = useState([]);
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);

    const getUsers = async () => {
        const { status, data, msg } = await apiCall("users/list", "GET", "", { "Content-Type": "application/json" })
        if (!status) { setError(msg || "Failed to fetch users"); setUsers([]); setLoading(false); return; }
        setUsers(data?.data || []);
        setLoading(false);
        setError("");
    }

    const handleDelete = async (id) => {
        const { status, data, msg } = await apiCall("users/delete", "DELETE", id, { "Content-Type": "application/json" })
        if (!status) { setError(msg || "Failed to delete user"); setLoading(false); return; }
        setSuccess(msg || "User deleted successfully");
        setTimeout(() => { setError(""); getUsers(); }, 100);
    };

    useEffect(() => {
        getUsers();
    }, [])

    // if (loading) {
    //     return <LoadingSpinner text="Loading about..." />
    // }
    return (
        <div className="container my-2">
            {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
            <h2 className="text-center">User List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.age}</td>
                            <td>
                                <Link to={`/users/update/${user?._id}`} className="card-link m-2">Edit</Link>
                                <a href="#" className="card-link m-2" onClick={() => handleDelete(user?._id)}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Read;
