module.exports = {
    'secret' :  'OJ9qH6mElA',
    
    'federation' : {
      'naver' : {
        'client_id' : 'C3ibnS2NkJuxneW74og7',
        'secret_id' : 'ODS6sgfToU',
        'callback_url' : 'http://localhost:5000/auth/login/naver/callback/'
      },
      'facebook' : {
        'client_id' : '1973399842803660',
        'secret_id' : '9de714121fd078539ddac4d70be0de9f',
        'callback_url' : 'http://localhost:5000/auth/login/facebook/callback/'
      },
      'kakao' : { 
        'client_id' : '47137eb4992ac6771d0302cd2e0dd87c',
        'callback_url' : 'http://localhost:5000/auth/login/kakao/callback'
      },
      'google' : { 
        'client_id' : '467774827392-jchg2shfoglvl5hebb8u0drpgfipsg5c.apps.googleusercontent.com',
        'secret_id' : 'p2-SIZiIQkdeKSqN5b4Wh0id',
        'callback_url' : 'http://localhost:5000/auth/login/google/callback'
      }
    }
  };