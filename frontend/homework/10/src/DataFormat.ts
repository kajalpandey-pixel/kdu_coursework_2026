
export interface Product {
    id: number;
    name: string;
   
    description: string;
    tag  : string;
   
}   


export interface ProductResponse{
    products: Product[];

}



