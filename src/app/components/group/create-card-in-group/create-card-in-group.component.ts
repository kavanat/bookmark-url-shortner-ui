import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../services/group.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../shared/data.service';
import {Card} from '../../card/model/card';
import {Group} from '../model/group';

@Component({
  selector: 'app-create-card-in-group',
  templateUrl: './create-card-in-group.component.html',
  styleUrls: ['./create-card-in-group.component.css']
})
export class CreateCardInGroupComponent implements OnInit {

  uploadForm: FormGroup;
  selectedFile: File;
  message: string;
  emailGlobal: string;
  displayCardsUrl='http://localhost:8081/card/all/admin';
  displayGroupUrl='http://localhost:8081/group/all/admin/';
  submitUrl='http://localhost:8081/group/add-card-to-group/';

  cards:Card[];
  groups:Group[];
  card_id:number;
  group_id:number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dataService: DataService,

  ) {
    this.emailGlobal = sessionStorage.getItem('emailGlobal');
  }

  setGroup(id:number){
    this.group_id = id;
  }

  setCard(id:number){
    this.card_id = id;
  }



  // tslint:disable-next-line:typedef
  displayCards() {
    this.httpClient.post<Card[]>(this.displayCardsUrl, this.emailGlobal).subscribe(res => {
      this.cards = res;
    });
  }

  displayGroups(){
    this.httpClient.get<Group[]>(this.displayGroupUrl + this.emailGlobal).subscribe(res=>{
      this.groups = res;
    });

  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    const dataset = {'added_by': this.emailGlobal, 'card_id': this.card_id, 'group_id': this.group_id};
    this.httpClient.post(this.submitUrl,dataset).subscribe(res=>{this.gotoGroupList()});

  }
  // tslint:disable-next-line:typedef
  gotoGroupList() {
    this.router.navigate(['/home/group/listCardsInGroup']);
  }

  ngOnInit(): void {
    this.displayCards();
    this.displayGroups();
  }

}
