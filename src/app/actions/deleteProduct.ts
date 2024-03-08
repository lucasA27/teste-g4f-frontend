'use server'

import { revalidateTag } from "next/cache";

export const handleDelete = async (productId: number) => {
    
    const response = await fetch(`${process.env.API_URL}/products/${productId}`, {
        method: 'DELETE', 
        headers: {
          "Content-Type": "application/json",
        },
      });

      revalidateTag('list-products') 
}