import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    return this.http.get(
      'http://api.weatherapi.com/v1/current.json?key=86ed1e2e3fa8463dbf6144335231212&q=' + location + '&aqi=yes' + '&lang=fr'
    );
  }

}
