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
  detailPos: any;
  detailRes: any;
  saveFlag: any = false;
  arrayPos :any;
  resId: any;
  flaggedMsg : any ='';
  elementCid: any;

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
          aaSorting: [],
          responsive: true,
          dom: 'lBfrtip',
          buttons: [
              'csv', 'pdf',
          ]
        });
      });
    }
  }

  openImage(url) {
    window.open(url, '_blank');
  }

  getDetails(i,res) {
    console.log(i);
    console.log(res);
    this.detailPos = i;
    this.detailRes = res;
    this.saveFlag = false;
    $('#getDetails').modal("show");
  }

  flagCommentModal( arrayPos, resId, cid) {

    this.elementCid = cid
    this.resId = resId;
    this.arrayPos = arrayPos;

    if(this.response[this.detailPos][this.arrayPos].flagged){
      this.response[this.detailPos][this.arrayPos].flagged = false;
      this.flaggedMsg = '';
      this.saveFlag = true;
      if(this.response[this.detailPos][this.arrayPos].flagMsg) {
        this.flaggedMsg = this.response[this.detailPos][this.arrayPos].flagMsg;
      }
    } else {
      this.response[this.detailPos][this.arrayPos].flagged = true;
      this.flaggedMsg = '';
      this.saveFlag = true;
      if(this.response[this.detailPos][this.arrayPos].flagMsg) {
        this.flaggedMsg = this.response[this.detailPos][this.arrayPos].flagMsg;
      }
      $('#flagComment').modal("show");
    }
  }

  flagMsg() {
    // console.log(this.flaggedMsg);
    this.response[this.detailPos][this.arrayPos].flagMsg = this.flaggedMsg+"";

  }

  saveFlagFun(){
    console.log(this.response[this.detailPos]);
    console.log(this.resId);
    this.projectService.flagResponse(this.resId, this.response[this.detailPos]);
    this.resId = "";
    this.detailPos = "";
    this.flaggedMsg = "";
    $('#getDetails').modal("hide");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

}
