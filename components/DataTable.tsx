/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { UpdatePeopleInfo } from '@/actions/user.actions';
import { Pepoles } from '@/types/common';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const columns: GridColDef<Pepoles>[] = [
  {field:'id', headerName:'Id',width:90},
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string', 
    width: 110,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    width: 140,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    type: 'string',
    width: 150,
    editable: true,
    renderCell: (params) => {
      const logoUrl = `https://logo.clearbit.com/${params.value.toLowerCase()}.com`; // Example using Clearbit API

      return (
        <div style={{ display: 'flex', alignItems: 'center',gap:"4px",paddingLeft:"4px",paddingRight:"4px" }}>
          <img
            src={logoUrl}
            alt={params.value}
            style={{ width: 30, height: 30, marginRight: 8 ,borderRadius:"50%"}}
            onError={(e) => {
              e.currentTarget.style.display = 'none'; // Hide the image if it fails to load
            }}
          />
          <span style={{ display: logoUrl ? 'inline' : 'block' }}>{params.value}</span>
        </div>
      );
    },
  },
  {
    field:'jobTitle',
    headerName:"Job-Title",
    type: 'string',
    width: 110,
    editable: true,
  },
  {
    field:'city',
    headerName:'City',
    type: 'string',
    width: 110,
    editable: true,
  },
];



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DataTable = ({peoples,dispPeoples}:{peoples: Pepoles[],dispPeoples:Pepoles[]}) => {
  const processUpdate = async(updatedRow: Pepoles, originalRow: Pepoles)=>{
        try {
            await UpdatePeopleInfo(updatedRow);
            return updatedRow;
        } catch (error:any) {
          console.error('Error updating row:', error);
          return originalRow;
        }
  }
  return (
    <div className='w-[max] max-w-screen-xl py-3 overflow-x-auto mx-auto'>
        <DataGrid
        rows={dispPeoples}
        columns={columns}
        processRowUpdate={processUpdate}
        pagination={true}
        pageSizeOptions={[5,10,25,50,100]}
        checkboxSelection
        disableRowSelectionOnClick
        showCellVerticalBorder={true} // Enable vertical cell borders
        showColumnVerticalBorder={true}
        className="bg-background border border-border"
        sx={{
          '& .MuiDataGrid-main': {
            color: 'hsl(var(--foreground))',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor:'hsl(var(--muted) / 0.5)',
            color: 'hsl(var(--primary))',
            borderColor: 'hsl(var(--border))',
          },
          '& .MuiDataGrid-iconButtonContainer': {
            color: 'hsl(var(--primary))',
          },
          '& .MuiTablePagination-displayedRows': {
            color: 'hsl(var(--muted-foreground))',
          },
          '& .MuiSvgIcon-root': {
            color: 'hsl(var(--muted-foreground))',
          },
          '& .MuiDataGrid-row': {
            color: 'hsl(var(--foreground))',
            '&:hover': {
              backgroundColor: 'hsl(var(--muted) / 0.5)',
            },
          },
          '& .MuiDataGrid-cell': {
            borderColor: 'hsl(var(--border))',
          },
          '& .MuiDataGrid-footerContainer': {
            color: 'hsl(var(--foreground))',
            borderColor: 'hsl(var(--border))',
          },
          '& .MuiCheckbox-root': {
            color: 'hsl(var(--muted-foreground))',
          },
          '& .MuiTablePagination-root': {
            color: 'hsl(var(--foreground))',
          },
        }}
        />
    </div>  
  )
}

export default DataTable