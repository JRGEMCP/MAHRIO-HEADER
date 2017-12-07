import { EventEmitter, ViewChild, Component } from '@angular/core';

import template from './media.template.html';
import style from './media.style.scss';

import { MediaService, ClipboardService } from '../../services';

@Component({
  selector: 'mahrio-media',
  template,
  styles: [style],
  queries: {
    fileUploadEl: new ViewChild('fileUpload')
  },
  outputs: ['copyEvent']
})

export class MahrioMediaComponent {
  static get parameters(){
    return [MediaService, ClipboardService];
  }
  constructor(media, clip){
    this.media = media;
    this.clip = clip;
    this.copyEvent = new EventEmitter();
  }
  ngOnInit(){
    this.media.get().then( res => {
      console.log(res);
      this.images = res.images;
    });
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
          this.images.push( {url: 'https://mahrio-medium.s3.amazonaws.com/', filename: fi.files[0].name});
        }).catch( err => {

        })
    }
  }
  fileChangeEvent(fileInput){
    if (fileInput.target.files && fileInput.target.files[0]) {
        this.media.getSignedUrl( '/api/images/key?filename='+fileInput.target.files[0].name )
          .then( res => {
          return this.media.uploadToAWS(res.signedRequest, fileInput.target.files[0])
        }).then( res => {
          let image = { type: fileInput.target.files[0].type, filename: fileInput.target.files[0].name, size: fileInput.target.files[0].size };
        return this.media.save( image );
      }).then( res => {
          console.log('done')
          this.images.push( {url: 'https://mahrio-medium.s3.amazonaws.com/', filename: fileInput.target.files[0].name});
      }).catch( err => {

        })



      var reader = new FileReader();
      reader.onload = (e) => {
        this.src = e.target.result;
        console.log('in hereeee');
        console.log('in hereeee');
      }
      reader.readAsDataURL(fileInput.target.files[0]);

    }
  }
  copyClipboard( image ){
    this.clip.copy( image.url + image.filename );
    this.copyEvent.emit();
  }
}