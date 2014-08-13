/*global jasmine, describe, it, beforeEach, afterEach */

var WebSocket = require('../index').Client;
var EventTarget = require('../lib/event-target');


describe('WebSocket class test', function() {

    it('Should be a "class"', function () {
        expect(typeof WebSocket).toBe('function');
    });

});

describe('WebSocket instance test', function () {
    var webSocket;

    // connect before each test
    beforeEach(function (done) {
        webSocket = new WebSocket('wss://example.com/');

        webSocket.addEventListener('open', done);
    });

    // disconnect after each test
    afterEach(function (done) {
    	webSocket.close();

        webSocket.addEventListener('close', done);

        webSocket = null;
    });

    
    it('Should be an instance and have a lot of public methods', function () {
        expect(webSocket instanceof WebSocket).toBeTruthy();
        expect(webSocket instanceof EventTarget).toBeTruthy();
        expect(typeof webSocket).toBe('object');
        
        expect(typeof webSocket.send).toBe('function');
        expect(typeof webSocket.close).toBe('function');

        // inherited by EventTarget
        expect(typeof webSocket.addEventListener).toBe('function');
        expect(typeof webSocket.removeEventListener).toBe('function');
        expect(typeof webSocket.dispatchEvent).toBe('function');
    });

    it('Should be an instance and have a lot of public properties', function () {
        expect(webSocket.url).toBeDefined();
    	expect(webSocket.readyState).toBeDefined();
    	expect(webSocket.protocol).toBeDefined();
    });

    it('Should have constants', function() {
    	expect(webSocket.OPEN).toBeDefined();
    	expect(webSocket.CONNECTING).toBeDefined();
    	expect(webSocket.CLOSED).toBeDefined();
    	expect(webSocket.CLOSING).toBeDefined();
    });

});


describe('WebSocket connecting', function () {
    var webSocket;
    var openHandler;

    // connect before each test
    beforeEach(function (done) {
        openHandler = jasmine.createSpy('openHandler');

        webSocket = new WebSocket('wss://example.com/ws');

        webSocket.addEventListener('open', openHandler.and.callFake(done));
    });

    // disconnect after each test
    afterEach(function (done) {
        webSocket.close();

        webSocket.addEventListener('close', done);

        webSocket = null;
    });


    it('Should emit `open` event on connect', function() {
        expect(openHandler.calls.any()).toBeTruthy();
    });

    it('Should emit exactly one `open` event on connect', function() {
        expect(openHandler.calls.count()).toEqual(1);
    });

});


describe('WebSocket disconnecting', function () {
    var webSocket;
    var closeHandler;


    beforeEach(function (done) {
        closeHandler = jasmine.createSpy('closeHandler');

        webSocket = new WebSocket('wss://example.com/ws');

        webSocket.addEventListener('open', function() {
        	webSocket.addEventListener('close', closeHandler.and.callFake(done));

        	webSocket.close();
        });
    });

    afterEach(function () {
        webSocket = null;
    });


    it('Should emit `close` event on disconnect', function() {
        expect(closeHandler.calls.any()).toBeTruthy();
    });

    it('Should emit exactly one `close` event on disconnect', function() {
        expect(closeHandler.calls.count()).toEqual(1);
    });

});