import axios from "axios"
import { useNavigate } from "react-router-dom"





export const columns =[
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "150px",
        center: true,
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        sortable: true,
        width: "160px",
        center: true,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "160px",
        center: true,
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "160px",
        center: true,
    },
    {
        name: "Department",
        selector: (row) => row.department,
        sortable: true,
        width: "160px",
        center: true,
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "160px",
        center: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "160px",
        center: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    }
]

export const LeaveButtons = ({Id}) => {
  const navigate = useNavigate();

    const handleView = (id) =>{
        navigate(`/admin-dashboard/leaves/${id}`)
    }

    return(
  <button
    className="px-4 py-1.5 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-700 transition"
    type="button"
    onClick={() => handleView(Id)}
  >
    View
  </button>
  )
}