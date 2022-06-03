import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputString = '';
  reactiveControl = new FormControl('');
  setValue: any;
  constructor(

  ) { }

  valueChange(e: string) {
    console.log(e);
    this.reactiveControl.setValue(e);
  }

  onBackPress(){
    this.setValue('');
  }
}
