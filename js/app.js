var app = (function() {

  var auth;

  var showAlert = function() {
    console.log('show alert');
    var fn, args = arguments;
    if (navigator && navigator.notification && navigator.notification.alert) {
      fn = navigator.notification.alert(msg);
    } else if (typeof alert === "function") {
      fn = alert;
    } else {
      fn = console.log;
    }
    fn.apply(null, args);
  }

  function init() {
    document.addEventListener('deviceready', function() {
      console.log('device ready');
      // FirebaseSimpleLogin demo instantiation
      var firebaseRef = new Firebase('https://demos.firebaseio.com');
      auth = new FirebaseSimpleLogin(firebaseRef, function(error, user) {
        if (error) {
          // an error occurred while attempting login
          var message = 'An error occurred.';
          showAlert(message, function(){}, 'Failure!', 'Close');

        } else if (user) {
          // user authenticated with Firebase
          var message = 'User ID: ' + user.id + ', Provider: ' + user.provider;
          showAlert(message, function(){}, 'Success!', 'Close');

          // Log out so we can log in again with a different provider.
          auth.logout();

        } else {
          // user is logged out
        }
      });
    }, false);
  }

  function login(provider) {
    if (auth) {
      auth.login(provider);  
    }
  }

  return {
    init: init,
    login: login
  };
})();
