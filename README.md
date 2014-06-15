![Logo](http://assets.chromabits.com/ensure/logo.png)

# Ensure.js

A simple library for checking types in Javascript + extras

## Usage

Ensure is available as a global variable (or a module on Node):

__ensure.is(object, type, soft = false)__

- __object:__ Is the object you are checking
- __type:__ Is the type you are expecting It can be any "class" in JavaScript, such as `String`, `Error`, or `Boolean`.
- __soft:__ If set to true, ensure won't throw an error when the type does not match

For most objects, Ensure will do a simple `instanceof` check. However, some built-in objects (String, Number, Boolean)
are trickier to check so the library will do some custom checking functions for these.

To check if a variable is a string:

```js
var hello = 'Hello World';

ensure.is(hello, String, true);
>> true

var notString = 1337;

ensure.is(notString, String, true);
>> false
```

The previous example is using the "soft mode", which means that ensure won't throw an Error
when a type does not match, instead it will return a boolean value.

On the default mode:

```js
var hello = 'Hello World';

ensure.is(hello, String);
>> undefined

ensure.is(90210, String);
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
console.log(ensure.is('It works!', String));
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
console.log(ensure.is('It works!', String));
```

## Supported types:

+ String
+ Number
+ Boolean
+ Array
+ (Any object)

## Additional Methods:

__isEmpty(object)__
Returns true if `object` is undefined, null or an empty string:
```js
var hello;

ensure.isEmpty(hello);
>> true

hello = '';

ensure.isEmpty(hello);
>> true

hello = 'Hello World';

ensure.isEmpty(hello);
>> false
```

__isNewThis(constructor, context)__
Return false if a constructor is called without `new`

Useful for preventing development mistakes

```js
var myObject = function () {
    ensure.isNewThis(myObject, this);
};

var instance = new newObject(); // This should just create the instance normally
>> undefined

var instance = newObject(); // Returns false, new is missing
>> false
```

__isIn(object, array)__
Check if `object` is in an array:
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

__isBoolean(object)__
Check if `object` is a Boolean:
```js
ensure.isBoolean(object);
```

__isNumber(object)__
Check if `object` is a Number:
```js
ensure.isNumber(object);
```

__isString(object)__
Check if `object` is a String:
```js
ensure.isString(object);
```

__isArray(object)__
Check if `object` is an Array:
```js
ensure.isArray(object);
```

### Enforce:

Enforce has the same methods as ensure but throws an error instead of returning false.

__enforce.isEmpty(object)__
Throws an error if `object` is NOT undefined, null or an empty string:
```js
var hello;

enforce.isEmpty(hello); // This shouldn't do anything (which is good)
>> undefined

hello = '';

enforce.isEmpty(hello); // This shouldn't do anything
>> undefined

hello = 'Hello World';

enforce.isEmpty(hello);
>> [Error]
```

Also supports all of the additional methods listed above.

### not:

If you would like to check if an object is NOT a certain type you can use the not method.

__enforce.not.isString(object)__
Throws an error if `object` is of type String:
```js
var hello;

enforce.not.isString(hello); // This shouldn't do anything (which is good)
>> undefined

hello = 'Hello World';

enforce.not.isString(hello); 
>> [Error]
```

__ensure.not.isInRange(object, min, max)__
Check if a number is NOT within a range:
```js
ensure.not.isInRange(object, min, max);
```

Example:

```js
var hello = 'Hello';

ensure.not.isInRange(hello.length, 0, 3);
>> true

ensure.not.isInRange(hello.length, 0, 6);
>> false
```

Also supports all of the additional methods listed above.