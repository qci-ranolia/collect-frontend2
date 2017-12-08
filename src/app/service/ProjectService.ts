import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProjectService {

  constructor() {}

  emitFormElement = new EventEmitter<any>();
  emitFormElementTemp = new EventEmitter<any>();
  emitDeleteElement = new EventEmitter<any>();
  emitFormArray = new EventEmitter<any>();
  emitTemplateArray = new EventEmitter<any>();
  emitFormWithID = new EventEmitter<any>();
  emitTemplateWithID = new EventEmitter<any>();
  emitUpElement = new EventEmitter<any>();
  emitDownElement = new EventEmitter<any>();

  formArray = [
                { Details: { name: 'Form1', rule: 'None', project: 'Test Project1', status:'Offline', cid:'1221' },
                  Elements:  [{type: "text", required: false, name: "Name"},
                                  {type: "email", required: false, hepltext: "", name: "Email ID"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input"},],
                  Rules: [{name: 'Rule 1', elementName:'Name', elementType: "text", elementValue:"sam", template:1, tempCid: '2332', tempName: 'template1'},],
                },
                { Details: { name: 'Form2', rule: 'None', project: 'Test Project2', status:'Online', cid:'2121' },
                  Elements:  [{type: "text", required: false, name: "Name2"},
                                  {type: "email", required: false, hepltext: "", name: "Email ID2"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input2"},],
                  Rules: [],
                }
              ];

  templateArray = [
                { Details:   { name: 'template1', rule: 'None', project:"N/A", cid:'2332'},
                  Elements:  [{type: "text", required: false, name: "Name"},
                                  {type: "email", required: false, hepltext: "", name: "Email ID"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input"},],

                },
                { Details:   { name: 'template2', rule: 'None', project:"N/A", cid:'2323' },
                  Elements:  [{type: "text", required: false, name: "Name2"},
                                {type: "email", required: false, hepltext: "", name: "Email ID2"},
                                {type: "number", required: false, hepltext: "", name: "Number Input2"},],
                }
              ];

  getFormArray() {
    this.emitFormArray.emit(this.formArray);
  }

  getTemplateArray() {
    this.emitTemplateArray.emit(this.templateArray);
  }

  getFormArrayWithID(cid) {

    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(cid == this.formArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined)
    this.emitFormWithID.emit(this.formArray[temp]);
  }

  getTemplateArrayWithID(cid) {

    let i=0;
    let temp: any;
    for(i=0; i<this.templateArray.length; i++) {
      if(cid == this.templateArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.emitTemplateWithID.emit(this.templateArray[temp]);
    }
  }

  updateFormArray(cid: any, data: any) {
    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(cid == this.formArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.formArray[temp].Elements = data;
    }

  }

  updateTempArray(cid: any, data: any) {
    let i=0;
    let temp: any;
    for(i=0; i<this.templateArray.length; i++) {
      if(cid == this.templateArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.templateArray[temp].Elements = data;
    }

  }

  addNewRule(cid: any,newRule: any) {
    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(cid == this.formArray[i].Details.cid) {
        temp = i;
        break;
      }
    }
    if(temp != undefined) {
      this.formArray[temp].Rules.push(newRule);
    }
  }

  pushIntoForm(data: any) {
    this.formArray.push(data);

  }

  pushIntoTemplate(data: any) {
    this.templateArray.push(data);

  }

  calFormArrayLength() {
    return (this.formArray.length+'');
  }

  calTemplateArrayLength() {
    return (this.templateArray.length+'');
  }


}
