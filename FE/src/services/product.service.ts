import http from "../http-common";
import { IProductData } from "../types/service.type";

class ProductService {
    getAll() {
        return http.get("/products");
    }

    get(id: number) {
        return http.get(`/products/${id}`);
    }

    create(data: IProductData) {
        return http.post("/products", data);
    }

    update(id: number, data: IProductData) {
        return http.put(`/products/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`/products/${id}`);
    }

    deleteAll() {
        return http.delete(`/products`);
    }

    findByTitle(title: string) {
        return http.get(`/products?title=${title}`);
    }
}

export default new ProductService();