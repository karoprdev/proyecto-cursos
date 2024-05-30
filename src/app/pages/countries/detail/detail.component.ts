import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  country: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.country = navigation?.extras?.state;
  }

  ngOnInit(): void {
    if(this.country === undefined) {
      this.router.navigate(['list'])
    }
  }

  onGoBack(): void {
    this.router.navigate(['/list'] );
  }

}
