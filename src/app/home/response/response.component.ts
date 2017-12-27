import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../service/ProjectService';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  response: any;
  flag = false;
  sub: any;

  constructor(private projectService: ProjectService, private router: Router) {
    this.sub = this.projectService.emitResponse.subscribe(res=>{
      // console.log(res);

      let resFormIdArray = [];
      let tempRes = []

      for(let i=0; i<res.length; i++) {
        resFormIdArray.push( {formId : res[i].ResDetails.cid, formName: res[i].ResDetails.name, projectName: res[i].ResDetails.project} );
      }


      resFormIdArray = this.removeDuplicates(resFormIdArray,'formId');
      resFormIdArray = this.removeDuplicates(resFormIdArray,'formName');

      // console.log(resFormIdArray);

      for(let i=0; i<resFormIdArray.length; i++) {
        let c = 0;
        for(let j=0; j<res.length; j++) {
          if(resFormIdArray[i].formId == res[j].ResDetails.cid) {
            c++;
            resFormIdArray[i].count = c;
          }
        }
      }

      // console.log(resFormIdArray);

      this.response = resFormIdArray;
      this.flag = true;
      this.display();
    });
  }

  removeDuplicates (myArr, prop) {
    // resFormIdArray = Array.from(new Set(resFormIdArray));
      return myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
  }

  ngOnInit() {
    this.projectService.getResponse();
  }

  display() {
    if(this.flag) {
       $(document).ready(function() {
        var t = $('#example').DataTable({
          "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[ 1, 'asc' ]]
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        }).draw();

      });
    }
  }

  formName(fname, pname) {
    return fname +", "+pname;
  }

  calRes(res) {
    let j = 0;
    for(let i of res) {
      j++;
    }
    return ""+j;
  }

  getData(data) {
    this.router.navigate(['dash/resTable'], { queryParams: { id: data } });
  }

  reload() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
