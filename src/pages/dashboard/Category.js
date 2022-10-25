import { Link as RouterLink } from 'react-router-dom';
import {useState,useEffect}  from 'react';
// @mui

import { Button, Container , Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import LoadingScreen from '../../components/LoadingScreen';
import BaseUrl from '../../contexts/BaseUrl';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CategoryTable from '../../sections/@dashboard/category/CategoryTable';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';


// sections


// ----------------------------------------------------------------------

export default function Category() {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const [categoryname, setCategoryname] = useState("");
  const { enqueueSnackbar } = useSnackbar();
 
 

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    CategoryData()
   
  }, [])
  

  // get category data 
  const CategoryData = async () => {
    setLoader(true)

    const response = await axios.get(`${BaseUrl.baseUrl}Admin/categoryData`);
    setLoader(false)

    const { data } = response.data;
    setData(data);
  }
  

  // add category data 

  const AddData = async () => {
    try{
      setLoader(true)
      const formData = new FormData();
      formData.append("name", categoryname)
      const response = await axios.post(`${BaseUrl.baseUrl}Admin/categoryData`, formData);
      setLoader(false)
      setCategoryname("")

      handleClose()
      enqueueSnackbar(response.data.message);
  
      CategoryData()

    }
    catch (error){
      enqueueSnackbar("something went wrong" , { variant: 'error' });

    }
  

}


const EditData = async (id,editcategory) => {

  try{
    setLoader(true)

    const formData = new FormData();
    formData.append("id", id)
    formData.append("name", editcategory)
    const response = await axios.put(`${BaseUrl.baseUrl}Admin/categoryData`, formData);
    setLoader(false)

    handleClose()
    CategoryData()
    enqueueSnackbar(response.data.message);
  


  }
  catch (error){
    enqueueSnackbar(error , { variant: 'error' });


  }
 

}


const Delete = async (id) => {

  try{
    setLoader(true)

    console.log("delete",id)
    const response = await axios.delete(`${BaseUrl.baseUrl}Admin/categoryData?id=${id}`)
    setLoader(false)

    console.log("respponse",response.data.message)
    enqueueSnackbar(response.data.message);
    CategoryData()

  }

  catch(error){
    enqueueSnackbar(error , { variant: 'error' });



  }
 


   


  
 
  


}


  return (

    <>
   {loader ?  <LoadingScreen/>:null}
  
    <Page title="Category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Category List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category' },
          ]}
          action={
            <Button
              variant="contained"
              starIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleClickOpen}
              // to={PATH_DASHBOARD.general.categoryadd}
              // component={RouterLink}
            >
            Add Category 
            </Button>
        }
        />

        <CategoryTable props={data} edit={EditData} delete={Delete} />
      </Container>
    </Page>

    {/* ADD MODAL  */}

    <Dialog open={open} onClose={handleClose}    PaperProps={{
    sx: {
      width: "100%",
      maxWidth: "720px!important",
    },
  }}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e)=>setCategoryname(e.target.value)}
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={categoryname}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>AddData()}>Add</Button>
        </DialogActions>
      </Dialog>
    </>


// Modal add 





  );
}
