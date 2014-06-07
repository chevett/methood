var methood = function(self) {
	return function(names, fn){
		if (typeof names === 'string') names = [names];
		if (!Array.isArray(names)) throw new Error('cannot find a function name.');

		if (typeof fn === 'string') {
			fn = (function(){ 
				var otherFuncName = fn;
				return function(){
					return self[otherFuncName].apply(self, Array.prototype.slice.call(arguments));
				};
			})();
		}

		if (fn === undefined){
			fn = function(){};
		}

		if (typeof fn !== 'function'){
			throw new Error('you gave me bad second parameter...');
		}

		var oldFn = self[names[0]];

		var newFn = function(){
			if (fn.length === arguments.length){
				return fn.apply(self, arguments);
			} else {
				return oldFn.apply(self, arguments);
			}
		};

		names.forEach(function(name){
			self[name] = newFn;
		});
	};
};

module.exports = methood;
