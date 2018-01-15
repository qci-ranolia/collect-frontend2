import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  templateArray = [];
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
  ruleFormQuestion: any;
  rulesArray: any=[];
  formCIDWithRule: any;
  satisfyAll = false;
  files : any;
  
  constructor( private projectService: ProjectService, private router: Router ){
    
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
    this.tArray.unsubscribe();
  }

  rule(data, cid, formElement) {
    this.rulesArray = data;
    this.formCIDWithRule = cid;
    this.rnameArray = formElement;
  }

  getVal() {
    // console.log(this.ruleElement);
    if(this.ruleElement.option) {
      this.hint = this.ruleElement.option.toString();
    }
    if(this.ruleElement.value) {
      this.hint = this.hint + "," +this.ruleElement.value;
    }
    // console.log(this.ruleCondition);
  }

  satisfyAllCondition() {
      if(this.satisfyAll) {
        this.satisfyAll = false;
      } else {
        this.satisfyAll = true;
      }
  }

  conformRule() {

    let tempCid = "";
    let tempName = "";
    if(this.ruleTempTail==undefined) {

    } else {
      tempCid = this.ruleTempTail.Details.cid;
      tempName = this.ruleTempTail.Details.name;
    }
    
    let now = new Date();
    let cid = now.getTime() +""+ Math.floor(1000 + Math.random() * 9000);
    let newRule = {cid:cid, name: this.ruleName, elementName: this.ruleElement.name,elementCid: this.ruleElement.cid, elementType: this.ruleElement.type, elementValue: this.ruleTarget.trim(), condition: this.ruleCondition, tempCid: tempCid, tempName: tempName, ruleFormQuestion: this.ruleFormQuestion, satisfyAll: this.satisfyAll};
    this.projectService.addNewRule(this.formCIDWithRule, newRule);
  }
  getResponse(fid) {
    this.router.navigate(['/resTable'], { queryParams: { id: fid } });
  }
}
