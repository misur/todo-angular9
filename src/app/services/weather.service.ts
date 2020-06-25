import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast?id=3189077&units=metric&APPID=e407025261332276e681a1d16d2b08c5';

  constructor(private http: HttpClient) { }

  getWeather() {
    return Promise.resolve([{city: 'Podgorica', temperature: 40, days: ['MON', 'THU']}]);
  }

  getRealWeatherPodgorica() {
    return this.http.get(this.url);
  }

}
