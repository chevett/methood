methood [![Build Status](https://travis-ci.org/chevett/methood.png)](https://travis-ci.org/chevett/methood)
=========

create methods the bad way.


```js
var methood = require('methood');

function Dog(){
	var method = methood(this);

	method('bark', function(){
		console.log('ugh whatever');
	});
}
```

