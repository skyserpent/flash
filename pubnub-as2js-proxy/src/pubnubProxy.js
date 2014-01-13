"use strict";

function PubnubProxy() {
    this.delegate(config().methods_to_delegate);
    this.flashObject = null;
    this.flashObjectId = 'pubnubFlashObject';
    this.instances = {};
}

PubnubProxy.prototype.setFlashObjectId = function (flashObjectId) {
    if (!isString(flashObjectId)) {throw new TypeError('flashObjectId argument should be a string')}
    this.flashObjectId = flashObjectId;
};

/**
 * Returns flash object.
 *
 * @returns {HTMLElement}
 */
PubnubProxy.prototype.getFlashObject = function () {
    if (this.flashObject === null) {
        this.flashObject = document.getElementById(this.flashObjectId);
    }

    return this.flashObject;
};

/**
 * Delegate method.
 * Dynamically creates methods that will be available for direct call from ActionScript.
 *
 * @param {Array} methods to delegate
 */
PubnubProxy.prototype.delegate = function (methods) {
    if (!isArray(methods)) {throw new TypeError('delegate method accepts only methods array')}

    var _proxy = this,
        methodsLength = methods.length,
        i;

    for (i = 0; i < methodsLength; i++) {
        this[methods[i]] = function (method) {
            return function (instanceId, args) {
                _proxy.delegatedMethod.call(_proxy, instanceId, method, args);
            };
        }(methods[i])
    }
};

/**
 *
 * @param {String} instanceId
 * @param {String} method
 * @param {Array} args
 */
PubnubProxy.prototype.delegatedMethod = function (instanceId, method, args) {
    this.getInstance(instanceId).applyMethod(method, args);
};

/**
 * Create new wrapper instance with included pubnub object.
 * This method can be called directly from ActionScript.
 *
 * @param {String} instanceId
 * @param {Object} setup
 * @param {Boolean} [secure]
 */
PubnubProxy.prototype.createInstance = function (instanceId, setup, secure) {
    if (!isString(instanceId)) {throw new TypeError('instanceId argument should be a string')}
    if (instanceId in this.instances) {
        this.proxyError('instance with id ' + instanceId + ' already exists');
    }

    var flashObject = this.getFlashObject();
    setup = setup || false;

    this.instances[instanceId] = new Wrapper(instanceId, flashObject, setup, secure);
    flashObject.created(instanceId);
};

PubnubProxy.prototype.getInstance = function (instanceId) {
    if (!(instanceId in this.instances)) {
        this.proxyError('instance with id ' + instanceId + ' is not present')
    }

    return this.instances[instanceId];
};

PubnubProxy.prototype.get_uuid = function (instanceId, callbackId) {
    var instance = this.getInstance(instanceId);

    instance.applyCallback(callbackId, [instance.pubnub.get_uuid()])
};

PubnubProxy.prototype.uuid = function (instanceId, callbackId) {
    var instance = this.getInstance(instanceId);

    instance.applyCallback(callbackId, [instance.pubnub.uuid()])
};

PubnubProxy.prototype.proxyError = function (message) {
    this.getFlashObject().error(message);
};