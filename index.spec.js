var methood = require('./index.js');
var expect = require('chai').expect;


describe('methood', function(){
	it('should work like this normally', function(){
		function C(){
			var method = methood(this);
			method('hey', function(){ return 888; });
		}

		var instance = new C();
		expect(instance.hey()).to.be.equal(888);
	});

	it('should be able to create aliases with an array of names', function(){
		function C(){
			var method = methood(this);
			method(['hey', 'howdy'], function(){ return 888; });
		}

		var instance = new C();
		expect(instance.hey()).to.be.equal(888);
		expect(instance.howdy()).to.be.equal(888);
	});

	it('should be able to create aliases after the fact', function(){
		function C(){
			var method = methood(this);
			method('greetings', function(){ return 999; });
			method('yo', 'greetings');
			method('hola', 'greetings');
		}

		var instance = new C();
		expect(instance.yo()).to.be.equal(999);
		expect(instance.hola()).to.be.equal(999);
	});

	it('should be able to create aliases before the fact', function(){
		function C(){

			var method = methood(this);
			method('yo', 'greetings');
			method('hola', 'greetings');
			method('greetings', function(){ return 999; });
		}

		var instance = new C();
		expect(instance.yo()).to.be.equal(999);
		expect(instance.hola()).to.be.equal(999);
	});

	it('should default to a no-op', function(){
		function C(){

			var method = methood(this);
			method('yo');
		}

		var instance = new C();
		expect(instance.yo()).to.be.equal(undefined);
	});

	it('should get the arguments i pass it', function(){
		function C(){

			var method = methood(this);
			method('p', function(x, y, z){
				return [x, y, z];
			});
		}

		var instance = new C();
		expect(instance.p(81, 89, 87)).to.be.eql([81, 89, 87]);
	});
	it('should have the right self method', function(){
		function C(){

			var method = methood(this);
			method('p', function(){
				return this;
			});
		}

		var instance = new C();
		expect(instance.p()).to.be.eql(instance);
	});
	it('should allow overloading', function(){
		function C(){

			var method = methood(this);
			method('p', function(){ return 0; });
			method('p', function(a){ return 1; });
			method('p', function(a, b){ return 2; });

		}

		var instance = new C();
		expect(instance.p()).to.be.eql(0);
		expect(instance.p(777)).to.be.eql(1);
		expect(instance.p(777, 888)).to.be.eql(2);
	});
	it('should allow overloading and alaising at the same time', function(){
		function C(){

			var method = methood(this);
			method(['p', 'm'], function(){ return 0; });
			method(['p', 'm'], function(a){ return 1; });
			method(['p', 'm', 'nbd'], function(a, b){ return 2; });

		}

		var instance = new C();
		expect(instance.p()).to.be.equal(0);
		expect(instance.p(777)).to.be.equal(1);
		expect(instance.p(777, 888)).to.be.equal(2);

		expect(instance.m()).to.be.equal(0);
		expect(instance.m(777)).to.be.equal(1);
		expect(instance.m(777, 888)).to.be.equal(2);

		expect(instance.nbd(777, 888)).to.be.equal(2);
	});
});
