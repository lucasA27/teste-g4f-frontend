'use client';
import React, { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination, Product } from '@/app/types/findProducts';
import { handleSubmit } from '@/app/actions/createProduct';
import { Typography, Card, CardContent, TextField, Button, Grid, Container, Paper } from '@mui/material';
import { handleDelete } from '@/app/actions/deleteProduct';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormStatus } from "react-dom"

type Props = {
  products: Product[];
  pagination: Pagination;
};

export const ListAllProducts = ({ products, pagination }: Props) => {
  const { pending } = useFormStatus()
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);
  
  const handlePaginationChange = useCallback((newPage: number) => {
    const queryString = createQueryString('page', newPage.toString());
    router.push(`${pathname}?${queryString}`);
  }, [createQueryString, pathname, router]);
  
    
  return (
    <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Produtos
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card variant="outlined" onClick={() => router.push(`/products/${product.id}`)} sx={{ cursor: 'pointer' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography color="textSecondary">
                  R${product.price}
                </Typography>
                <DeleteIcon 
                  onClick={(e) => { 
                    e.stopPropagation();
                    handleDelete(product.id)} }
                  sx={{ cursor: 'pointer', float: 'right' }}
                />
            </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Paper component="form" action={handleSubmit} sx={{ mt: 4, p: 2, alignItems: 'center' }} variant="outlined" >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Nome do produto" name="name" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Preço do produto" name="price" type="number" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Descrição do produto" name="description" variant="outlined" />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="outlined" color="primary" disabled={pending}>
              {pending ? 'Carregando...' : "Criar produto"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="body1" component="p" sx={{ mt: 4 }}>
        Página {pagination.currentPage} de {pagination.totalPages}
      </Typography>
      <Button onClick={() => handlePaginationChange(pagination.currentPage - 1)} disabled={pagination.currentPage <= 1}>Anterior</Button>
      <Button  onClick={() => handlePaginationChange(pagination.currentPage + 1)} disabled={pagination.currentPage >= pagination.totalPages}>Próximo</Button>
    </Container>
  );
};
