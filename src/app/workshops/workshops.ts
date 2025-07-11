import { Injectable } from '@angular/core';
import IWorkshop from './models/IWorkshop';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {
  // apiUrl = `https://workshops-server.onrender.com`;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  doSomething() {
    console.log('Workshops service is doing something!');
  }

  getWorkshops(page: number = 1) {
    return this.http.get<IWorkshop[]>(`${this.apiUrl}/workshops`, {
      params: {
        _page: page,
      },
    });
  }

  getWorkshopById(workshopId: number) {
    return this.http.get<IWorkshop>(`${this.apiUrl}/workshops/${workshopId}`);
  }
}
