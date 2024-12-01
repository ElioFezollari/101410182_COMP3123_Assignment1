import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import getEmployees from '../services/employees'
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
    const [employees, setEmployees] = useState()

    useEffect(() => {
        getEmployees().then((result) => setEmployees(result))
    }, [])

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    console.log(table.getHeaderGroups())

    return (
        <div>
            {employees && (
                <div className='emp-div'>{table.getHeaderGroups().map((headerGroup) => {
                    return (
                        <div className='tr' key={headerGroup.id}>{headerGroup.headers.map((header) => {
                            return (
                                <th key={header.id}>
                                    {header.column.columnDef.header}
                                    <div className='resizer'>

                                    </div>
                                </th>)
                        })}</div>
                    )
                })}
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }

                </div>
            )}
        </div>
    )
}

export default Table