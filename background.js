'use strict';

const prefs = {
  'enabled': false,
  'overwrite-origin': true,
  'overwrite-methods': true,
  'methods': ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH']
};

const cors = {};
cors.onHeadersReceived = ({responseHeaders}) => {
  if (
    prefs['overwrite-origin'] === true ||
    responseHeaders.find(({name}) => name.toLowerCase() === 'access-control-allow-origin') === undefined
  ) {
    responseHeaders.push({
      'name': 'Access-Control-Allow-Origin',
      'value': '*'
    });
  }
  if (
    prefs['overwrite-methods'] === true ||
    responseHeaders.find(({name}) => name.toLowerCase() === 'access-control-allow-methods') === undefined
  ) {
    responseHeaders.push({
      'name': 'Access-Control-Allow-Origin',
      'value': '*'
    });
    responseHeaders.push({
      'name': 'Access-Control-Allow-Methods',
      'value': prefs.methods.join(', ')
    });
  }

  return {responseHeaders};
};
