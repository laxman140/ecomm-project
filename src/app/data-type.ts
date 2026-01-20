export interface SignUp {
    name:string,
    password:string,
    email: string
}

export interface LogIn {
    email: string,
    password: string
}

export interface Product {
    id: string,
    name: string,
    price: number,
    category: string,
    description: string,
    image: string,
    quantity: undefined | number,
    productId: undefined | string
}

export interface Cart{
    id: string | undefined,
    name: string,
    price: number,
    category: string,
    description: string,
    image: string,
    quantity: undefined | number,
    userId: string,
    productId: string
}

export interface priceSummary{
    price:number,
    tax:number,
    discount: number,
    delivery:number,
    total:number
}
export interface Order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id: string | undefined
}