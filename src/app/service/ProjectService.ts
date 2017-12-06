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
                { Details: { name: 'Form1', rule: 'None', project: 'Test Project1', status:'Offline', id:'0' },
                  Elements:  [{type: "text", required: false, name: "Name"},
                                  {type: "email", required: false, hepltext: "", name: "Email ID"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input"},]
                },
                { Details: { name: 'Form2', rule: 'None', project: 'Test Project2', status:'Online', id:'1' },
                  Elements:  [{type: "text", required: false, name: "Name2"},
                    {type: "email", required: false, hepltext: "", name: "Email ID2"},
                    {type: "number", required: false, hepltext: "", name: "Number Input2"},]
                }];

  templateArray = [
                { Details:   { name: 'template1', rule: 'None', id:'0', project:"N/A"},
                  Elements:  [{type: "text", required: false, name: "Name"},
                                  {type: "email", required: false, hepltext: "", name: "Email ID"},
                                  {type: "number", required: false, hepltext: "", name: "Number Input"},],
                  Rules:     [{ruleName:'Rule1', type: "text", name: "Name", value: "Sam"}],
                  Tail:      1,
                },
                { Details:   { name: 'template2', rule: 'None', id:'1', project:"N/A" },
                  Elements:  [{type: "text", required: false, name: "Name2"},
                                {type: "email", required: false, hepltext: "", name: "Email ID2"},
                                {type: "number", required: false, hepltext: "", name: "Number Input2"},],
                  Rules:     [],
                  Tail:      0,
                }];

  getFormArray() {
    this.emitFormArray.emit(this.formArray);
  }

  getTemplateArray() {
    this.emitTemplateArray.emit(this.templateArray);
  }

  getFormArrayWithID(id) {
    this.emitFormWithID.emit(this.formArray[id]);
  }

  getTemplateArrayWithID(id) {
    this.emitTemplateWithID.emit(this.templateArray[id]);
  }



}
