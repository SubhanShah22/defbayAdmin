import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, Card, IconButton, Stack } from '@mui/material';
import axios from '../../../utils/axios';
import Iconify from "../../../components/Iconify";


export default function RecruiterTable(props) {
    const tabledata = props.props

   

   

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
            label: "Contact",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: true,
                sort: true,
            }
        },

     
      
      
        
       
        {
            name: "status",
            label: "status",
            options: {
                customBodyRender: (value, row) => {
                    return <Button variant="contained">
                        {
                            value === 'true' ? "Deactivate" : "Activate"
                        }
                    </Button>
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
