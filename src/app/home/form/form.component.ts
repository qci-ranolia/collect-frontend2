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
  aTemp: any;
  rnameArray = [];
  rcondition = ['equals','grater than', 'smaller than', 'not equals'];
  ruleElement: any;
  ruleCondition: any= 'equals';
  hint: any;
  target: any;
  ruleTempTail: any;
  ruleTarget: any;
  ruleID: any;
  ruleName: any;

  rulesArray: any=[];
  formIDWithRule: any;

  constructor( private projectService: ProjectService, private router: Router ){
    this.fArray = this.projectService.emitFormArray.subscribe((res)=>{
      // console.log(res);
      this.formArray = res;
    });

    this.tArray = this.projectService.emitTemplateArray.subscribe((res)=>{
      // console.log(res);
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

  rule(data, id) {

    this.rulesArray = data;
    this.formIDWithRule = id;
    let tempLen = this.formArray[id].Elements.length;
    for(let i=0; i<tempLen; i++) {
      this.rnameArray.push(this.formArray[id].Elements[i]);
    }
  }

  getVal() {
    // console.log(this.ruleElement);
    if(this.ruleElement.option) {
      this.hint = this.ruleElement.option.toString();
    }
    if(this.ruleElement.value) {
      this.hint = this.hint + this.ruleElement.value;
    }
    // console.log(this.ruleCondition);
  }

  conformRule() {

    this.ruleTempTail = this.ruleTempTail.Details.id;
    // console.log('Tail = '+this.ruleTempTail);
    // console.log('Value = '+this.ruleTarget);
    // console.log('Element name = '+this.ruleElement.name);
    // console.log('Element type = '+this.ruleElement.type);
    // console.log('Template Id = '+this.ruleTempTail);
    this.formArray[this.formIDWithRule].Rules.push({name: this.ruleName, elementName: this.ruleElement.name, elementType: this.ruleElement.type, elementValue: this.ruleTarget, condition: this.ruleCondition, template: this.ruleTempTail});

  }

}
