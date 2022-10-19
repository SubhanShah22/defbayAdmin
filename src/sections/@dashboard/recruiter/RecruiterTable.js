import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button, Card, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import Iconify from "../../../components/Iconify";


export default function RecruiterTable() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    useEffect(() => {
        RecruiterData()
    }, [])

    const RecruiterData = async () => {
        const response = await axios.get(`recruiter/registration`);
        const { data } = response.data;
        setData(data);
    }

    const Delete = async (value) => {
        const response = await axios.delete(`Admin/RecruiterData?id=${value}`)
        RecruiterData();
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
            label: "status",
            options: {
                customBodyRender: (value, row) => {
                    return <Button variant="contained" onClick={() => { RecruiterData(row.rowData[0]) }}  >
                        {
                            value === 'true' ? "Deactivate" : "Activate"
                        }
                    </Button>
                }
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Stack direction="row" spacing={2}>
                      {/* <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => (
                            navigate(`/dashboard/Applicantedit/${value}`)
                        )}
                      >
                        <Iconify icon="ant-design:edit-filled" />
                      </IconButton> */}
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => (Delete(value))}
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
        <Card>
            <MUIDataTable
                title={""}
                data={data}
                columns={columns}
                options={{
                    selectableRows: false // <===== will turn off checkboxes in rows
                }}
            />
        </Card>
 
    );
}
