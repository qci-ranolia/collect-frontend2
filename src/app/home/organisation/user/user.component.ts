import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any = [];
  flag = false;
  projectArray: any = [];
  userName: any;
  projectAssociate: any;
  sub: any;
  sub1: any;
  sub2: any;
  sub3: any;
  sub4: any;

  constructor(private projectService: ProjectService, private router: Router) {
    this.sub = this.projectService.emitUsers.subscribe(res=>{
      // console.log(res);
      this.users = res;
      this.flag = true;
      this.display();
    });

    this.sub1 = this.projectService.emitProject.subscribe(res=>{
      // console.log(res);
      this.projectArray = res;
    });
  }

  ngOnInit() {
    this.projectService.getUsers();
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

  user() {
    this.projectService.getProject();
    $("#newUserModal").modal('show');
  }

  saveUser() {

    this.projectService.addProjectUser(this.userName,this.projectAssociate);
    this.userName = '';
    $("#newUserModal").modal('hide');

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }



}
