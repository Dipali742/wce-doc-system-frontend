export const MY_DOCUMENTS_GRID_COLUMNS = [
  {
    headerName: 'Document type',
    field: 'document_type.name',
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
