import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  public isCollapsed = false;
  public page = 1;
  public loading = false;
  public loadingFav = false;
  public limit = 10;
  public params = [];
  public characters = [];
  public size = 0;
  public search_value = "";
  public favourites = [];
  public resultMsg = "";

  constructor(
  	public apiService: ApiService,
  	public router: Router,
  	public route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  	this.favourites = JSON.parse(localStorage.getItem('favourites'));

  	this.route
      .queryParams
      .subscribe(params => {
        this.search_value = params.search_value;

        this.getCharacters();
      });
  }

  ngAfterViewChecked() {
    document.getElementById('favourites-id').style.height = '100vh';
    document.getElementById('favourites-id').style.height = document.getElementById('characters-id').offsetHeight.toString()+'px';
	}

  getCharacters() {
    this.resultMsg = "";
    this.loading = true;
 
    this.params = [
      {key:'limit', value:this.limit},
      {key:'offset', value:this.limit * (this.page - 1)}
    ];

    if(this.search_value) {
      this.params.push(
        {key:'nameStartsWith', value:this.search_value }
      );
    }

    this.apiService.get('characters', this.params)
    .subscribe(
      resp => {
        this.loading = false;
        this.characters = resp.data.results;
        this.size = resp.data.total;

        if(this.size < 1) {
          this.resultMsg = "No results...";
        }
      },
      error => {
        this.resultMsg = "Comunication error, try again...";
      }
    );
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

  delete(id) {
  	var index = this.favourites.findIndex(x=>x.id===id);
 
  	if(index >= 0) {
      this.favourites.splice(index, 1);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
   	}

  }

  getRandomComics() {
    this.loadingFav = true;

    let comics = [];
    for(var i = 0; i < this.characters.length; i++) {
      comics = comics.concat(this.characters[i].comics.items);
    }
    comics = comics.sort( function() { return 0.5 - Math.random() } ).splice(0,3);
    
    for(var i = 0; i < comics.length; i++) {
      let id = comics[i].resourceURI.split("/");
      id = id[id.length-1];
      var index = this.favourites.findIndex(x=>x.id===id);
      if(index < 0) {
        this.apiService.get('comics/'+id, [])
        .subscribe(resp => {
          this.loadingFav = false;

          let comic = resp.data.results[0];
          let favComic = {
            id: comic.id,
            title: comic.title,
            imgPath: comic.thumbnail.path,
            imgExtension: comic.thumbnail.extension
          };

          if(localStorage.getItem('favourites')) {
            let storedFavourites = JSON.parse(localStorage.getItem('favourites'));
            storedFavourites.push(
              favComic
            );
            localStorage.setItem('favourites', JSON.stringify(storedFavourites));
          } else {
            let favourites = JSON.stringify([
              favComic
            ]);
            localStorage.setItem('favourites', favourites);
          }

          this.favourites = JSON.parse(localStorage.getItem('favourites'));
        });
      }
    }
  }

  openDetail(content) {
    this.modalService.open(content);
  }

}
