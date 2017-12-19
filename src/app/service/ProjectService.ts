import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from './APIService';

@Injectable()
export class ProjectService {

  constructor(private apiService: APIService) {}

  emitFormElement = new EventEmitter<any>();
  emitFormElementTemp = new EventEmitter<any>();
  emitDeleteElement = new EventEmitter<any>();
  emitFormArray = new EventEmitter<any>();
  emitTemplateArray = new EventEmitter<any>();
  emitFormWithID = new EventEmitter<any>();
  emitTemplateWithID = new EventEmitter<any>();
  emitUpElement = new EventEmitter<any>();
  emitDownElement = new EventEmitter<any>();
  emitProject = new EventEmitter<any>();
  emitResponse = new EventEmitter<any>();

  formArray = [
                { Details: { name: 'Form1', rule: 'None', project: 'Project 1', status:'Offline', cid:'a1221' },
                  Elements:  [{type: "text", required: false, name: "Name", value:"", cid:"a1", hepltext: ""},
                                  {type: "email", required: false, hepltext: "", name: "Email ID", value:"", cid:"b1"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input", value:"", cid:"c1"},],
                  Rules: [{cid:"211", name: 'Rule 1', elementName:'Name', elementType: "text", elementValue:"sam", template:1, tempCid: '2332', tempName: 'template1'},],
                },
                { Details: { name: 'Form2', rule: 'None', project: 'Project 2', status:'Online', cid:'a2121' },
                  Elements:  [{type: "text", required: false, name: "Name2", value:"", cid:"a11", hepltext: ""},
                                  {type: "email", required: false, value:"", cid:"a12", hepltext: "", name: "Email ID2"},
                                  {type: "number", required: false, value:"", cid:"a13", hepltext: "", name: "Number Input2"},],
                  Rules: [],
                }
              ];

  templateArray = [
                { Details:   { name: 'template1', rule: 'None', project:"N/A", cid:'2332b'},
                  Elements:  [{type: "text", required: false, name: "Name", value:"", cid:"a1q", hepltext: ""},
                                  {type: "email", required: false, value:"", cid:"a1b", hepltext: "", name: "Email ID"},
                                  {type: "number", required: false, value:"", cid:"a1c", hepltext: "", name: "Number Input"},],

                },
                { Details:   { name: 'template2', rule: 'None', project:"N/A", cid:'2323b' },
                  Elements:  [{type: "text", required: false, name: "Name2", value:"", cid:"aa1", hepltext: ""},
                                {type: "email", required: false, value:"", cid:"ba1", hepltext: "", name: "Email ID2"},
                                {type: "number", required: false, value:"", cid:"ca1", hepltext: "", name: "Number Input2"},],
                }
              ];

  projectArray = [
    {name: 'Project Name Here 1', form: '1', user: '8', assessor: '1', desc:'This is a test project about different design concepts we can adopt to show a card design. Lorem iThis is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kilpsum doler sit kil This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil'},
    {name: 'Project Name Here 2', form: '2', user: '1', assessor: '13',  desc:'This is again a test project about different design concepts we can adopt to show a card design. sit amet chip c This is a test project about different design concepts we can adopt to show a card designThis is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil. Lorem ipsum doler sit   kil'},
    {name: 'Project Name Here 3', form: '1', user: '2', assessor: '3',  desc:'This is again  a test project about different design concepts we can adopt to show a card design. Lorem ipsum dole il This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil  kil'},
  ];

  responseArray1 = [
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '$1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '$3500'},
    {name:'gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '$2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '$1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '$3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '$2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '$1500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '$2500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '$3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '$2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '$1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '$3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '$2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '$1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '$3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '$2500'},
  ];

  responseArray2 = [
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '3500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '2500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '1500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '3500'},
    {name:'sam ', position:'position status', office: 'noida', age: '22', startDate:'21/3/2010', salary: '1500'},
    {name:'Gimmy ', position:'pos UP', office: 'New-Delhi', age: '31', startDate:'09/01/2015', salary: '2500'},
    {name:'tom ', position:'position N/A', office: 'Delhi', age: '19', startDate:'01/11/2014', salary: '3500'},
  ];

  addNewProject(pname: string, pdesc: string) {
    this.projectArray.push({name: pname, desc: pdesc, form:'N/A', user: 'N/A', assessor: 'N/A'});
    this.getProject();
  }

  getResponce2() {
    console.log('res4');
    this.emitResponse.emit(this.responseArray2);
  }

  getResponce() {
    console.log('res2');
    this.emitResponse.emit(this.responseArray1);
  }

  getProject(){
    this.emitProject.emit(this.projectArray);
  }

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
    console.log(newRule);
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

  syncAll() {
    this.apiService.SyncAll(this.formArray, this.templateArray).subscribe(res=>{
      console.log(res);
      
    });
  }

}
