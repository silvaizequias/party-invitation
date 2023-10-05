import { GridColDef } from '@mui/x-data-grid'

export interface DataTableProps {
  data: any | undefined
  columns: GridColDef<any>[] | undefined
}
