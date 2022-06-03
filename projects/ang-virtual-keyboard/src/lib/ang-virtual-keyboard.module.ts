import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngVirtualKeyboardComponent } from './ang-virtual-keyboard.component';
import { KeyboardPopupDirective } from './keyboard-popup.directive';



@NgModule({
  declarations: [AngVirtualKeyboardComponent,
    KeyboardPopupDirective],
  imports: [
    CommonModule
  ],
  exports: [AngVirtualKeyboardComponent,
    KeyboardPopupDirective],
  entryComponents: [
    AngVirtualKeyboardComponent],
})
export class AngVirtualKeyboardModule { }
