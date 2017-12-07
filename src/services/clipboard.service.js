// Import the core angular services.
import { DOCUMENT } from "@angular/platform-browser";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";

@Injectable()
export class ClipboardService {
  constructor( ) {
    this.textarea;
    this.dom = document;
  }
  copy( value ) {
    this.textarea = this.dom.createElement("textarea");
    this.textarea.style.height = "0px";
    this.textarea.style.left = "-100px";
    this.textarea.style.opacity = "0";
    this.textarea.style.position = "fixed";
    this.textarea.style.top = "-100px";
    this.textarea.style.width = "0px";
    this.dom.body.appendChild(this.textarea);

    // Set and select the value (creating an active Selection range).
    this.textarea.value = value;
    this.textarea.select();

    // Ask the browser to copy the current selection to the clipboard.
    this.dom.execCommand("copy");

    if (this.textarea && this.textarea.parentNode) {
      this.textarea.parentNode.removeChild(this.textarea);
    }
  }

}