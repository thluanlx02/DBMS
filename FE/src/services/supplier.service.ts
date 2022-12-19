import http from "../http-common";
import {ISupplierData} from "../types/service.type"

class SupplierDataService {
  getAll() {
    return http.get<Array<ISupplierData>>("/suppliers");
  }

  get(id: string) {
    return http.get<ISupplierData>(`/suppliers/${id}`);
  }

  create(data: ISupplierData) {
    return http.post<ISupplierData>("/suppliers", data);
  }

  update(data: ISupplierData, id: any) {
    return http.put<any>(`/suppliers/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/suppliers/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/suppliers`);
  }

}

export default new SupplierDataService();