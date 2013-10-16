/*global jQuery:false */

'use strict';

var pageUrlProtocol = jQuery.url().attr('protocol');

if ((window.location.href).indexOf('localhost') > 0) {
  angular.module('recyclefunWebApp').value('appConfig', {
    /*
     | -------------------------------------------------------------------
     | DEVELOPEMENT ENVIRONMENT SETTINGS
     | -------------------------------------------------------------------
     */
    appName: 'RecycleIT (Development)',
    url: {
      //api: pageUrlProtocol + '://' + 'api.recyclefun.localhost/'
      api: pageUrlProtocol + '://' + 'recyclefun-api.ap01.aws.af.cm/'
    },
    facebook: {
      appId: '516418235114060', // App ID
      channelUrl: '/channel.html', // Channel File
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true, // parse XFBML
      permissions: 'read_stream, publish_stream, email, read_friendlists'
    }
  });
} else {
  angular.module('recyclefunWebApp').value('appConfig', {
    /*
     | -------------------------------------------------------------------
     | Production ENVIRONMENT SETTINGS
     | -------------------------------------------------------------------
     */
    appName: 'RecycleIT',
    url: {
      api: pageUrlProtocol + '://' + 'recyclefun-api-php.azurewebsites.net/'
      //api: pageUrlProtocol + '://' + 'recyclefun-api.ap01.aws.af.cm/'
    },
    facebook: {
      appId: '637970952903072', // App ID
      channelUrl: '/channel.html', // Channel File
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true, // parse XFBML
      permissions: 'read_stream, publish_stream, email, read_friendlists'
    }
  });
}
