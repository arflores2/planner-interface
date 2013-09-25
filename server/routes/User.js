module.exports = function(User) {

  function login(req, res) {
    console.log('login request');

    var credentials = {
      email: req.param('email', null),
      password: req.param('password', null)
    };

    if(credentials.email === null || credentials.email.length < 1 || credentials.password === null || credentials.password.length < 1) {
      res.redirect('/login');
      return;
    }

    User.login(credentials, function(err, doc) {
      if(err ) {
        console.log('server error during login', err, doc);
        res.send(500, {redirect: '/welcome'});
      } 
      else if(doc === null) {
        console.log('invalid credentials', err, doc);
        res.send(401, {redirect: '/welcome'});
      }
      else {
        req.session.loggedIn = true;
        req.session.user = doc;
        res.send(200, {redirect: '/home'});
      }
    })  
  }

  function logout(req, res) {
    req.session.loggedIn = false;
    req.session.user = false;
    res.redirect('/');
  }

  function register(req, res) {
    var user = {
      email: req.param('email', null),
      firstname: req.param('firstname', null),
      lastname: req.param('lastname', null),
      role: req.param('role', null),
      password: req.param('password', null)
    };

    if(user.email === null || user.password === null) {
      res.send(400);
      return;
    }

    User.register(user, function(err) {
      if(err) {
        res.send(500, err);
      }
      else {
        res.redirect('/');
      }
    }); 
  }

  return {
    login: login,
    logout: logout,
    register: register
  };

}
