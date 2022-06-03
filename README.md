# Angular Virtual Keyboard

Angular Virtual Keyboard is an angular library that can be used to add a virtual keyboard on an input control. It is simple to use and can be implemented by just importing and adding a directive

## Installation

Install ang-virtual-keyboard.

```bash
npm i ang-virtual-keyboard
```

## ScreenShots
![Keyboard Type 1](https://github.com/CodeIsAnArt/ang-virtual-keyboard/blob/master/projects/ang-virtual-keyboard-sample/src/assets/AlphaNumericType1.PNG?raw=true)

### Other variants
![Keyboard Type 1](https://github.com/CodeIsAnArt/ang-virtual-keyboard/blob/master/projects/ang-virtual-keyboard-sample/src/assets/Screenshots.png?raw=true)

## [Working Example](https://github.com/CodeIsAnArt/ang-virtual-keyboard/tree/master/projects/ang-virtual-keyboard-sample) 

## Features : 
**1.  Three Layouts avaliable**

        - Keyboard without side numpad  
        - Keyboard with side numpad  
        - Keyboard with only numpad  
**2.  Shuffle on key press**  
**3.  Mask on key press**

## Usage
- Template Forms
```html
<!-- Two way binding with property in which you want to store value -->
<input type="text" name="enterhere"
       [(ngModel)] = "inputString"
       [(appVirtualKeyboard)] = "inputString"
       [isKeyboardDirectiveActive] = "true" [kboardType]="'alphaNumericType2'">
```
- Reactive Forms
```html
<div class="setKeyBoardWidth">
  <input type="text" name="reactiveControl" [formControl]="reactiveControl" [appVirtualKeyboard]="''"
    (appVirtualKeyboardChange)="valueChange($event)" [isKeyboardDirectiveActive]="true"
    [kboardType]="'alphaNumericType2'">
</div>
```
```ts
 reactiveControl = new FormControl('');
 // Read value from event and set in formControl
   valueChange(e: string) {
    console.log(e);
    this.reactiveControl.setValue(e);
  }
```
### Properties:
- **ngModel** : For binding. Use ngModel or formControl  
- **appVirtualKeyboard**: inital value in case you have any to be prefilled when keyboard is triggered. For template forms use two binding with property. For reactive forms split initial input value and change output emitter as shown in example.  
- **isKeyboardDirectiveActive**: is angular virtual keyboard is active or not  
- **kboardType** : Currently 3 types are supported 
    'alphaNumericType1' - No side num pad (this is default layout) 
    'alphaNumericType2' - With side numpad
    'numeric' - Only Numpad  

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)