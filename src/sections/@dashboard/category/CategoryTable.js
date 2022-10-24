import React, {  useState } from "react";
import MUIDataTable from "mui-datatables";
import { Card, IconButton, Stack ,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BaseUrl from "../../../contexts/BaseUrl";
import Iconify from "../../../components/Iconify";
import axios from '../../../utils/axios';



export default function CategoryTable(props) {
   

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editcategory, setEditcategory] = useState("");
    const [id, setId] = useState("");
    // console.log("props",props.edit)



  
    const tabledata = props.props
    

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    

      const NewFunc = ()=>{
        props.edit(id,editcategory)
        handleClose()


      }

      const DeleteFunc = (value)=>{
        props.delete(value)
       
      


      }

     
  
    
  
 

    // const Delete = async (value) => {
    //     const response = await axios.delete(`Admin/categoryData?id=${value}`)
      
    // }

   


    const columns = [
        {
            name: "name",
            label: "Category Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: true,
                customBodyRender: (value,rowData) => (
                    <Stack direction="row" spacing={2}>
                      <IconButton
                        variant="contained"
                        color="primary"
                          
                        
                        onClick={() => {handleClickOpen(); setId(value);setEditcategory(rowData.rowData[0])} }
                            // navigate(`/dashboard/categoryedit/${value}`)
                      >
                        <Iconify icon="ant-design:edit-filled" />
                      </IconButton>
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() =>DeleteFunc(value)}
                        >
                        <Iconify icon="ant-design:delete-filled" />
                    </IconButton>
                    </Stack>
                )
            }
        },
    ];

    const options = {
        filterType: "checkbox",        
      };
    return (
        <>
        <Card>
            <MUIDataTable
                title={""}
                data={tabledata}
                columns={columns}
                options={{
                    selectableRows: false // <===== will turn off checkboxes in rows
                }}
            />
        </Card>


        {/* Edit modal  */}


        <Dialog open={open} onClose={handleClose}    PaperProps={{
    sx: {
      width: "100%",
      maxWidth: "720px!important",
    },
  }}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e)=>setEditcategory(e.target.value)}
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={editcategory}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>NewFunc()} >Update</Button>
        </DialogActions>
      </Dialog>

        </>



 
    );
}
