import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FavouritesStorage } from '../shared/services';

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
  public favouriteSelected = {
    title: "",
    description: "",
    price: "",
    imgPath: "",
    imgExtension: ""
  };

  constructor(
  	public apiService: ApiService,
    public favStorage: FavouritesStorage,
  	public router: Router,
  	public route: ActivatedRoute,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    const favouriteComics = this.favStorage.getFavourites()
  	this.favourites = favouriteComics ? favouriteComics : []

  	this.route
      .queryParams
      .subscribe(params => {
        this.search_value = params.search_value;

        this.getCharacters();
      });
  }

  ngAfterViewChecked() {
    
	}

  getCharacters() {
    this.resultMsg = "";
    this.loading = true;
 
    this.params = [
      {key:'limit', value:this.limit},
      {key:'offset', value:this.limit * (this.page - 1)}
    ];

    if (this.search_value) {
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

        if (this.size < 1) {
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
      this.favStorage.updateFavourites(this.favourites);
   	}

  }

  /*
    This gets at least 3 random comics of the characters displayed on the current page. Later cheks if the
    comics are in the stored favourites for add or not a new user favourite comic */
  getRandomComics() {
    this.loadingFav = true;

    let comics = [];
    for(var i = 0; i < this.characters.length; i++) {
      comics = comics.concat(this.characters[i].comics.items);
    }
    comics = comics.sort( function() { return 0.5 - Math.random() } ).splice(0,3);
    
    for(var i = 0; i < comics.length; i++) {
      let uriElements = comics[i].resourceURI.split("/");
      let id = uriElements[uriElements.length-1];

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

          this.favStorage.addFavourite(favComic);

          this.favourites = this.favStorage.getFavourites();
        });
      }
    }
  }

  openDetailFavourite(content, id) {
    this.loadingFav = true;

    this.apiService.get('comics/'+id, [])
    .subscribe(
      resp => {
        this.loadingFav = false;

        let comic = resp.data.results[0];

        this.favouriteSelected.title = comic.title;
        this.favouriteSelected.description = comic.description;
        this.favouriteSelected.price = comic.prices[0].price;
        this.favouriteSelected.imgPath = comic.thumbnail.path;
        this.favouriteSelected.imgExtension = comic.thumbnail.extension;
        this.modalService.open(content);
      }
    );
  }

}
