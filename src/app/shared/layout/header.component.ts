import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchForm = this.fb.group({
    character: ["", Validators.required]
  });

  constructor(
    public router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {

  }

  goToCharacterComics() {
    this.router.navigate(['/'], { queryParams: { 
        search_value: this.searchForm.value.character
      }
    });
  }

}