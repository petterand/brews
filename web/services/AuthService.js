import Vue from 'vue';

const AuthService = {
   authenticate: authenticate,
   isAuthenticated: isAuthenticated,
   logout: logout
}

export default AuthService;


function authenticate(creds) {
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/login', creds).then((response) => {
         if (response.body.status === 'loggedin') {
            resolve(response.body.user);
         } else {
            reject();
         }
      }, (err) => {
         reject();
      })
   })
}

function logout(creds) {
   return new Promise((resolve, reject) => {
      Vue.http.post('/api/signout', creds).then((response) => {
         resolve(response.body);
      }, (err) => {
         reject();
      })
   })
}

function isAuthenticated() {
   return new Promise((resolve, reject) => {
      Vue.http.get('/api/isAuthenticated').then((response) => {
         resolve(response.body);
      });
   })
}