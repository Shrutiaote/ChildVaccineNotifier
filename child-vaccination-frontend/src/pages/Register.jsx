
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        childName: "",
        childDateOfBirth: "",
        childGender: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setMessage("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/registration/parent-child",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullName: formData.fullName,
                        email: formData.email,
                        mobileNumber: formData.mobileNumber,
                        password: formData.password,
                        childName: formData.childName,
                        childDateOfBirth: formData.childDateOfBirth,
                        childGender: formData.childGender
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed.");
            }

            setMessage("Parent and child registered successfully!");

            setTimeout(() => navigate("/login"), 1000);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="register-heading">
            <h2>Parent and Child Registration</h2>
            <p>Create your account and register your child.</p>
       </div>

            <form onSubmit={handleSubmit} className="register-form">

                <h3>Parent Details</h3>

                <label>Parent Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <label>Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Mobile Number</label>
                <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="8"
                    required
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength="8"
                    required
                />

                <hr />

                <h3>Child Details</h3>

                <label>Child Name</label>
                <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                />

                <label>Date of Birth</label>
                <input
                    type="date"
                    name="childDateOfBirth"
                    value={formData.childDateOfBirth}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                />

                <label>Gender</label>
                <select
                    name="childGender"
                    value={formData.childGender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {message && <p style={{ color: "green" }}>{message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

            </form>

            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default Register;
