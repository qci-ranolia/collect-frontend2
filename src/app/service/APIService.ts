import { Http, Response, Headers, RequestOptions,BaseRequestOptions, RequestMethod} from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  projectURL: string = 'http://192.168.15.187:8000';
  // projectURL: string = 'http://qcitech.org:8081';

  userID = "ca83bf0d67604cbd8fbc21e2af9a0d03";

  constructor( private http: Http) {}

  SyncAll(formArray: any, tempArray: any) {

    formArray = JSON.stringify(formArray);
    formArray = JSON.parse(formArray);
    formArray = JSON.stringify(formArray);
    tempArray = JSON.stringify(tempArray);
    tempArray = JSON.parse(tempArray);
    tempArray = JSON.stringify(tempArray);
    let formData = new FormData();
    formData.append('formArray', formArray);
    formData.append('tempArray', tempArray);
    return this.http.post(this.projectURL+'/savetestform', formData);
  }

  AddNewProject(data: any){
    return this.http.post(this.projectURL+'/addProject', data).map(res=>res.json());
  }

  GetAllProjects(data: any){
    return this.http.get(this.projectURL+'/getAllProjects').map(res=>res.json());
  }

  PushIntoForm(formArray: any){
    formArray = JSON.stringify(formArray);
    formArray = JSON.parse(formArray);
    formArray = JSON.stringify(formArray);
    let formData = new FormData();
    formData.append('formArray',formArray);
    return this.http.post(this.projectURL+'/addNewForm', formData).map(res=>res.json());
  }

  PushIntoTemplate(tempArray: any){
    tempArray = JSON.stringify(tempArray);
    tempArray = JSON.parse(tempArray);
    tempArray = JSON.stringify(tempArray);
    let tempData = new FormData();
    tempData.append('tempArray',tempArray);
    return this.http.post(this.projectURL+'/addNewTemplate', tempData).map(res=>res.json());
  }

  GetFormArray(data: any){
    // let tempData = new FormData();
    // tempData.append('tempArray',tempArray);
    // return this.http.post(this.projectURL+'/addNewTemplate', tempData).map(res=>res.json());
  }
}
