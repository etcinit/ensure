![Logo](http://assets.chromabits.com/ensure/logo.png)

# Ensure.js

A simple library for checking types in Javascript + extras

## Usage

Ensure is available as a global variable (or a module on Node):

__ensure(object, type, soft = false)__

- __object:__ Is the object you are checking
- __type:__ Is the type you are expecting It can be any "class" in JavaScript, such as `String`, `Error`, or `Boolean`.
- __soft:__ If set to true, ensure won't throw an error when the type does not match

For most objects, Ensure will do a simple `instanceof` check. However, some built-in objects (String, Number, Boolean)
are trickier to check so the library will do some custom checking functions for these.

To check if a variable is a string:

```js
var hello = 'Hello World';

ensure(hello, String, true);
>> true

var notString = 1337;

ensure(notString, String, true);
>> false
```

The previous example is using the "soft mode", which means that ensure won't throw an Error
when a type does not match, instead it will return a boolean value.

On the default mode:

```js
var hello = 'Hello World';

ensure(hello, String);
>> undefined

ensure(90210, String);
>> TypeException: Invalid type: Expected String
```

## On the browser

1.- Install using [Bower](http://bower.io):

```
bower install ensure.js
```

2.- Include the JS file on your project:

```html
<script src="bower_components/ensure.js/ensure.js"></script>
```
3.- Use it!

```js
console.log(ensure('It works!', String));
```

## On Node.js

1.- Install using npm:

```
npm install ensure.js
```

2.- Include the library in your project:

```js
var ensure = require('ensure.js');
```

3.- Use it!

```js
console.log(ensure('It works!', String));
```

## Supported types:

+ String
+ Number
+ Boolean
+ Array
+ (Any object)

## Extras:

__isIn(object, array)__
Check if object is in an array:
```js
ensure.isIn(object, array);
```

__isInRange(object, min, max)__
Check if a number is within a range:
```js
ensure.isInRange(object, min, max);
```

Example:

```js
var hello = 'Hello';

ensure.isInRange(hello.length, 0, 3);
>> false

ensure.isInRange(hello.length, 0, 6);
>> true
```

__isPositiveNumber(object)__
Check if a number is positive:
```js
ensure.isPositiveNumber(object);
```

and a few more, just take a look at the source