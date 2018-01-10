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
  ruleFormQuestion: any;
  rulesArray: any=[];
  formCIDWithRule: any;
  satisfyAll = false;
  files : any;

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

  syncCollectFrom($event) {
    let formData = new FormData();
    this.files = $event.target.files || $event.srcElement.files;
    let file = this.files[0];
    formData = new FormData();
    formData.append('form', file);
    this.projectService.uploadCollectForm(formData);
  }

  syncCollectFromRule($event) {
    let formData = new FormData();
    this.files = $event.target.files || $event.srcElement.files;
    let file = this.files[0];
    formData = new FormData();
    formData.append('rule', file);
    this.projectService.uploadCollectRule(formData);
  }

  checkStatus(fid) {
    for(let m of this.formArray) {
      if(m.Details.cid == fid) {
        if(m.Details.status == 'Offline'){
          return false;
        } else {
          return true;
        }
      }
    }
  }

  changeStatus(fid) {
    for(let m of this.formArray) {
      if(m.Details.cid == fid) {
        if(m.Details.status == 'Offline'){
          m.Details.status = 'Online';
        } else {
          m.Details.status = 'Offline';
        }
        this.projectService.changeFormStatus(fid, m.Details.status);
        break;
      }
    }

  }

  getResponse(fid) {
    this.router.navigate(['/resTable'], { queryParams: { id: fid } });
  }

}
