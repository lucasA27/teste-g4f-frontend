'use client'

import { handleSubmitUpdate } from "@/app/actions/updateProduct";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
import React from "react";

type Props = {
    id: number;
    name: string;
    description: string;
    price: number;
    status: 'IN_STOCK' | 'OUT_OF_STOCK';
    createdAt?: Date;
    updatedAt?: Date;
}

export const UpdateProduct = (props: Props) => {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await handleSubmitUpdate(formData, props.id)
        router.push(`/products`)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 2, maxWidth: 600 }} variant="outlined">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth 
                            label="Nome do produto" 
                            name="name" 
                            variant="outlined" 
                            defaultValue={props.name} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth 
                            label="Preço do produto" 
                            name="price" 
                            type="number" 
                            variant="outlined" 
                            defaultValue={props.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth 
                            label="Descrição do produto" 
                            name="description" 
                            variant="outlined" 
                            defaultValue={props.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="status-label">Status do produto</InputLabel>
                            <Select
                                labelId="status-label"
                                defaultValue={props.status}
                                label="Status do produto"
                                name="status"
                            >
                                <MenuItem value="IN_STOCK">Em Estoque</MenuItem>
                                <MenuItem value="OUT_OF_STOCK">Fora de Estoque</MenuItem>
                            </Select>
                        </FormControl>          
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="outlined" color="primary"  >
                            Editar produto
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
