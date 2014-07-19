methood [![Build Status](https://travis-ci.org/chevett/methood.png)](https://travis-ci.org/chevett/methood)
=========

create methods the bad way.


```js
var methood = require('methood');

function Dog(){
	var method = methood(this);

	method('speak', 'bark');
	method('bark', function(){
		console.log('ugh whatever');
	});
	
	method(['fetch', 'getitnow'], function(){
		console.log('ugh whatever');
	});
}

var captainSnuggles = new Dog();
captainSnuggles.speak();
captainSnuggles.bark();
captainSnuggles.fetch();
captainSnuggles.getitnow();
```

