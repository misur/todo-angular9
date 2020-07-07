import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherComponent} from './weather/weather.component';
import {ToDoComponent} from './to-do.component';


const routes: Routes = [
  {path: 'weather' , component: WeatherComponent},
  {path: '' , component: ToDoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
