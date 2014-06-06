# Ensure.js

A simple library for checking types in Javascript + extras

## Usage

To check if a variable is a string:

```js
var hello = 'Hello World';

ensure(hello, String, true);
>> true
```

The previous example is using the "soft mode", which means that ensure won't throw an Error
when a type does not match, instead it will return a boolean value.

On the default mode:

```js
var hello = 'Hello World';

ensure(hello, String);
>> TypeException: Invalid type: Expected String
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

ensure.isInRange(hello.length,0,3);
>> false

ensure.isInRange(hello.length,0,6);
>> true
```

__isPositiveNumber(object)__
Check if a number is positive:
```js
ensure.isPositiveNumber(object);
```
