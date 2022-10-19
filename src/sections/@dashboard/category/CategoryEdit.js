import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../components/hook-form'
import axios from '../../../utils/axios';


export default function CategoryEdit() {

    const { id } = useParams();
    const NewUserSchema = Yup.object().shape({
        name: Yup.string(),
      });
      const defaultValues = useMemo(
        () => ({
          name:''
        }),
      );
    
      const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues
      });
    
      const {
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const Submit = async (data) => {
        const formData = new FormData();
        formData.append("id", id)
        formData.append("name", data.name)
        const response = await axios.put('Admin/categoryData', formData); 
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(Submit)} >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h3" paragraph>
                            Edit Category
                        </Typography>
                        <Card sx={{ p: 3 }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                <RHFTextField name="name" label="Category Name" />
                            </Box>
                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Edit Category
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    )
}