![Logo](http://assets.chromabits.com/ensure/logo.png)

# Ensure.js [![Build Status](https://drone.io/github.com/eduard44/ensure/status.png)](https://drone.io/github.com/eduard44/ensure/latest)

A simple library for checking types in Javascript + extras

[![NPM](https://nodei.co/npm/ensure.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ensure.js/)

## Changes

### 0.5.2

- Added ensure.one()

### 0.5.1

- Nullable types: It is now possible to type check a type or a null value
- Nothing type (alias of undefined): You can now type check `undefined`, which is mostly useless. However, on function shields, Nothing is used to specify when a function doesn't return a value
- 100% test coverage

### 0.5.0

- Shield (Beta): Protect functions by adding a wrapper that checks function parameters and return values
- Documentation ([Online Version](http://assets.chromabits.com/ensure/docs/))
- Enforcenment is now optional with `ensure.enforce`. Production code can skip type checks and run faster.
- [Breaking] __has()__ no longer throws exceptions by default, it behaves like __ensure()__ now with a `soft` parameter

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

## Record Types

Languages like C++, Hack and Haskell have nice syntax for data types that hold
information. You might know them as Structs or Records. Ensure.js provides an
emulation of this format. I say emulation because it is not analyzed
statically and might have some behavior differences. However, it can be useful
for adding some validation to certain objects in your application. Instead of
blindly assuming that a certain variable of an object is of a certain type
you can use Ensure Records which automatically perform these checks for you.

Please note that if performance is important, it is always faster to just use
regular objects.

__EnsureRecord(spec)__

*spec*:
The spec is an object specifying the types of each variable in the record, where
the key is the name of the property and the value the type to expect.

__EnsureRecordType(values)__

*values*:
The values being applied to the instance being instantiated. Will throw an error if
the types do not match the spec

### Example:

```js
var ensure = require('ensure'),
    EnsureRecord = ensure.EnsureRecord;

// First, we create our person type
var Person = new EnsureRecord({
        firstName: String,
        lastName: String,
        age: Number
    });

// Then we create an instance by providing its values
var bob = new Person({
        firstName: "Bob",
        lastName: "Lulz",
        age: 20
    });

console.log(bob.firstName)
>>> "Bob"

// Note that if we try to brake the spec, we get an error
var alex = new Person({
        firstName: "Bob",
        lastName: "Lulz",
        age: "Old"
    });
>>> [TypeException]

// Same with setters:
bob.name = [1, 5, 7];
>>> [TypeException]
```

## Shields

Version 0.5.0 now comes with a factory function called Shield (ensure.shield), which allows you to add a simple wrapper around your function that will type check your arguments and your return values automatically for you:

```js
// First we create our shielded function
var myShieldFunction = ensure.shield([Boolean, Array], Number, function (arg1, arg2) {
    if (arg1) {
        return {};
    }

    return 1337;
});

// This works fine
myShieldFunction(false, []);

// This throws an error
myShieldFunction([], []);

// This also throws an error since the return value is not a number
myShieldFunction(true, []);
```

## Nothing

Sometimes shielded functions do not return a value, in these cases we use `Nothing` which is an alias for `undefined`:

```js
var Nothing = ensure.Nothing,

    myVal,
    myShieldFunction;
    
myShieldFunction = ensure.shield([Boolean, Array], Nothing, function (arg1, arg2) {
    myVal = arg2.length;
});
```

## Nullable

Nullable allows the type check input to be `null` or the type we are expecting:

```js
var Nullable = ensure.Nullable;

// We can also allow a variable to be null
ensure(null, Nullable(String), true);
>> true

ensure([], Nullable(String), true);
>> false
```

You can also use NullableInstances in your code:

```js
var Nullable = ensure.Nullable,
    NullableInstance = ensure.NullableInstance,

    SomeNullableArray = new NullableInstance(Array, []);
	
// Check if it is null
SomeNullableArray.isNull();
>> false

// This works fine
SomeNullableArray.setValue(null);

// Check if it is null again
SomeNullableArray.isNull();
>> true

// They can also be type checked
ensure(SomeNullableArray, Nullable(Array), true);
>> true

// This does not
SomeNullableArray.setValue('hello');
```

## Other Extras:

__require(object)__
Throw an error if `object` is undefined, null or an empty string:
```js
var hello;

ensure.require(hello);
>> [Error]

hello = '';

ensure.require(hello);
>> [Error]

hello = 'Hello World';

ensure.require(hello); // This shouldn't do anything (which is good)
>> undefined
```

__requireIsNewThis(constructor, context)__
Throw an error if a constructor is called without `new`

Useful for preventing development mistakes

```js
var myObject = function () {
    ensure.requireIsNewThis(myObject, this);
};

var instance = new newObject(); // This should just create the instance normally
>> undefined

var instance = newObject(); // An error is thrown, new is missing
>> [Error]
```

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

and a few more, take a look at the docs

## Development

To hack on Ensure.js, you need Node.js 0.10+. To setup a dev environment, run the following:

1.- Install grunt:
`npm install -g grunt`

2.- Clone repo:
`git clone git@github.com:eduard44/ensure.git`

3.- cd to repo:
`cd ensure`

4.- Install dependencies for development:
`npm install` (in the project root)

5.- Start grunt in watch mode:
`grunt`. This will continuously rebuild ensure.js on every change in `/src`

6.- You can run tests with:
`npm test`

7.- You can check code coverage with:
`grunt coverage`

8.- You can compile documentation with:
`grunt jsdoc`