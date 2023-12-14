import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { Weather2Component } from './view/weather2/weather2.component';

export const allAppRoutes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'weather2', component: Weather2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(allAppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
