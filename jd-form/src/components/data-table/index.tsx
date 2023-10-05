import { useEffect, useState } from 'react'
import { DataTableProps } from './types'
import { DataGrid, ptBR } from '@mui/x-data-grid'

export default function DataTable(props: DataTableProps) {
  const { data, columns } = props
  const [rows, setRows] = useState([])

  useEffect(() => {
    const userData = async () => {
      setRows(data!)
    }
    if (data!) {
      userData()
    }
  }, [data])

  return (
    <DataGrid
      sx={{ border: 0 }}
      autoHeight
      getRowId={(row) => row?.id!}
      rows={rows!}
      columns={columns!}
      disableColumnSelector
      initialState={{
        ...data?.initialState!,
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
    />
  )
}
