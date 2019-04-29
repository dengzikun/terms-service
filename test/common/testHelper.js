/**
 * This file defines helper methods
 */

const request = require('superagent')
const should = require('should')

/**
 * Set request Headers
 */
function setheaders (req, token) {
  if (token) {
    req.set('Authorization', `Bearer ${token}`)
  }
  return req
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
}

/**
 * Uses superagent to proxy get request
 * @param {String} url the url
 * @param {String} token the token
 * @returns {Object} the response
 */
async function getRequest (url, token) {
  return setheaders(request.get(url), token)
}

/**
 * Uses superagent to proxy post request
 * @param {String} url the url
 * @param {Object} body the request body
 * @param {String} token the token
 * @returns {Object} the response
 */
async function postRequest (url, body, token) {
  if (body) {
    return setheaders(request.post(url).send(body), token)
  } else {
    return setheaders(request.post(url), token)
  }
}

let errorLogs
let warnLogs
let infoLogs

/**
 * Initialize the errorLogs
 */
function initErrorLogs (logs) {
  errorLogs = logs
}

/**
 * Initialize the warnLogs
 */
function initWarnLogs (logs) {
  warnLogs = logs
}

/**
 * Initialize the infoLogs
 */
function initInfoLogs (logs) {
  infoLogs = logs
}

/**
 * Assert Joi validation error
 * @param err the error
 * @param message the message
 */
function assertValidationError (err, message) {
  err.isJoi.should.be.true()
  should.equal(err.name, 'ValidationError')
  err.details.map(x => x.message).should.containEql(message)
  errorLogs.should.not.be.empty()
  errorLogs.should.containEql(err.stack)
}

/**
 * Assert error which is not thrown by Joi
 * @param err the error
 * @param message the message
 */
function assertError (err, message) {
  should.equal(err.message, message)
  errorLogs.should.not.be.empty()
  errorLogs.should.containEql(err.stack)
}

/**
 * Assert error message
 * @param message the message
 */
function assertErrorMessage (message) {
  errorLogs.should.containEql(message)
}

/**
 * Assert error message
 * @param message the message
 */
function assertWarnMessage (message) {
  warnLogs.should.containEql(message)
}

/**
 * Assert error message
 * @param message the message
 */
function assertInfoMessage (message) {
  infoLogs.should.containEql(message)
}

module.exports = {
  getRequest,
  postRequest,
  assertError,
  assertValidationError,
  initErrorLogs,
  initWarnLogs,
  initInfoLogs,
  assertErrorMessage,
  assertWarnMessage,
  assertInfoMessage
}
