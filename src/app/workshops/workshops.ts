import { Injectable } from '@angular/core';
import IWorkshop from './models/IWorkshop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {
  apiUrl = `https://workshops-server.onrender.com`;

  constructor(private http: HttpClient) {}

  doSomething() {
    console.log('Workshops service is doing something!');
  }

  getWorkshops(page: number = 1, category: string = '') {
    const params: { _page: number; category?: string } = {
      _page: page,
    };

    if (category !== '') {
      params.category = category;
    }

    return this.http.get<IWorkshop[]>(`${this.apiUrl}/workshops`, {
      // params: params,
      params,
    });
  }

  getWorkshopById(workshopId: number) {
    return this.http.get<IWorkshop>(`${this.apiUrl}/workshops/${workshopId}`);
  }
}
