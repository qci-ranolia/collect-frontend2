import { Http, Response, Headers, RequestOptions,BaseRequestOptions, RequestMethod} from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  projectURL: string = 'http://192.168.15.221:8000';
  // projectURL: string = 'http://qcitech.org:8081';

  constructor( private http: Http, ) {}

  SyncAll(formArray: any, tempArray: any) {
    // return this.http.post(this.projectURL+'/savetestform',"{'formArray':'"+formArray+"', 'tempArray': '"+tempArray+"'}").map(res=>res.json());

    formArray = JSON.stringify(formArray);
    formArray = JSON.parse(formArray);
    formArray = JSON.stringify(formArray);

    tempArray = JSON.stringify(tempArray);
    tempArray = JSON.parse(tempArray);
    tempArray = JSON.stringify(tempArray);

    let formData = new FormData();

    formData.append('formArray', formArray);
    formData.append('tempArray', tempArray);

    // console.log(this.projectURL+'/savetestform','{"formArray":"'+formArray+'", "tempArray": "'+tempArray+'"}');

    return this.http.post(this.projectURL+'/savetestform', formData);



    // return this.http.post(this.projectURL+'/login',data).map(res=>res.json());
  }

}
