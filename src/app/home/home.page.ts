import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp :any
  todayDate = new Date()
  cityName = ""
  weatherIcon :any
  weatherDetails:any
  name=""
  loading = true
  user:any

  constructor(public httpClient:HttpClient, public authService:AuthenticationService, public route:Router) {
    this.user = authService.getProfile()
  }

  async logout(){
    this.authService.singOut().then(()=>{
      this.route.navigate(['/landing'])
    }).catch((error)=>{
      console.log(error);
    })
  }

  loadData(){
    this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe((results: any) =>{
      console.log(results);
      this.weatherTemp = results ['main']
      this.name = results ['name']
      console.log(this.weatherTemp);
      this.weatherDetails = results['weather'][0]
      console.log(this.weatherDetails);
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
      this.loading = false
    })

  }

}
