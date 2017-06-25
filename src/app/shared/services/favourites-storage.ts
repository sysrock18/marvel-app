import { Injectable } from '@angular/core';

@Injectable()
export class FavouritesStorage {
  constructor(
  ) {}

  getFavourites() {
    return JSON.parse(localStorage.getItem('favourites'));
  }

  addFavourite(favComic) {
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
  }

  updateFavourites(favourites) {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
}