import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../../../utils/api";

function Update() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");
    const [userData, setUserData] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const getUserData = async () => {
        const { status, data, msg } = await apiCall(`users/details/${id}`, "GET", "", { "Content-Type": "application/json" })
        if (!status) { setError(msg || "Failed to fetch user details"); setUserData(null); return; }
        setUserData(data?.data);
        setName(data?.data?.name);
        setEmail(data?.data?.email);
        setAge(data?.data?.age);
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleEdit = async (event) => {
        event.preventDefault();

        const addUser = { name, email, age };
        const { status, data, msg } = await apiCall(`users/update/${id}`, "PATCH", addUser, { "Content-Type": "application/json" })
        if (!status) { setError(msg || "Failed to update user"); setResponse(""); return; }
        setResponse(msg || "User updated successfully");
        setError("");
        setName("");
        setEmail("");
        setAge(0);
        navigate("/users/list");

    };

    return (
        <div className="container my-2">
            {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
            {response && (<div className="alert alert-success" role="alert">{response}</div>)}

            <h2>Edit the Data</h2>
            <form onSubmit={handleEdit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" type="text" className="form-control" defaultValue={userData?.name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" defaultValue={userData?.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input name="age" type="number" className="form-control" defaultValue={userData?.age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Update;
