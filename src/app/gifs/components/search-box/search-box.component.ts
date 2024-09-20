import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs" (keyup.enter)="searchTag()" #txtTag />
  `
})

export class SearchBox{
  constructor(private gifsService: GifsService) { }

  @ViewChild('txtTag')
  public tagInput!: ElementRef<HTMLInputElement>

  searchTag(){

    let newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = ''
  }
}
