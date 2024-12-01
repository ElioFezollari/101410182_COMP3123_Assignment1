import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import getEmployees from '../services/employees'
import ViewModal from './ViewModal'; 

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getEmployees().then((result) => setEmployees(result));
  }, []);

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange"
  });


  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
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
                <th>Update</th>
                <th>Delete</th>
                <th>View</th>
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
                  <button className="view table-btn" onClick={() => openModal(row.original)}>
                    View
                  </button>
                </td>
                <td>
                <Link className="update table-btn" to={`/update/${row.original._id}`}>
                    Update
                  </Link>
                </td>
                <td>
                <Link className="delete table-btn" to={`/delete/${row.original._id}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <ViewModal 
          employee={selectedEmployee} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Table;
