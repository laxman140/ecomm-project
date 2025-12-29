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
    image: string
}