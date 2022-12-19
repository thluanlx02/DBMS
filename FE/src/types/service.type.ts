
export interface ISupplierData {
  id?: any | null,
  name: string,
  city: string,
}

export interface ISupplierDataTable {
  key: number,
  name: string,
  city: string,
}

export interface IProductData {
  id?: any | null,
  name: string,
  price: number,
  supplierId: number,
}

export interface IProductDataTable {
  key: number,
  name: string,
  price: number,
  supplierId: number,
}

export interface ICustomerData {
  id?: any | null,
  name: string,
  gender: string,
  phone: string,
}

export interface ICustomerDataTable {
  key: number,
  name: string,
  gender: string,
  phone: string,
}

