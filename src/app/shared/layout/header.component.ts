import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public search_value = "";

  public searchForm = this.fb.group({
    character: [this.search_value, Validators.required]
  });

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
      	if(params.search_value) {
          this.search_value = params.search_value;
      	}
      });
  }

  goToCharacterComics() {
    this.router.navigate(['/'], { queryParams: { 
        search_value: this.searchForm.value.character
      }
    });
  }

}