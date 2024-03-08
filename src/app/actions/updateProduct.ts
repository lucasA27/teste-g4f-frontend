'use server'

import { revalidateTag } from "next/cache";

export const handleSubmitUpdate = async (e: FormData, id: number) => {
    
    const name = e.get('name');
    const price = e.get('price');
    const description = e.get('description');
    const status = e.get('status')
    const body = JSON.stringify({
        name,
        price: Number(price),
        description,
        status
    })
    
    const response = await fetch(`${process.env.API_URL}/products/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
            
      revalidateTag('list-products') 
}