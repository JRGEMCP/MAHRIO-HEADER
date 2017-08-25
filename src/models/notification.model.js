export class Notice {
  constructor( config ){
    this.config = config;
  }

  get subject() {
    return 'subject';
  }

  goTo(){
    let ref = this.config.modal.open( this.config.component);
    ref.componentInstance.state = this.config.state;
    //this.modalRef = NgbModal.open( SessionModalComponent );
    //return ['/'];
  }

}