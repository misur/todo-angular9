import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarComponent]
})
export class AppComponent implements OnInit {
  title: 'test';

  constructor(private router: Router) {
  }


  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}

