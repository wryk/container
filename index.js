module.exports = Container

/**
 * Simple Inversion of Control (IoC) container
 * @class
**/
function Container () {
	if (!(this instanceof Container)) return new Container()

	this._services = {}
}

/**
 * @param {Function} provider
 * @return {*}
**/
Container.prototype.invoke = function (provider) {
	return provider(this)
}

/**
 * @param {String} name
 * @return {Boolean}
**/
Container.prototype.has = function (name) {
	return this._services.hasOwnProperty(name)
}

/**
* @param {String} name
* @param {Function} provider
* @return {Container}
**/
Container.prototype.set = function (name, provider) {
	if (this.has(name)) {
		var service = this._services[name]

		if (service.resolved) throw new Error(name + ' is resolved')

		service.provider = provider
		service.resolved = false
	} else {
		this._services[name] = {
			provider: provider,
			resolving: false,
			resolved: false
		}
	}

	return this
}

/**
 * @param {String} name
 * @return {*}
**/
Container.prototype.get = function (name) {
	if (!this.has(name)) throw new Error(name + ' is not defined')

	var service = this._services[name]

	if (service.resolving) throw new Error('Circular dependency between ' + name + ' and ' + this._name)
	this._name = name

	service.resolving = true
	var value = this.invoke(service.provider)
	service.resolved = true
	service.resolving = false

	return value
}
