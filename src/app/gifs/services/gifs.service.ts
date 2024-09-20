import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor( private http: HttpClient ) {
    this.loadLocalStorage()
    this.searchTag(this._tagsHistory[0])
  }

  private gifs: Gif[] = [];
  private _tagsHistory:string[] = [];
  private apiKey: string = 'jMsV0px01ZjnGIg5Tn5x8pm8ILHfwm2P'
  private apiUrl: string = 'https://api.giphy.com/v1/gifs'

  private organizeHistory(tag: string):void {
    tag = tag.toLocaleLowerCase()
    if(this.tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.slice(0,10);
    this.saveLocalStorage()
  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  public saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  public loadLocalStorage():void{
    if(!localStorage.getItem('history')) return
    this._tagsHistory =  JSON.parse(localStorage.getItem('history')!)
  }

  get gifsList(){
    return this.gifs;
  }

  searchTag(tag: string):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.apiUrl}/search`, { params })
      .subscribe( res => {
        this.gifs = res.data;

      })
  }


}
