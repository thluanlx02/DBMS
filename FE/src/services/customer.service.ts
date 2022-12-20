import http from "../http-common";
import { ICustomerData } from "../types/service.type"

class CustormerDataService {
    getAll() {
        return http.get<Array<ICustomerData>>("/customers");
    }

    get(id: string) {
        return http.get<ICustomerData>(`/customers/${id}`);
    }

    getByPhone(phone: string) { 
        return http.get<ICustomerData>(`/customers/phone/${phone}`);
    }

    create(data: ICustomerData) {
        return http.post<ICustomerData>("/customers", data);
    }

    update(data: ICustomerData, id: any) {
        return http.put<any>(`/customers/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/customers/${id}`);
    }

    deleteAll() {
        return http.delete<any>(`/customers`);
    }

}

export default new CustormerDataService();