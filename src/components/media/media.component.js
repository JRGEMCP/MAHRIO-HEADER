import { ViewChild, Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import template from './media.template.html';
import style from './media.style.scss';

import { MediaService } from '../../services';

@Component({
  selector: 'mahrio-media',
  template,
  styles: [style],
  queries: {
    fileUploadEl: new ViewChild('fileUpload')
  }
})

export class MahrioMediaComponent {
  static get parameters(){
    return [Http, MediaService];
  }
  constructor(http, media){
    this.http = http;
    this.media = media;
  }
  uploadFile(){
    let fi = this.fileUploadEl.nativeElement;
    if (fi.files && fi.files[0]) {
      this.media.getSignedUrl( '/api/images/key?filename='+fi.files[0].name )
        .then( res => {
          return this.media.uploadToAWS(res.signedRequest, fi.files[0])
        }).then( res => {
          let image = { type: fi.files[0].type, filename: fi.files[0].name, size: fi.files[0].size };
          return this.media.save( image );
        }).then( res => {
          console.log('done')
        }).catch( err => {

        })
    }
  }
  fileChangeEvent(fileInput){
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.src = e.target.result;
        console.log('in hereeee');
        console.log('in hereeee');
      }
      reader.readAsDataURL(fileInput.target.files[0]);

    }
  }
}