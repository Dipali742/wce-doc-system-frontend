export const STUDENT_GRID_COLUMNS = [
    {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params: any) => {
            if(params.data) {
                return "<a id='edit_action'>Edit</a> <a id='delete_action'>Delete</a>";
            }
            return "";       
        },
        sortable: true,
        filter: true
    },
    {
        headerName: "PRN",
        field: "prn",
        sortable: true,
        filter: true
    },
    {
        headerName: "First Name",
        field: "fname",
        sortable: true,
        filter: true
    },
    {
        headerName: "Last Name",
        field: "lname",
        sortable: true,
        filter: true
    },
    {
        headerName: "E-Mail",
        field: "email",
        sortable: true,
        filter: true
    },
    {
        headerName: "Phone Number",
        field: "phone",
        sortable: true,
        filter: true
    },
    {
        headerName: "Course",
        field: "course",
        sortable: true,
        filter: true
    },
    {
        headerName: "Branch",
        field: "branch",
        sortable: true,
        filter: true
    },
    {
        headerName: "Year",
        field: "year",
        sortable: true,
        filter: true
    },
    {
        headerName: "documents issued",
        field: "documents_issued",
        sortable: true,
        filter: true
    }
]