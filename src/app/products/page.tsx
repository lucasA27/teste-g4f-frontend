import React from 'react';
import { ListAllProducts } from '@/Templates/Products/ListAllProducts';
import { redirect } from 'next/navigation';

interface props {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Products(props: props) {
    const page = props.searchParams.page ? Number(props.searchParams.page) : 1

    const res = await fetch(`${process.env.API_URL}/products?page=${page}`, {cache: 'no-store', next: {tags: ['list-products']}, });
    
  if (res.status === 200) {
    const data = await res.json();
    
    return <ListAllProducts products={data.items} pagination={data.meta} />;
  } else {
    return <p>Nenhum produto encontrado.</p>;
  }
}
