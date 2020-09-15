import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {DataService} from '../../../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  private getcardsUrl: string;
  private postcardsUrl: string;
  private updatecardsUrl: string;

  constructor(private http: HttpClient,
              private dataService: DataService) {
    this.getcardsUrl = 'http://localhost:8081/card/all/';
    this.postcardsUrl = 'http://localhost:8081/card/create';
    this.updatecardsUrl = 'http://localhost:8081/card/update';
  }
  // tslint:disable-next-line:typedef
  public findAll(emailGlobal: string){
    console.log('entered');
    return this.http.post<Card[]>(this.getcardsUrl, emailGlobal);
  }
  // tslint:disable-next-line:typedef
  public save(card: Card){
    return this.http.post<Card>(this.postcardsUrl, card);
  }

  // tslint:disable-next-line:typedef

  // tslint:disable-next-line:typedef
  public update(card: Card){
    return this.http.patch(this.updatecardsUrl, card);
  }

}
