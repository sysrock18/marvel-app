import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/services';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  public characterImagePath = "";
  public characterId = "";
  public characterImageExtension = "";
  public characterName = "";
  public loading = false;
  public limit = 10;
  public params = [];
  public comics = [];
  public size = 0;
  public page = 1;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.characterId = params.id;
        this.characterName = params.name;
        this.characterImagePath = params.imagePath;
        this.characterImageExtension = params.imageExtension;

        this.getCharacterComics();
      });
  }

  getCharacterComics() {
    this.loading = true;
 
    this.params = [
    	{key:'limit', value:this.limit},
    	{key:'offset', value:this.limit * (this.page - 1)}
    ];

    this.apiService.get('characters/'+this.characterId+'/comics', this.params)
    .subscribe(resp => {
      this.loading = false;
      this.comics = resp.data.results;
      this.size = resp.data.total;
    });
  }

}
