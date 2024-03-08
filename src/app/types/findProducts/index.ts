export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  
  export type Pagination = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  
  export type ProductsApiResponse = {
    items: Product[];
    meta: Pagination;
  };
  