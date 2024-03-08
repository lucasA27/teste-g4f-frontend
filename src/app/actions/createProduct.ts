'use server'

import { CookieSharp } from "@mui/icons-material";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const handleSubmit = async (e: FormData) => {
        
    const name = e.get('name');
    const price = e.get('price');
    const description = e.get('description');
    const body = JSON.stringify({
        name,
        price: Number(price),
        description,
    })
    
    const response = await fetch(`${process.env.API_URL}/products/create`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies().get('token')}`
        },
        body,
      });
      revalidateTag('list-products') 
}