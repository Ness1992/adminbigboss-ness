"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type CategoryColmn = {
  id: string
  name:string
  billboardLabel: string
  createdAt: string
  
}

export const columns: ColumnDef<CategoryColmn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "billboard",
    header: "Annonce",
    cell: ({row})=> row.original.billboardLabel,
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
  
]
