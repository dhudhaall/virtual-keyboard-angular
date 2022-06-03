import {
  ComponentFactoryResolver,
  ViewContainerRef,
  Output,
  AfterViewInit,
  Input,
  Directive,
  ComponentRef,
  HostListener,
  EventEmitter,
  ViewChild, ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AngVirtualKeyboardComponent } from './ang-virtual-keyboard.component';
import { SPECIAL_KEYS } from './specialKeysEnum';


@Directive({
  selector: '[appVirtualKeyboard]'
})
export class KeyboardPopupDirective implements AfterViewInit {

  @Input() appVirtualKeyboard = '';
  @Input() isKeyboardDirectiveActive = false;
  @Output() appVirtualKeyboardChange = new EventEmitter();
  @Input() kboardType: string = 'alphaNumeric';
  @ViewChild('childComp', { read: ViewContainerRef }) childComp = null;
  @Output() setValue = new EventEmitter()
  keyPressedSubscription?: Subscription;
  closeKeyboardSubscription?: Subscription;
  specialKeyPressedSubscription?: Subscription;
  private vkbCompRef?: ComponentRef<AngVirtualKeyboardComponent>;
  factory: any;

  constructor(private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    // factory comp resolver
    this.factory = this.resolver.resolveComponentFactory(AngVirtualKeyboardComponent);
    this.setValue.emit((value:string)=>{
      this.appVirtualKeyboard = value;
    });
  }

  @HostListener('click') onclick() {
    this.addKB();
  }

  // @HostListener('mouseleave') onMouseLeave(Event) {
  //   this.removeKB();
  //   }

  addKB() {
    if (this.isKeyboardDirectiveActive) {
      this.vkbCompRef = this.viewContainerRef.createComponent(this.factory);
      this.vkbCompRef.instance.kboardType = this.kboardType;
      this.keyPressedSubscription = this.vkbCompRef.instance.keyPressed.subscribe(
        (data) => {
          this.appendPressedKeyValue(data);
          this.elRef.nativeElement.focus();
        },
        (err) => console.log(err),
      );
      this.closeKeyboardSubscription = this.vkbCompRef.instance.shouldKeyboardBeOpen.subscribe(
        (data) => {
          if (data) {
            this.removeKB();
          }
        },
        (err) => console.log(err),
      );
      this.specialKeyPressedSubscription = this.vkbCompRef.instance.specialKeyPressed.subscribe(
        (data) => {
          this.specialKeyPressed(data);
          this.elRef.nativeElement.focus();
        },
        (err) => console.log(err),
      );
    }
  }

  removeKB() {
    this.vkbCompRef?.destroy();
    this.viewContainerRef.clear();
    this.keyPressedSubscription?.unsubscribe();
    this.closeKeyboardSubscription?.unsubscribe();
    this.specialKeyPressedSubscription?.unsubscribe();
  }

  private appendPressedKeyValue(data: any) {
    this.appVirtualKeyboard = this.appVirtualKeyboard + data;
    this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
  }

  private specialKeyPressed(data: any) {
    switch (data) {
      case SPECIAL_KEYS.clear:
        this.appVirtualKeyboard = '';
        this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
        break;
      case SPECIAL_KEYS.backspace:
        this.appVirtualKeyboard = this.appVirtualKeyboard.slice(0, -1);
        this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
    }
  }
}

