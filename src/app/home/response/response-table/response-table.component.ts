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
  formId: any;
  response: any=[];
  header: any=[];
  flag = false;

  constructor(private projectService:ProjectService, private activatedRoute: ActivatedRoute) {

    this.sub = this.projectService.emitFormResponse.subscribe(res=>{
      console.log(res);
      this.response = res;
    });

    this.sub1 = this.projectService.emitTableHeader.subscribe(res=>{
      console.log(res);
      this.header = res;
      this.flag = true;
      this.display();
    });

  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.formId = params.id;
        this.projectService.getFormResponseArray(this.formId);
    });
  }

  display() {
    if(this.flag) {
      $(document).ready(function() {
        $("#exampleFormResponse").DataTable({
          responsive: true,
          dom: 'Bfrtip',
          buttons: [
              'csv', 'pdf',
          ]
        });
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}
