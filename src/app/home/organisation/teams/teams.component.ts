import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ProjectService} from '../../../service/ProjectService';
declare var $: any;
import 'datatables.net';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: any = [];
  flag = false;
  formArray: any = [];
  teamName: any;
  assessorPhone: any;
  formAssociate: any;
  teamProjectName : any;
  teamFormArray : any =[];
  projectAs: any;
  teamCid: any;
  sub: any;
  sub1: any;
  sub2: any;
  sub3: any;
  sub4: any;

  constructor(private projectService: ProjectService, private router: Router) {
    this.sub = this.projectService.emitTeams.subscribe(res=>{
      this.teams = res;
      this.flag = true;
      this.display();
    });

    this.sub1 = this.projectService.emitFormArray.subscribe(res=>{
      this.formArray = res;
    });
  }

  ngOnInit() {
    this.projectService.getTeams();
  }

  display() {
    if(this.flag) {
       $(document).ready(function() {
        var t = $('#example2').DataTable({
          "columnDefs": [ {
            "orderable": false,
            "targets": 0,
            "bSort": false
        } ],
        "bSort": false
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            });
        }).draw();
      });
    }
  }

  team() {
    this.projectService.getFormArray();
    $("#newTeamModal").modal('show');
  }

  saveTeam() {
    // console.log(this.formAssociate);
    this.projectService.addTeamArray(this.teamName,  this.formAssociate);
    this.teamName = '';
    $("#newTeamModal").modal('hide');
    this.router.navigate(['/org'], { queryParams: { id: ""+ Math.floor(1000 + Math.random() * 9000) } });
    this.formAssociate = "";
    this.formArray=[];
  }

  calForms(project) {
    let j = 0;
    for(let i of project) {
      j++;
    }
    return ""+j;
  }

  showProjectModal( teamName, teamCid, formArray) {
    this.projectService.getFormArray();
    let n = 0;
    let temp = [];
    this.teamProjectName = teamName;
    this.teamCid = teamCid;
    this.teamFormArray = formArray;

    $("#teamFormModal").modal('show');

  }

  assignNewProject() {
    // this.projectService.assignNewProjectToUser(this.userCid,this.projectAs);
    this.projectService.assignNewFormToTeam(this.teamCid,this.projectAs);
    $("#teamFormModal").modal('hide');
    this.formArray = [];
    this.teamFormArray= [];
    this.projectAs = "";
    this.formArray = [];
  }

  deleteFormTeamArray(formCid, projCid) {
    this.projectService.deleteFormTeamArray(this.teamCid, formCid, projCid);

    $("#teamFormModal").modal('hide');
    this.formArray = [];
    this.teamFormArray= [];
  }

  projectForm(project) {
    //{ name: 'Form2', rule: 'None', project: 'Project Name Here 1', projectcdi:'p121',  status:'Online', cid:'a2121' }
    let name = "";
    for(let n of project) {
      name += n.name + " " + n.project + ",  ";
    }
    // console.log(name);
    return name;

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }


}
