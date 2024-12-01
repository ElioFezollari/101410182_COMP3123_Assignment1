import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import getEmployees from '../services/employees';
import ViewModal from './ViewModal'; 
import DeleteModal from './DeleteModal'; 

let columns = [
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "date_of_joining",
    header: "Date Joined",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: (props) => <p>{props.getValue()}</p>
  },
]

const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  
  useEffect(() => {
    getEmployees().then((result) => setEmployees(result));
  }, []);

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange"
  });

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };


  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
        <h1 className='list-of-emp'>List Of Employees</h1>
        <div className='add-emp'>
        <Link to='/addEmployee'>Add Employee</Link>
        </div>
      {employees && (
        <table className='emp-div'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.column.columnDef.header}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                    />
                  </th>
                ))}
                <th>View</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <button className="view table-btn" onClick={() => openViewModal(row.original)}>
                    View
                  </button>
                </td>
                <td>
                  <Link className="update table-btn" to={`/update/${row.original._id}`}>
                    Update
                  </Link>
                </td>
                <td>
                  <button className="delete table-btn" onClick={() => openDeleteModal(row.original)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isViewModalOpen && (
        <ViewModal 
          employee={selectedEmployee} 
          onClose={closeViewModal} 
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal 
          employee={selectedEmployee} 
          onClose={closeDeleteModal} 
        />
      )}
    </div>
  );
};

export default Table;
