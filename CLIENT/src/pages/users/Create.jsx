import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../utils/api";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const addUser = { name, email, age };
    const result = await apiCall("users/create", "POST", addUser, { "Content-Type": "application/json" })
    if (!result.status) { setError(result.msg); setResponse(""); }
    else { setResponse(result.data.msg); setError(""); setName(""); setEmail(""); setAge(0); navigate("/userlist"); }
  }

  return (
    <div className="container my-5 py-5">
      {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
      {response && (<div className="alert alert-success" role="alert">{response}</div>)}

      <h2>Enter the Data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input name="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input name="age" type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Create;
