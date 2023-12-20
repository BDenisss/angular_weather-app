import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(location: string) {
    return this.http.get(
      'http://api.weatherapi.com/v1/forecast.json?key=86ed1e2e3fa8463dbf6144335231212&q=' + location + '&days=10' + '&lang=fr'
    );
  }

  getWeatherAstro(location: string) {
    return this.http.get(
      'http://api.weatherapi.com/v1/astronomy.json?key=86ed1e2e3fa8463dbf6144335231212&q=' + location + '&lang=fr'
    );
  }

  getWeatherForecastDaily(location: string) {
    return this.http.get(
      'http://api.weatherapi.com/v1/forecast.json?key=86ed1e2e3fa8463dbf6144335231212&q=' + location + '&days=7' + '&lang=fr'
    );
  }

}
