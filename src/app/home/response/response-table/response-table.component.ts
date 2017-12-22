import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;

@Component({
  selector: 'app-response-table',
  templateUrl: './response-table.component.html',
  styleUrls: ['./response-table.component.css']
})
export class ResponseTableComponent implements OnInit {

  sub : any;
  sub1 : any;
  id: any;
  response: any;
  flag = false;

  constructor(private projectService:ProjectService, private activatedRoute: ActivatedRoute) {
    this.sub1 = this.projectService.emitResTable.subscribe(res=>{
      // console.log(res);
      this.response = res;
      this.flag = true;
      this.display();
    });
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.id = params.id;
        this.projectService.emitResponseForResTable(this.id);
    });
  }

  display() {
    if(this.flag) {
      $(document).ready(function() {
        $("#example").DataTable({
          "bSort": false
        });
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}
