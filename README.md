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

and a few more, just take a look at the source

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