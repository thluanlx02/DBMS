import http from "../http-common";
import { IOrderData } from "../types/service.type";

class OrderService {
    getAll() {
        return http.get("/orders");
    }

    get(id: number) {
        return http.get(`/orders/${id}`);
    }

    findAllNumberProductBySupplier({startTime, endTime}: {startTime: string, endTime: string}) {
        return http.get("/orders/findAllNumberProductBySupplier", {params: {startTime, endTime}});
    }

    create(data: IOrderData) {
        return http.post("/orders", data);
    }

    update(id: number, data: IOrderData) {
        return http.put(`/orders/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`/orders/${id}`);
    }

    deleteAll() {
        return http.delete(`/orders`);
    }

    findByTitle(title: string) {
        return http.get(`/orders?title=${title}`);
    }
}

export default new OrderService();