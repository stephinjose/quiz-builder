import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private apiService: ApiService){}

  callApi(){
    return this.apiService.get('/api/test/test').subscribe(res => console.log(res));
  }
}
