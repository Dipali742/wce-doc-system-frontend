export const MY_REQUEST_GRID_COLUMNS = [
    {
        headerName: "Document type",
        field: "document_type.name",
        sortable: true,
        filter: true
    },
    {
        headerName: "Status",
        field: "status",
        sortable: true,
        filter: true
    },
    {
        headerName: "Required Validations",
        field: "requiredValidations",
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
    },
    
]