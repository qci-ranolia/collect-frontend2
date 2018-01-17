import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {ProjectService} from '../../../service/ProjectService';
declare var $: any;

// API KEY = AIzaSyA7ncvWAZbtaSujgwstq290g_Y1VskhlXE

@Component({
  selector: 'app-response-table',
  templateUrl: './response-table.component.html',
  styleUrls: ['./response-table.component.css']
})
export class ResponseTableComponent implements OnInit {

  sub : any;
  sub1 : any;
  formId: any;
  response: any=[];
  header: any=[];
  flag = false;
  detailPos: any;
  detailRes: any;
  saveFlag: any = false;
  arrayPos :any;
  resId: any;
  flaggedMsg : any ='';
  elementCid: any;
  tagPos: any;
  resIdForTag: any;
  verifyAll: any = false;
  imgUrl: any;
  lat: any = 28.6226475;
  lng: any = 77.24714399999999;
  mapSrc: any;

  constructor(private projectService:ProjectService, private activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {

    this.sub = this.projectService.emitFormResponse.subscribe(res=>{
      console.log(res);
      this.response = res;
    });

    this.sub1 = this.projectService.emitTableHeader.subscribe(res=>{
      console.log(res);
      this.header = res;
      this.flag = true;
      this.display();
    });

    this.mapSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyA7ncvWAZbtaSujgwstq290g_Y1VskhlXE&q="+this.lat+","+this.lng+"";
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
        this.formId = params.id;
        this.projectService.getFormResponseArray(this.formId);
    });
  }

  photoURL() {
    return this.mapSrc;
  }

  display() {
    if(this.flag) {
      $(document).ready(function() {
        $("#exampleFormResponse").DataTable({
          aaSorting: [],
          responsive: true,
          dom: 'lBfrtip',
          buttons: [
              'csv', 'pdf',
          ]
        });

        // Image Roation
        var rotation = 0;
        $.fn.rotate = function(degrees) {
            $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
        };
        $('.north').click(function() {
            rotation += 90;
            $('.north').rotate(rotation);
        });

      });
    }
  }

  openImageNewTab(url) {
    window.open(url, '_blank');
  }

  imageModal(url) {
    this.imgUrl = url;
    $('#imageModal').modal('show');
  }

  getDetails(i,res) {
    console.log(i);
    console.log(res);
    this.detailPos = i;
    this.detailRes = res;
    this.tagPos = i;
    this.saveFlag = false;
    $('#getDetails').modal("show");
  }

  changeTag(i,res) {
    this.resIdForTag = res[1].value;
    this.tagPos = i;

    $("#changeTag").modal("show");
  }

  newTag(tag) {
    console.log(this.resIdForTag);
    console.log(this.tagPos);
    this.response[this.tagPos][3].value = tag;
    $("#changeTag").modal("hide");
    this.projectService.updateTag(this.resIdForTag,tag);
  }

  flagCommentModal( arrayPos, resId, cid) {

    this.elementCid = cid
    this.resId = resId;
    this.arrayPos = arrayPos;

    if(this.response[this.detailPos][this.arrayPos].flagged){
      this.response[this.detailPos][this.arrayPos].flagged = false;
      this.flaggedMsg = '';
      this.saveFlag = true;
      if(this.response[this.detailPos][this.arrayPos].flagMsg) {
        this.flaggedMsg = this.response[this.detailPos][this.arrayPos].flagMsg;
      }

    } else {

      this.response[this.detailPos][this.arrayPos].flagged = true;
      this.flaggedMsg = '';
      this.saveFlag = true;
      if(this.response[this.detailPos][this.arrayPos].flagMsg) {
        this.flaggedMsg = this.response[this.detailPos][this.arrayPos].flagMsg;
      }
      $('#flagComment').modal("show");
    }

    // Check for any responce is flagged or not
    let tag = '';
    for(let m of this.response[this.detailPos]) {
      if(m.flagged) {
        tag = "Pending"
        break;
      }
    }
    // Update status od flag to VERIFIED
    if(tag !="Pending" && (this.response[this.detailPos][3].value == "Pending" || this.response[this.detailPos][3].value == "Flagged")) {
      this.verifyAll = true;
      this.saveFlag = false;
    } else {
      this.verifyAll = false;
      this.saveFlag = true;
    }

  }

  flagMsg() {
    // console.log(this.flaggedMsg);
    this.response[this.detailPos][this.arrayPos].flagMsg = this.flaggedMsg+"";
  }

  saveFlagFun(){
    this.response[this.detailPos][3].value = "Flagged";
    console.log(this.response[this.detailPos]);
    console.log(this.resId);
    this.projectService.flagResponse(this.resId, this.response[this.detailPos]);
    this.resId = "";
    this.detailPos = "";
    this.flaggedMsg = "";
    $('#getDetails').modal("hide");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }

  verifyTag() {
    this.response[this.detailPos][3].value = "Verified";
    this.projectService.updateTag(this.response[this.detailPos][1].value,"Verified");
    $('#getDetails').modal("hide");
  }
}
