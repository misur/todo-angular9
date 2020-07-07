import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WeatherService} from '../services/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: '../weather/weather.component.html',
  styleUrls: ['../app.component.css'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {

  displayedColumns: string[] = ['date', 'weather', 'days'];
  weatherList: { city: string; temperature: number }[];
  pgWeather: any;
  cities: any;
  form = new FormGroup({
    selectedCity: new FormControl()
  });
  customList = [{name: 'PG'}, {name: 'NK'}, {name: 'BD'}];


  constructor(private  weatherService: WeatherService) {

  }

  ngOnInit() {
    this.weatherService.getWeather().then((weather) => this.weatherList = weather);
    this.weatherService.getRealWeatherPodgorica().subscribe(data => this.pgWeather = data);
    this.weatherService.getCities().subscribe((data: any []) => {
      console.log(data);
      this.cities = data.filter(item => item.country === 'ME');
      this.form.get('selectedCity').patchValue(3189077);
      console.log(this.cities);
    });
    this.form.get('selectedCity').valueChanges.subscribe((value) => {
      console.log(value);
      this.weatherService.getRealWeatherByID(value).subscribe(data => this.pgWeather = data);
    });
  }


}
