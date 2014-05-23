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

		names.forEach(function(name){
			self[name] = fn;
		});
	};
};

module.exports = methood;
