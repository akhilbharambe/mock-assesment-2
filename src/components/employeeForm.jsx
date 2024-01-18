// EmployeeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ closeModal, employeeData, isEditing, updateEmployeeList }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Tech');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (isEditing && employeeData) {
      setFirstName(employeeData.firstName);
      setLastName(employeeData.lastName);
      setEmail(employeeData.email);
      setDepartment(employeeData.department);
      setSalary(employeeData.salary);
    }
  }, [isEditing, employeeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = { firstName, lastName, email, department, salary };

    try {
      if (isEditing) {
        await axios.put(`https://mock-template-h8js.onrender.com/employee/${employeeData.id}`, newEmployee);
      } else {
        await axios.post('https://mock-template-h8js.onrender.com/employee', newEmployee);
      }
      updateEmployeeList();
      closeModal();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Department:
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="Tech">Tech</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </label>
        <br />

        <label>
          Salary:
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </label>
        <br />

        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
