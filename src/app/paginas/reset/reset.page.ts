import { AuthenticationService } from 'src/app/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  email:any
  constructor(public route:Router,public authService:AuthenticationService) { }

  ngOnInit() {
  }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>{
      console.log('Link para alterar enviado')
      this.route.navigate(['/login'])
    }
      
    ).catch((error) =>{
      console.log(error);
    })
  }


}
