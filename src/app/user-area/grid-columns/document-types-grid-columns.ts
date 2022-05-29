export const DOCUMENT_TYPE_GRID_COLUMNS_U = [
  {
    headerName: 'Actions',
    field: 'actions',
    cellRenderer: (params: any) => {
      if (params.data) {
        return "<a id='edit_action' style='color:MediumSeaGreen;'>Request</a>";
      }
      return '';
    },
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Document Name',
    field: 'name',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Approval from',
    field: 'sendTo',
    sortable: true,
    filter: true,
  },
  {
    headerName: 'Required documents',
    field: 'requiredDoc',
    sortable: true,
    filter: true,
  },
];
