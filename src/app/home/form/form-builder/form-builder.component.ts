import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  jsonArray: any[] = [];
  disabledAll = false;
  displayPublish = false;
  tempID: any = undefined;
  formID: any = undefined;
  formDetails: any;
  tempDetails: any;
  name: any;
  project_name: any;
  sumbitForm = 'Save as Form';
  sumbitTemp = 'Save as Template';
  newFormName = '';
  newFormProjectName = '';
  newTempName = '';
  sub: any;
  sub1:any;
  sub2:any;
  sub3:any;
  sub4:any;
  sub5:any;
  sub6:any;
  sub7:any;

  constructor (private projectService:ProjectService, private activatedRoute: ActivatedRoute) {

    this.sub1 = this.projectService.emitTemplateWithID.subscribe((res)=>{
      this.tempDetails = res.Details;
      this.name = res.Details.name;
      this.project_name = res.Details.project;
      this.jsonArray = res.Elements;
      this.sumbitTemp = 'Modify Template';
      if(this.jsonArray.length > 0) {
        this.displayPublish = true;
      } else {
        this.displayPublish = false;
      }
    });

    this.sub2 = this.projectService.emitFormWithID.subscribe((res)=>{
      this.formDetails = res.Details;
      this.jsonArray = res.Elements;
      this.name = res.Details.name;
      this.project_name = res.Details.project;
      this.sumbitForm = 'Modify Form';
      if(this.jsonArray.length > 0) {
        this.displayPublish = true;
      } else {
        this.displayPublish = false;
      }
    });

    this.sub3 = this.projectService.emitFormElement.subscribe((res)=>{
      // console.log(res);
      res = JSON.stringify(res);
      res = JSON.parse(res);
      this.jsonArray.push(res);
      // console.log(this.jsonArray);
      this.displayPublish = true;

    });

    this.sub4 = this.projectService.emitFormElementTemp.subscribe((res)=>{
      // console.log(res);
      res = JSON.stringify(res);
      res = JSON.parse(res);
      this.jsonArray = this.jsonArray.concat(res);
      // console.log(this.jsonArray);
      this.displayPublish = true;

    });

    this.sub5 = this.projectService.emitDeleteElement.subscribe((res)=>{

      this.jsonArray.splice(res,1);
      if(this.jsonArray.length == 0) {
        this.displayPublish = false;
        // console.log(this.displayPublish);
      }
      localStorage.setItem('form_template',JSON.stringify(this.jsonArray));

    });

    this.sub6 = this.projectService.emitUpElement.subscribe((res)=>{

      let temp1 = this.jsonArray[(parseInt(res)-1)];
      this.jsonArray.splice((parseInt(res)-1),1);
      this.jsonArray.splice(parseInt(res), 0, temp1);
    });

    this.sub7 = this.projectService.emitDownElement.subscribe((res)=>{

      if(res < (this.jsonArray.length-1)) {

        let temp2 = this.jsonArray[(parseInt(res)+1)];
        this.jsonArray.splice((parseInt(res)+1),1);
        this.jsonArray.splice(parseInt(res), 0, temp2);
      }

    });

  }

  ngOnInit () {

    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.formID = params.formID;
        this.tempID = params.templateID;
        // console.log(this.formID);
        // console.log(this.tempID);

        if(this.formID != undefined) {
          this.projectService.getFormArrayWithID(this.formID);
        }
        if(this.tempID != undefined) {
          this.projectService.getTemplateArrayWithID(this.tempID);
        }

    });
  }

  deleteElement(id) {
    this.projectService.emitDeleteElement.emit(id);
  }

  publishForm() {
    if(this.formID != undefined) {
      this.projectService.formArray.splice(this.formID,1);
      this.projectService.formArray.push({Details: this.formDetails, Elements:this.jsonArray, Rules:[]});
      // console.log('form published 1 ');
    } else {
      $("#newFormModal").modal('show');
    }
    // console.log(this.projectService.formArray);
  }

  publishTemplate() {
    if(this.tempID != undefined) {
      this.projectService.templateArray.splice(this.tempID,1);
      this.projectService.templateArray.push({Details: this.tempDetails, Elements:this.jsonArray});
      // console.log('template published 1 ');
    } else {
      $("#newTempModal").modal('show');
    }
    // console.log(this.projectService.templateArray);
  }

  conformForm() {

    let id = (this.projectService.formArray.length  ) + '';
    this.projectService.formArray.push({Details: {name: this.newFormName, rule: 'None', project: this.newFormProjectName, status:'Offline', id:id }, Elements:this.jsonArray,  Rules:[]});
    // console.log('form published 2 ');
  }

  conformTemp() {
    let id = (this.projectService.templateArray.length  ) + '';
    this.projectService.templateArray.push({Details: {name: this.newTempName, rule: 'None', project: 'N/A', id:id }, Elements:this.jsonArray});
    // console.log('template published 2 ');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
    this.sub6.unsubscribe();
    this.sub7.unsubscribe();
  }

}
