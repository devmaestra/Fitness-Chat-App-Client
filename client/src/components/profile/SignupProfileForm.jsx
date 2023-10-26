import React, { useState } from "react";
import axios from "axios"; // You may need to import Axios for making API requests
import { Button, Form, FormGroup, Label, Input } from "reactstrap"; // Adjust this for your styling

function SignupProfileForm({ user, onSave, onDelete }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API request to save the user data
      const response = await axios.patch(`/api/users/${formData._id}/edit`, formData);

      // Handle response and display success or error message
      if (response.status === 200) {
        // Profile updated successfully
        onSave(response.data.updated);
      } else {
        // Handle the error case
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make an API request to delete the user
      const response = await axios.delete(`/api/users/${formData._id}`);

      // Handle response and display success or error message
      if (response.status === 200) {
        // User deleted successfully
        onDelete();
      } else {
        // Handle the error case
        console.error("User deletion failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        {/* Add more form fields for other user properties */}
        <Button color="primary" type="submit">
          Save
        </Button>
      </Form>
      <Button color="danger" onClick={handleDelete}>
        Delete My Profile
      </Button>
    </div>
  );
}

export default SignupProfileForm;
