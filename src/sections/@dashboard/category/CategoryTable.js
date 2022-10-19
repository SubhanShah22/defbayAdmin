import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Card, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import Iconify from "../../../components/Iconify";


export default function CategoryTable() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    useEffect(() => {
        CategoryData()
    }, [])

    const CategoryData = async () => {
        const response = await axios.get(`Admin/categoryData`);
        const { data } = response.data;
        setData(data);
    }

    const Delete = async (value) => {
        const response = await axios.delete(`Admin/categoryData?id=${value}`)
        CategoryData();
    }

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
                customBodyRender: (value) => (
                    <Stack direction="row" spacing={2}>
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => (
                            navigate(`/dashboard/categoryedit/${value}`)
                        )}
                      >
                        <Iconify icon="ant-design:edit-filled" />
                      </IconButton>
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
