import { LoginUserComponent } from 'src/app/login-user/login-user.component';

export const MY_REQUEST_GRID_COLUMNS = [
  {
    headerName: 'Document type',
    field: 'document_type.name',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Status',
    field: 'status',
    cellRenderer: (params: any) => {
      if (params.data.status == 'rework') {
        return "<a id='rework_request' style='color:MediumSeaGreen;'>Rework</a>";
      }
      return '<p>' + params.data.status + '</p>';
    },
    sortable: true,
    filter: true,
  },
  //   approved-decline- user LoginUserComponent
  //   new request = rrework and pending
  {
    headerName: 'Required Validations',
    field: 'requiredValidations',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'My Comments',
    field: 'comments',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Admin Comments',
    field: 'admin_comments',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Attachments',
    field: 'files',
    cellRenderer: (params: any) => {
      if (
        params.data.files.length != 0 &&
        params.data.document_type.requiredDoc.length != 0
      ) {
        return "<a id='view_attachments' style='color:MediumSeaGreen;'>View</a>";
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
        const url =
          'https://wce-tracker-api.herokuapp.com/' +
          params.data.admin_files[0][0].filePath;
        return "<a href='" + url + "' download target='_blank'>Download</a>";
      }
      if (params.data.status == 'pending')
        "<a id='rework_action' style='color:MediumSeaGreen;'>Rework</a>";
      return '<p>' + params.data.status + '</p>';
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
