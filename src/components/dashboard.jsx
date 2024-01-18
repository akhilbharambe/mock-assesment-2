// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from './employeeForm';
import EmployeeTable from './employeeTable';
import Pagination from './pagination';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchEmployeeData();
  }, [currentPage, departmentFilter, sortOrder, searchTerm]);


  const fetchEmployeeData = async () => {
    try {
        const response = await axios.get('https://mock-template-h8js.onrender.com/employee');
        let filteredEmployees = response.data;
  
        // Apply department filter
        if (departmentFilter !== 'All') {
          filteredEmployees = filteredEmployees.filter((employee) => employee.department === departmentFilter);
        }
  
        // Apply search term filter
        if (searchTerm.trim() !== '') {
          filteredEmployees = filteredEmployees.filter((employee) =>
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
  
        // Sort employees by salary
        filteredEmployees.sort((a, b) => {
          const salaryA = parseFloat(a.salary);
          const salaryB = parseFloat(b.salary);
          return sortOrder === 'asc' ? salaryA - salaryB : salaryB - salaryA;
        });
  
        // Paginate the result
        const indexOfLastEmployee = currentPage * employeesPerPage;
        const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
        const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
        setEmployees(currentEmployees);
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  const addEmployee = () => {
    setShowModal(true);
    setEditingEmployee(null);
  };
  const logout = () => {
    localStorage.clear()
    navigate('/');
  };

  const editEmployee = (employee) => {
    setShowModal(true);
    setEditingEmployee(employee);
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`https://mock-template-h8js.onrender.com/employee/${employeeId}`);
      fetchEmployeeData();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDepartmentFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <button onClick={addEmployee}>Add Employee</button>
      <button onClick={logout}>Logout</button>

      <label>
        Filter by Department:
        <select value={departmentFilter} onChange={handleDepartmentFilterChange}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
      </label>

      <label>
        Sort by Salary:
        <button onClick={handleSortOrderChange}>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</button>
      </label>

      <label>
        Search by First Name:
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      </label>

      <EmployeeTable employees={employees} editEmployee={editEmployee} deleteEmployee={deleteEmployee} />
      <Pagination totalPages={Math.ceil(employees.length / employeesPerPage)} currentPage={currentPage} onPageChange={handlePageChange} />

      {showModal && (
        <div className="modal">
          <EmployeeForm closeModal={closeModal} employeeData={editingEmployee} isEditing={!!editingEmployee} updateEmployeeList={fetchEmployeeData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
