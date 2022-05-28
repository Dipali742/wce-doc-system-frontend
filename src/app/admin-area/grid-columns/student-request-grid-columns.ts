export const STUDENT_REQUEST_GRID_COLUMNS = [
  {
    headerName: 'Actions',
    field: 'actions',
    cellRenderer: (params: any) => {
      if (params.data) {
        if (params.data.status === 'pending')
          return " <a id='approve_action'>Approve</a> <a id='decline_action'>Decline</a>";
        else return params.data.status;
      }
      return '';
    },
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Student PRN',
    field: 'user.prn',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Document Type',
    field: 'document_type.name',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Status',
    field: 'status',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Student comments',
    field: 'comments',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Admin comments',
    field: 'admin_comments',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Attachments',
    field: 'files',
    cellRenderer: (params: any) => {
      if (params.data.files.length != 0) {
        return " <a id='view_action'>View</a>";
      }
      return '<p>None</p>';
    },
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Document',
    field: 'admin_files',
    cellRenderer: (params: any) => {
      if (params.data.admin_files.length != 0) {
        console.log(params.data.admin_files[0][0].filePath);
        const url =
          'https://wce-tracker-api.herokuapp.com/' +
          params.data.admin_files[0][0].filePath;
        // let xyz =
        //   'https://wce-tracker-api.herokuapp.com/' +
        //   params.data.admin_files[0][0].filePath;
        // return '<a download href=this.xyz>Download</a>';
        // return " <a id='download_action'>Download</a>";
        return "<a href='" + url + "' download target='_blank'>Download</a>";
      }
      return '<p>Pending approval</p>';
    },
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Requested at',
    field: 'requested_at',
    sortable: true,
    filter: true,
  },
];
