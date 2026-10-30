
import { useState } from "react";

function ChildRegistration({ onChildRegistered }) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    parentName: "",
    parentPhone: "",
    parentEmail: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  
async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/children", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to register child");
    }

    const savedChild = await response.json();

    await onChildRegistered();

alert(`Child ${savedChild.name} registered successfully!`);

    setFormData({
      name: "",
      dateOfBirth: "",
      gender: "",
      parentName: "",
      parentPhone: "",
      parentEmail: ""
    });
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Please check whether the backend is running.");
  }
}


  return (
    <div>
      <h1>Child Vaccination Notifier</h1>
      <h2>Register Your Child</h2>

      <form onSubmit={handleSubmit}>
        <label>Child Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <br /><br />

        <label>Parent Name</label>
        <input
          type="text"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Parent Phone</label>
        <input
          type="tel"
          name="parentPhone"
          value={formData.parentPhone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Parent Email</label>
        <input
          type="email"
          name="parentEmail"
          value={formData.parentEmail}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Register Child</button>
      </form>
    </div>
  );
}

export default ChildRegistration;
