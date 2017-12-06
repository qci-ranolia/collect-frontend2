import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../service/ProjectService';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formArray = [];
  templateArray = [];
  fArray : any;
  tArray : any;
  tID: any;
  rulesArray= [];
  aTemp: any;
  rnameArray = [];
  rcondition = ['equals','grater than', 'smaller than', 'not equals'];
  ruleElement: any;
  ruleCondition: any;
  hint: any;
  target: any;
  ruleTempTail: any;
  ruleTarget: any;
  ruleID: any;
  ruleName: any;

  constructor( private projectService: ProjectService, private router: Router ){
    this.fArray = this.projectService.emitFormArray.subscribe((res)=>{
      console.log(res);
      this.formArray = res;
    });

    this.tArray = this.projectService.emitTemplateArray.subscribe((res)=>{
      console.log(res);
      this.templateArray = res;
    });

  }

  new() {
    this.router.navigate(['/formBuilder']);
  }

  ngOnInit() {
    this.projectService.getFormArray();
    this.projectService.getTemplateArray();
  }

  ngOnDestroy() {
    this.fArray.unsubscribe();
    this.tArray.unsubscribe();
  }

  tempID(id) {
    this.ruleID = id;
    this.rulesArray = this.templateArray[id].Rules;
    this.aTemp = this.templateArray[this.templateArray[id].Tail].Details.name;
    let tempLen = this.templateArray[id].Elements.length;
    for(let i=0; i<tempLen; i++) {
      this.rnameArray.push(this.templateArray[id].Elements[i]);
    }
    // console.log(this.rnameArray);
  }

  getVal() {
    console.log(this.ruleElement);
    if(this.ruleElement.option) {
      this.hint = this.ruleElement.option.toString();
    }
    if(this.ruleElement.value) {
      this.hint = this.hint + this.ruleElement.value;
    }
    console.log(this.ruleCondition);
  }

  conformRule() {
    this.ruleTempTail = this.ruleTempTail.Details.id;
    console.log('Tail = '+this.ruleTempTail);
    console.log('Condition = '+this.ruleCondition);
    console.log('Value = '+this.ruleTarget);
    console.log('Element name = '+this.ruleElement.name);
    console.log('Element type = '+this.ruleElement.type);

    this.templateArray[this.ruleID].Rules.push({ruleName: this.ruleName, type: this.ruleElement.type, name: this.ruleElement.name, value: this.ruleTarget, condition: this.ruleCondition});
    // {ruleName:'Rule1', type: "text", name: "Name", value: "Sam"}
    this.templateArray[this.ruleID].Tail = this.ruleTempTail;
  }

}
