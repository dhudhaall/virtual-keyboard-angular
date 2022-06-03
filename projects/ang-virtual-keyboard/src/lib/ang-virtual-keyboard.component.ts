import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SPECIAL_KEYS } from './specialKeysEnum';

@Component({
  selector: 'lib-ang-virtual-keyboard',
  templateUrl: './ang-virtual-keyboard.component.html',
  styleUrls: ['./ang-virtual-keyboard.component.css']
})
export class AngVirtualKeyboardComponent implements OnInit {

  keyPressed = new Subject();
  shouldKeyboardBeOpen = new Subject();
  specialKeyPressed = new Subject();
  isKeyBoardOpen = false;
  alphaArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's',
    'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
  numArray = new Array('7', '8', '9', '4', '5', '6', '1', '2', '3', '0');
  numArraySorted = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
  SpCharArray = ['~', '!', '@', '#', '$', '^', '&', '*', '(', ')', '-', '`',
    '_', '=', '{', '}', '|', ':', '`', '*', '?', '[', ']', '.', '/', ', '];

  alphaArrayDisp: string[] = [];
  numArrayDisp: string[] = [];;
  SpCharArrayDisp: string[] = [];;
  isShuffleOn: boolean = false;
  isHoverOn: boolean = false;
  isCapsLockOn: boolean = false;
  hoveredOrMouseDown: boolean = false;
  kboardType: string = 'alphaNumeric';
  numericRowsCount = new Array(3);

  constructor(private cdRef: ChangeDetectorRef,
    private eRef: ElementRef) {
  }

  ngOnInit() {
    this.resetCharacterArrays();
    this.isShuffleOn = false;
    this.isHoverOn = false;
    this.isCapsLockOn = false;
    this.hoveredOrMouseDown = false;
  }

  // Logic To Shuffle A
  shuffleArrayAlgo(arr: string[]) {
    let currentIndex = arr.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  }

  shuffleDisplayArray() {
    // Shuffle All Arrays
    this.shuffleArrayAlgo(this.alphaArrayDisp);
    this.shuffleArrayAlgo(this.numArrayDisp);
    this.shuffleArrayAlgo(this.SpCharArrayDisp);
  }

  onCharacterKeyClick(i: string) {
    if (this.isShuffleOn === true) {
      this.shuffleDisplayArray();
    }
    this.keyPressed.next(i);
  }

  toggleCapsLock() {
    this.isCapsLockOn = !this.isCapsLockOn;
    if (this.isCapsLockOn) {
      this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
        return x.toUpperCase();
      });
    } else if (!this.isCapsLockOn) {
      this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
        return x.toLowerCase();
      });
    }
  }

  toggleShuffle() {
    this.isShuffleOn = !this.isShuffleOn;
    if (this.isShuffleOn) {
      this.shuffleDisplayArray();
    } else {
      this.resetCharacterArrays();
    }
    if (this.isCapsLockOn) {
      this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
        return x.toUpperCase();
      });
    }
  }

  resetCharacterArrays() {
    this.alphaArrayDisp = this.alphaArray.slice();
    if (this.kboardType === 'alphaNumeric') {
      this.numArrayDisp = this.numArraySorted.slice();
    } else {
      this.numArrayDisp = this.numArray.slice();
    }
    this.SpCharArrayDisp = this.SpCharArray.slice();
  }

  backspaceKeyPressed() {
    this.specialKeyPressed.next(SPECIAL_KEYS.backspace);
  }

  clearButtonPressed() {
    this.specialKeyPressed.next(SPECIAL_KEYS.clear);
  }

  spacebarKeyPressed() {
    this.keyPressed.next(' ');
  }

  toggleHover() {
    this.isHoverOn = !this.isHoverOn;
    console.log(this.isHoverOn);
  }

  @HostListener('document:click', ['$event'])
  whereDidUserClick(event: any) {
    this.cdRef.detectChanges();
    if (this.eRef.nativeElement.contains(event.target) || event.target.classList.contains('donotRemove')) {
      this.shouldKeyboardBeOpen.next(false);
    } else {
      if (this.isKeyBoardOpen) {
        this.shouldKeyboardBeOpen.next(true);
      }
      this.isKeyBoardOpen = true;
    }
  }
}
