'use client'

import { Card, CardContent, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {
    id: number,
    name: string,
    description: string,
    price: number,
    status: 'IN_STOCK' | 'OUT_OF_STOCK';
    createdAt?: Date;
    updatedAt?: Date,
}

export const ListOneProduct = (props: Props) => {
    const router = useRouter();

    const statusTranslation = {
        'IN_STOCK': 'Em Estoque',
        'OUT_OF_STOCK': 'Fora de Estoque',
      };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Preço: R${props.price}
                    </Typography>
                    <Typography variant="body1">
                        Status: {statusTranslation[props.status]}
                    </Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2, width: '100%' }} onClick={() => router.push('/products')}>
                        Voltar aos produtos
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ mt: 2, width: '100%' }} onClick={() => router.push(`/products/${props.id}/update`)}>
                        Editar produto
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
