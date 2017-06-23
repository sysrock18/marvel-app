import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isCollapsed = false;
  public page = 1;
  public loading = false;
  public limit = 10;
  public params = [];
  public characters = [];
  public size = 0;
  public search_value = "";

  constructor(
  	public apiService: ApiService,
  	public router: Router,
  	public route: ActivatedRoute
  ) { }

  ngOnInit() {
  	this.route
      .queryParams
      .subscribe(params => {
        this.search_value = params.search_value;

        console.log(params);

        this.getCharacters();
      });
  }

  getCharacters() {
    this.loading = true;
 
    this.params = [
      {key:'limit', value:this.limit},
      {key:'offset', value:this.limit * (this.page - 1)}
    ];

    if(this.search_value) {
      this.params.push(
        {key:'name', value:this.search_value }
      );
    }

    this.apiService.get('characters', this.params)
    .subscribe(resp => {
      this.loading = false;
      this.characters = resp.data.results;
      this.size = resp.data.total;
    });
  }

  goToCharacterComics(character) {
    this.router.navigate(['/comics'], { queryParams: { 
        id: character.id,
        name: character.name,
        imagePath: character.thumbnail.path,
        imageExtension: character.thumbnail.extension
      }
    });
  }

}
