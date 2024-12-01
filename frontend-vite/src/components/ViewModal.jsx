import React from 'react';

const ViewModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Employee Details</h2>
        <div className="modal-body">
          <p><strong>First Name:</strong> {employee.first_name}</p>
          <p><strong>Last Name:</strong> {employee.last_name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
          <p><strong>Date Joined:</strong> {employee.date_of_joining}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </div>
        <button className="close-modal" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ViewModal;
