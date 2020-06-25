import {Component, OnInit} from '@angular/core';
import {WeatherService} from './services/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './weather.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {

  displayedColumns: string[] = [ 'date', 'weather', 'days'];
  weatherList: { city: string; temperature: number }[];
  pgWeather: any;


  constructor(private  weatherService: WeatherService) {

  }

  ngOnInit() {
    this.weatherService.getWeather().then((weather) => this.weatherList = weather);
    this.weatherService.getRealWeatherPodgorica().subscribe(data => this.pgWeather = data);
  }
}
