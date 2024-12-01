import React from 'react';
import { deleteEmployee } from '../services/employees';

const DeleteModal = ({ employee, onClose, onDelete }) => {
  if (!employee) return null;

  const deleteUser = async () => {
    try {
      await deleteEmployee(employee._id); 
      onDelete(employee._id); 
      onClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to delete this employee?</h2>
        <div className="modal-body">
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Date Joined:</strong> {employee.date_of_joining}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </div>
        <button  onClick={deleteUser} className='delete close-modal'>
          Delete
        </button>
        <button className="close-modal" style={{ marginLeft: 10 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
