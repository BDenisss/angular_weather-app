import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from '../../service/apixu.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EChartsOption } from 'echarts';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

interface GaugeData {
  value: number;
  name: string;
}

@Component({
  selector: 'app-weather2',
  templateUrl: './weather2.component.html',
  styleUrl: './weather2.component.scss',
  animations: [
    trigger('fadeUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-100px)'
      })),
      transition('void => *', [
        animate('0.7s ease-in-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition('* => void', [
        animate('0.7s ease-in-out', style({
          opacity: 0,
          transform: 'translateY(100px)'
        }))
      ])
    ]),
    trigger('fadeRight', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(-100px)'
      })),
      transition('void => *', [
        animate('0.7s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition('* => void', [
        animate('0.7s ease-in-out', style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ])
    ]),
    trigger('fadeLeft', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(100px)'
      })),
      transition('void => *', [
        animate('0.7s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ]),
      transition('* => void', [
        animate('0.7s ease-in-out', style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }))
      ])
    ]),
  ]
})
export class Weather2Component implements OnInit {

  public weatherSearchForm!: FormGroup;
  public weatherData: any;  
  private echartInstance: any;  
  public windDegree: number = 0;
  public httpStatus: number | null = null;
  currentTime: number;

  option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        // Configuration de la première jauge...
        data: [] as GaugeData[], // Spécification du type de données
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 30,
        splitNumber: 6,
        itemStyle: {
          color: '#0077b6'
        },
        progress: {
          show: true,
          width: 30
        },
  
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#ffffff'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#ffffff'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#ffffff',
          fontSize: 20
        },
        anchor: {
          show: false
        },
        title: {
          show: true,
          color: '#ffffff',
          fontWeight: 'bolder',
          opacity: 0.8,
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 60,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
      },
      {
        type: 'gauge',
        // Configuration de la deuxième jauge...
        data: [] as GaugeData[], // Spécification du type de données
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 30,
        itemStyle: {
          color: '#48cae4'
        },
        progress: {
          show: true,
          width: 8
        },
  
        title: {
          show: false
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
      }
    ]
  };


  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.currentTime = this.getCurrentTime();
  }

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  onChartInit(ec: any) {
    this.echartInstance = ec;
  }

  sendToAPIXU(formValues: any) {
    this.apixuService.getWeatherForecast(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(data)
      this.updateChart(data);
      this.cdr.detectChanges();
    });
  }

  sendToAPIXUAstro(formValues: any) {
    this.apixuService.getWeatherAstro(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(data)
      this.cdr.detectChanges();
    });
  }

  sendToAPIXUDaily(formValues: any) {
    this.apixuService.getWeatherForecastDaily(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(data)
      this.cdr.detectChanges();
    });
  }

  convertEpochToTimeAndCompareWithCurrentTime(epoch: number) {
    const date = new Date(epoch * 1000);
    const hour = date.getHours();

    if (hour === this.currentTime) {
      return true;

    } else {
      return false;
    }
  }

  convertEpochToTime(epoch: number) {
    const date = new Date(epoch * 1000);
    return date.getHours();
  }
  convertEpochToDay(epoch: number) {
    const convertedDate = new Date(epoch * 1000);
    const currentDate = new Date();
  
    // Compare l'année, le mois et le jour
    if (convertedDate.getFullYear() === currentDate.getFullYear() &&
        convertedDate.getMonth() === currentDate.getMonth() &&
        convertedDate.getDate() === currentDate.getDate()) {
      return 'Aujourd\'hui';
    }
  
    const day = convertedDate.getDay();
    switch (day) {
      case 0:
        return 'Dim.';
      case 1:
        return 'Lun.';
      case 2:
        return 'Mar.';
      case 3:
        return 'Mer.';
      case 4:
        return 'Jeu.';
      case 5:
        return 'Ven.';
      case 6:
        return 'Sam.';
      default:
        return 'N/A';
    }
  }
  

  getCurrentTime() {
    const date = new Date();
    console.log("l'heure actuelle : " + date.getHours() + "h");
    return date.getHours();
  }

  getHttpStatus(location: string) {
    this.http.get("http://api.weatherapi.com/v1/forecast.json?key=86ed1e2e3fa8463dbf6144335231212&q=" + location + "&aqi=yes&lang=fr").subscribe({
      next: (data: any) => {
        // Supposons que 'status' est une propriété valide de 'data'
        this.httpStatus = 200;
      },
      error: (error: HttpErrorResponse) => {
        this.httpStatus = error.status;
        console.log('Erreur HTTP', error);
      }
    });
  }
  

  private updateChart(data: any) {
    const currentTemp = data.current.temp_c;
    const feelsLikeTemp = data.current.feelslike_c;
    this.windDegree = data.current.wind_degree; // récupération de la valeur

    

    if (this.echartInstance) {
      this.echartInstance.setOption(this.option, true); // 'true' force le non-merge et réinitialise l'état du graphique
    }
  
    if (Array.isArray(this.option.series)) {
      this.option.series[0].data = [{ value: currentTemp, name: 'Température' }];
      this.option.series[1].data = [{ value: feelsLikeTemp, name: 'Ressentie' }];
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    }

    if (this.echartInstance) {
      this.echartInstance.clear();
      this.echartInstance.setOption(this.option);
    }
  }
}
