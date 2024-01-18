// EmployeeTable.js
import React from 'react';

const EmployeeTable = ({ employees, editEmployee, deleteEmployee }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
            <td>
              <button onClick={() => editEmployee(employee)}>Edit</button>
              <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
