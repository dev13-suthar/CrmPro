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
    width: 110,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    type: 'string',
    width: 110,
    editable: true,
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



const DataTable = ({peoples}:{peoples: Pepoles[]}) => {
  const processUpdate = async(updatedRow: Pepoles, originalRow: Pepoles)=>{
        try {
            await UpdatePeopleInfo(updatedRow);
            return updatedRow
        } catch (error:any) {
          console.error('Error updating row:', error);
          return originalRow;
        }
  }
  return (
  <>
    <div className='w-[max] max-w-screen-xl h-[100vh] overflow-x-auto mx-auto'>
        <DataGrid
        rows={peoples}
        columns={columns}
        processRowUpdate={processUpdate}
        pagination={true}
        pageSizeOptions={[5,10,25,50,100]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          color:'white',
          border:"1px solid white",
          ".MuiDataGrid-columnHeaders":{
              color:'blueviolet !important'  
          },
          ".MuiDataGrid-iconButtonContainer":{
              color:"blueviolet !important",
          },
          ".MuiTablePagination-displayedRows":{
            color:"azure !important"
          },
          ".MuiSvgIcon-root":{
            color:"azure !important"
          },
          ".MuiDataGrid-row--borderBottom":{
            background:"#030712 !important" 
          },
          ".MuiDataGrid-footerContainer":{
            color:"white !important"
          }
        }}
        />
    </div>
  </>
    
  )
}

export default DataTable