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
import RecruiterTable from '../../sections/@dashboard/recruiter/RecruiterTable';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';


// ----------------------------------------------------------------------

export default function Recruiter() {
  const { themeStretch } = useSettings();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();




  useEffect(() => {
    RecruiterData()
   
  }, [])
  

  // get category data 
  const RecruiterData = async () => {
    setLoader(true)
    const response = await axios.get(`${BaseUrl.baseUrl}recruiter/registration`);
    setLoader(false)
    const { data } = response.data;
    setData(data);
  }


   // get applicant data 
   const RecruiterStatus = async (value) => {
    setLoader(true)
    const response = await axios.get(`${BaseUrl.baseUrl}/Admin/accountActivation?id=${value}`);
    setLoader(false)
    enqueueSnackbar(response.data.message);
    RecruiterData()
    
    console.log("status data",response.data.message)
   
  }

  return (
    <>
    
    {loader ?  <LoadingScreen/>:null}
  
    <Page title="Recruiter">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Recruiter List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Recruiter' },
          ]}
        />

        <RecruiterTable props={data} status={RecruiterStatus} />
      </Container>
    </Page>

    </>
  );
}
