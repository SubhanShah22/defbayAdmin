import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, Card, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import Iconify from "../../../components/Iconify";


export default function ApplicantTable(props) {
    const tabledata = props.props

    const navigate = useNavigate();

    const Change = (value)=>{
        props.status(value)
       
      


      }

   

    const columns = [
        {
            name: "fname",
            label: "First Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "lname",
            label: "Last Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "contact",
            label: "Contact #",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: (value, rowData) => {
                    console.log("value status",value)
                   

                    return <IconButton
                    variant="contained"
                    color="primary"
                   
                   
                  />
                
                   
                  
                   
                //   </IconButton>
                }
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                customBodyRender: (value, rowData) => {
                    console.log("value",rowData.rowData,value)
                   

                    return <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() =>Change(value)}
                   
                  >
                     {rowData.rowData[4] === true ?  <Iconify icon="ant-design:check-outlined" />:
                       <Iconify icon="fluent-mdl2:cancel"/> }
                   
                  
                   
                  </IconButton>
                }
            }
        },
        // {
        //     name: "id",
        //     label: "Action",
        //     options: {
        //         filter: true,
        //         customBodyRender: (value) => (
        //             <Stack direction="row" spacing={2}>
        //               <IconButton
        //                 variant="contained"
        //                 color="primary"
        //                 onClick={() => (
        //                     navigate(`/dashboard/Applicantedit/${value}`)
        //                 )}
        //               >
        //                 <Iconify icon="ant-design:edit-filled" />
        //               </IconButton>
        //               <IconButton
        //                 variant="contained"
        //                 color="primary"
        //                 // onClick={() => (Delete(value))}
        //                 >
        //                 <Iconify icon="ant-design:delete-filled" />
        //             </IconButton>
        //             </Stack>
        //         )
        //     }
        // },
    ];

    const options = {
        filterType: "checkbox",        
      };
    return (
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
 
    );
}
