import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule, allAppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApixuService } from './apixu.service';
import { Weather2Component } from './view/weather2/weather2.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    Weather2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(allAppRoutes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApixuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
