module.exports = {
    'secret' :  '',
    
    'federation' : {
      'naver' : {
        'client_id' : '',
        'secret_id' : '',
        'callback_url' : '/auth/login/naver/callback'
      },
      'facebook' : {
        'client_id' : '1973399842803660',
        'secret_id' : '9de714121fd078539ddac4d70be0de9f',
        'callback_url' : 'http://localhost:5000/auth/login/facebook/callback/'
      },
      'kakao' : { 
        'client_id' : '',
        'callback_url' : '/auth/login/kakao/callback'
      },
      'google' : { 
        'client_id' : '467774827392-u76hb0j1nrk90c744tns6rd6c7clr9cp.apps.googleusercontent.com',
        'secret_id' : 'wD-VsU8BZDWB4bonsNqVhdnV',
        'callback_url' : '/auth/login/google/callback'
      }
    }
  };