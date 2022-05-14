export const STUDENT_REQUEST_GRID_COLUMNS = [
    {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params: any) => {
            if(params.data) {
                if(params.data.status === "pending")
                    return "<a id='decline_action'>Decline</a> <a id='approve_action'>Approve</a>";
                else
                 return params.data.status; 
            }
            return "";       
        },
        sortable: true,
        filter: true
    },
    {
        headerName: "Student PRN",
        field: "user.prn",
        sortable: true,
        filter: true
    },
    {
        headerName: "Document Type",
        field: "document_type.name",
        sortable: true,
        filter: true
    },
    {
        headerName: "Comments",
        field: "comments",
        sortable: true,
        filter: true
    },
    {
        headerName: "Attachments",
        field: "files",
        cellRenderer: (params: any) => {
            if(params.data) {
                // console.log("params",params);
                // console.log(params.data.files.fileName);
                // let result = "";
                // params.data.files.forEach((element: any) => {
                //     console.log("me" ,element);
                //     result+="<a id='files'>" + element.fileName +"</a>"
                // });
                // return result;
                return "<a id='view_attachments'>View</a>"
            }
            return "";       
        },
        sortable: true,
        filter: true
    },
    {
        headerName: "Requested at",
        field: "requested_at",
        sortable: true,
        filter: true
    }
]