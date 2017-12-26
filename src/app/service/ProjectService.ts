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
  emitResTable = new EventEmitter<any>();
  emitUsers = new EventEmitter<any>();

  formArray = [
                { Details: { name: 'Form1', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121', status:'Offline', cid:'a1221' },
                  Elements:  [{type: "text", required: false, name: "Name", value:"", cid:"a1", hepltext: ""},
                                  {type: "email", required: false, hepltext: "", name: "Email ID", value:"", cid:"b1"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input", value:"", cid:"c1"},],
                  Rules: [{cid:"211", name: 'Rule 1', elementName:'Name', elementType: "text", elementValue:"sam",elementCid:"a1", tempCid: '2332b', tempName: 'template1', satisfyAll:false},],
                },
                { Details: { name: 'Form2', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121',  status:'Online', cid:'a2121' },
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
    {cid:"p121", cdate:"26/11/2017 10:14", name: 'Project Name Here11 1', form: 2, user: 3, assessor: 0, desc:'This is a test project about different design concepts we can adopt to show a card design. Lorem iThis is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kilpsum doler sit kil This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil'},
    {cid:"p122", cdate:"26/11/2017 10:22", name: 'Project Name Here22 2', form: 0, user: 0, assessor: 0,  desc:'This is again a test project about different design concepts we can adopt to show a card design. sit amet chip c This is a test project about different design concepts we can adopt to show a card designThis is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil. Lorem ipsum doler sit   kil'},
    {cid:"p123", cdate:"26/11/2017 10:25", name: 'Project Name Here33 3', form: 0, user: 0, assessor: 0,  desc:'This is again  a test project about different design concepts we can adopt to show a card design. Lorem ipsum dole il This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit This is a test project about different design concepts we can adopt to show a card design. Lorem ipsum doler sit   kil  kil'},
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

  userArray = [
    {cid:"p121", cdate:"26/11/2017 10:14", name: 'Sam', project:[{cid:'p121', name:'Project Name Here11 1'}], details:'Details'},
    {cid:"p122", cdate:"26/11/2017 10:13", name: 'Tom', project:[{cid:'p121', name:'Project Name Here11 1'}], details:'Details'},
    {cid:"p123", cdate:"26/11/2017 10:20", name: 'Rony', project:[{cid:'p121', name:'Project Name Here11 1'}], details:'Details'},

  ];

  addNewProject(pname: string, pdesc: string) {
    let d = new Date();
    let cid = d.getTime() +""+ Math.floor(1000 + Math.random() * 9000);
    let cdate = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
    this.projectArray.push({cid:cid, cdate:cdate, name: pname, desc: pdesc, form:0, user: 0, assessor: 0});
    this.getProject();
  }

  addUserArray(name, project) {
    let d = new Date();
    let cid = d.getTime() +""+ Math.floor(1000 + Math.random() * 9000);
    let cdate = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
    let temp = { 'cid':project.cid, 'name':project.name };
    let projObj = [];
    projObj.push(temp);
    this.userArray.push({cid:cid, cdate:cdate, name: name, project:projObj, details:'Details'});
    this.incUserCount(project.cid);
  }

  assignNewProjectToUser(cid,project) {
    let array = {cid:project.cid, name: project.name};
    for(let user of this.userArray) {
      if(user.cid == cid) {
        user.project.push(array);
        break;
      }
    }
    this.incUserCount(project.cid);
  }

  incUserCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.user++;
        break;
      }
    }
  }

  descUserCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.user--;
        break;
      }
    }
  }

  incAssessorCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.assessor++;
        break;
      }
    }
  }

  incFromCount(cid) {
    for(let proj of this.projectArray) {
      if(proj.cid === cid) {
        proj.form++;
        break;
      }
    }
  }

  getUsers() {
      this.emitUsers.emit(this.userArray);
  }

  getResponce() {
    this.emitResponse.emit(this.responseArray1);
  }

  getProject() {
    this.emitProject.emit(this.projectArray);
  }

  getFormArray() {
    this.emitFormArray.emit(this.formArray);
  }

  getTemplateArray() {
    this.emitTemplateArray.emit(this.templateArray);
  }

  deleteProjectUserArray(uCid,pCid) {
    // console.log(uCid +" "+pCid);
    let ipos: any;
    let jpos: any;

    for(let i = 0; i< this.userArray.length; i++) {
        if(uCid == this.userArray[i].cid) {
            ipos = i;
            break;
      }
    }

    for(let j = 0; j< this.userArray[ipos].project.length; j++) {
      if(pCid == this.userArray[ipos].project[j].cid) {
        jpos = j;
        break;
      }
    }
    // console.log(ipos +" "+jpos);
    this.userArray[ipos].project.splice(jpos,1);
    // console.log(this.userArray[ipos]);
    this.descUserCount(pCid);
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

  addNewRule(fcid: any,newRule: any) {

    if(newRule.ruleFormQuestion != undefined) {
      let now = new Date();
      let cid = now.getTime() +""+ Math.floor(1000 + Math.random() * 9000);

      let template: any = {Details:{},Elements:[]};       // generate new template
      template.Details.name = 'Form question';            // generate template properties
      template.Details.rule = '';
      template.Details.project = '';
      template.Details.cid = cid;
      template.Elements.push(newRule.ruleFormQuestion);   // push elements
      console.log(template);
      this.templateArray.push(template);                  // push new generated template on the template array

      console.log("1");
      for(let i = 0; i< this.formArray.length; i++) {
        console.log(this.formArray[i]);
        console.log(fcid);
          if(this.formArray[i].Details.cid == fcid) {
            console.log(this.formArray[i]);
            for(let j=0; j< this.formArray[i].Elements.length; j++) {
              console.log("4");
              if(this.formArray[i].Elements[j].cid == newRule.ruleFormQuestion.cid) {
                console.log("here");
                this.formArray[i].Elements.splice(j,1);
                console.log(this.formArray);
                break;

              }
            }
          }
      }

      newRule.tempCid = cid;                               // insert tempID on the rule list
      newRule.tempName = template.Details.name;            // insert temp Name on the rule list
      console.log(newRule);

    }

    let i=0;
    let temp: any;
    for(i=0; i<this.formArray.length; i++) {
      if(fcid == this.formArray[i].Details.cid) {
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

  emitResponseForResTable(data) {
    let tempArray :any = [];
    for(let m of this.responseArray1) {
        if(m.office == data) {
          tempArray.push(m);
        }
    }
    this.emitResTable.emit(tempArray);
  }

}
