

<a name="top"/>

<details>
  
  * [Variable and Component rule](#Variable-and-Component-rule)
    * [Case styles](#Case-styles)
    * [Naming folders](#Naming-folders)
    * [Variable declaration](#Variable-declaration)
    * [Variable naming conventions](#Variable-naming-conventions)
  * [Variable scss rule](#Variable-scss-rule)
    * [BEM](#BEM)
    * [Grouped-by-type](#Grouped-by-type)
</details>

 ## Rules for naming, creating a Component
 1. Styles : **PascalCase**, Ex: **ProductList**, **MainMenu**, . . .
 2. Use **React Memo** to crease Component
 3. Each Component must have **propTypes** to ```define and manage the props passed to Component```
 
 How to create: use command prompt syntax ```rmcp``` (In extension **ES7+ React/Redux/React-Native snippets**) to generate!
 
 ```rmcp```: Create a React Memo Function Component with ES7 module system with PropTypes  
 
 Example of **React Memo** and **propTypes**:
 
 ![image](https://user-images.githubusercontent.com/62045359/152634546-80ce75aa-3380-475a-ac2a-b5edd148bd5a.png)


 ## Rules for naming, creating a Function
 1. Styles : **camelCase**, Functions that directly handle logic must have the word **handle...** in front! 
    Ex: **handleFilterProductList**, **handleCalculate**, . . .
 2. All Functions must be created as hook **useCallback()**

![image](https://user-images.githubusercontent.com/62045359/152634305-b511a817-6af5-40e9-87a9-9452aff6baac.png)



<a name="Variable-and-Component-rule"/>

# Variable and Component rule :white_check_mark: 


<a name="Case-styles"/>

## Case styles
| #           |      Style    |    Used for   |    Example    |
|-------------|---------------|---------------|---------------|
|  1 |    **PascalCase**  | identifier (**Component** or **Class**) | ex: ProductList, Sidebar, Menu
|  2 |    **camelCase**  | identifier (let name, func name) | ex: let **student**, const **studentList**
|  3 |    **UPPER_CASE**  | constants | ex: const **PI = 3.14**, const **API_URL = "/api/..."**|



<a name="Naming-folders"/>

## Naming folders

```diff 
! Folder name must be lowercase
```

<a name="Variable-declaration"/>

## Variable declaration
> TIP: Always use ```const``` until needed ```let``` (since ES6)


<a name="Variable-naming-conventions"/>

## Variable naming conventions

BAD  :x:
```js
const sanPham = "Iphone"        // BAD  => use english
const product = "Iphong 10"     // BAD  => use for object, ex: const product = {. . .}
```
GOOD ??????
```js
const productName = "Iphone"    
const product = {
  name:"Iphong 10",
  status: true
}                               
```
```js
// prefix : is..., has..., show... for true/flase ariables
let isSelected = false
let show = false
let hasValidItem = true

// plural noun 
const students = [].map(student => console.log(student.name)    // NOT GOOD
const studentList = [].map(student => console.log(student.name) // GOOD
```

<p align="right"> <a  href="#top">Back to top</a> </p>

<a name="Variable-scss-rule"/>

# Variable scss rule :white_check_mark: 
![image](https://user-images.githubusercontent.com/62045359/151298857-dff00240-11d0-4506-ab3b-770543782535.png)

<a name="BEM"/>

## 1. BEM
syntax: BEM ```Block``` ```Element``` ```Modifier```

```css
 .block
 .block__element
 
 .block--modifier
 .block__element--modifier
```

BAD  :x:
```html
<div className="card">
  <h3 className="heading">Save!</h3>
  <p className="desc">looks like you got a great idea.</p>
  <div className="btn">Ok, cool</div>
</div>
```
GOOD ??????
```html
<!--BEM-->
<!--Block:      "card" -->
<!--Element:    "card__heading", "card__desc", "card__btn" -->
<!--Modifier:   "card--success", "card--error" -->

<div className="card card--success">
  <h3 className="card__heading"> Save! </h3>
  <p className="card__desc"> looks like you got a great idea. </p>
  <div className="card__btn"> Ok, cool </div>
</div>

<div className="card card--error">
  <h3 className="card__heading"> Save! </h3>
  <p className="card__desc"> looks like you got a great idea. </p>
  <div className="card__btn"> Ok, cool </div>
</div>
```

<a name="Grouped-by-type"/>

 <p align="right"> <a  href="#top">Back to top</a> </p>

## 2. SCSS (Grouped by type)

BAD  :x:
```css
 .selector {
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;
  background: #000;
  color: #fff
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;
  cursor: pointer;
}
```
GOOD ??????
```css
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff
  
  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```


 <p align="right"> <a  href="#top">Back to top</a> </p>
