const auth = {};

auth.setToken = function(token) {
  localStorage.setItem('token', token);
};

auth.getToken = function() {
  return localStorage.getItem('token');
};

auth.isLoggedIn = function() {
  return !!this.getToken();
};

auth.getPayload = function() {
  const token = this.getToken();
  if (token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
};

auth.logout = function() {
  localStorage.removeItem('token');
};

export default auth;
