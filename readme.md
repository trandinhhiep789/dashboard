# Variable and Component rule :white_check_mark: 



**Case styles**
| #           |      Style    |    Used for   |    Example    |
|-------------|---------------|---------------|---------------|
|  1 |    **PascalCase**  | identifier (**Component** or **Class**) | ex: ProductList, Sidebar, Menu
|  2 |    **camelCase**  | identifier (let name, func name) | ex: let **student**, const **studentList**
|  3 |    **UPPER_CASE**  | constants | ex: const **PI = 3.14**, const **API_URL = "/api/..."**|



**Variable Declaration**
> TIP: Always use ```const``` until needed ```let``` (since ES6)


**Variable Naming Conventions**

BAD  :x:
```js
const sanPham = "Iphone"        // BAD  => use english
const product = "Iphong 10"     // BAD  => use for object, ex: const product = {. . .}
```
GOOD ✔️
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

# Variable scss rule :white_check_mark: 
![image](https://user-images.githubusercontent.com/62045359/151298857-dff00240-11d0-4506-ab3b-770543782535.png)

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
GOOD ✔️
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
