import { ListOneProduct } from "@/Templates/Products/ListOneProducts";

type Props = {
    params: {id: number}
}

export default async function FindProductsById(props: Props) {
    const res = await fetch(`${process.env.API_URL}/products/${props.params.id}`, {cache: 'no-store', next: {tags: ['list-products']},});

    if (res.status === 200) {
        const data = await res.json();
        
        return <ListOneProduct 
        id={data.id} 
        name={data.name} 
        description={data.description}
        price={data.price} 
        status={data.status} />;
      } else {
        return <p>Nenhum produto encontrado.</p>;
      }
}
