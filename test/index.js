import chai from 'chai'
var should = chai.should()

import Container from 'container'

function provide (value) {
	return function provider () {
		return value
	}
}

describe('Container', function () {
	var app
	beforeEach(function () {
		app = new Container()
	})

	describe('#invoke(provider)', function () {
		it('should execute a provider with the container as first param', function () {
			app.invoke(function (container) {
				container.should.be.equal(app)
			})
		})
	})

	describe('#has(name)', function () {
		it('should returns true when service is defined', function () {
			app.set('', provide(null))
			app.has('').should.be.true
		})

		it('should returns false when service is not defined', function () {
			app.has('').should.be.false
		})
	})

	describe('#set(name, provider)', function () {
		it('should add or update a service', function () {
			app.set('', provide('hello'))
			app.get('').should.be.equal('hello')
		})


		it('should throw an error when trying to update a resolved service', function () {
			app.set('', provide(null))
			app.get('')

			;(function () {
				app.set('', provide(0))
			})
		})

		it('should returns container', function () {
			app.set('', provide(null)).should.be.equal(app)
		})
	})

	describe('#get(name)', function () {
		it('should returns service value', function () {
			app.set('', provide('hello'))
			app.get('').should.be.equal('hello')
		})

		it('should throw when service is not defined', function () {
			(function () {
				app.get('')
			}).should.throw
		})

		it('should throw when a circular dependency is detected', function () {
			app.set('a', function (container) {
				container.get('b')
			})

			app.set('b', function (container) {
				container.get('a')
			})

			;(function () {
				app.get('a')
			}).should.throw
		})
	})
})
