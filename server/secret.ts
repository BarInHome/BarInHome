module.exports = {
    'secret' :  'OJ9qH6mElA',
    
    'federation' : {
      'naver' : {
        'client_id' : 'kigB4P8zpsIhtPl5qSJl',
        'secret_id' : 'yEIvLVbir_',
        'callback_url' : 'http://localhost:5000/auth/login/naver/callback'
      },
      'facebook' : {
        'client_id' : '599964347345827',
        'secret_id' : '7391265785241f0f958f2cc8522025ce',
        'callback_url' : 'http://localhost:5000/auth/login/facebook/callback'
      },
      'kakao' : { 
        'client_id' : 'bc59baecce1de74228a4b5d7196ac6ee',
        'callback_url' : 'http://localhost:5000/auth/login/kakao/callback'
      },
      'google' : { 
        'client_id' : '1002322397342-ahg3ai2u9973l52bvh4cc4ef0bgtsp3q.apps.googleusercontent.com',
        'secret_id' : 'DxxUBXMLmSfm4QY6RkjoCm-5',
        'callback_url' : 'http://localhost:5000/auth/login/google/callback'
      }
    },

    'admin' : {
      id: 'admin',
      pw: 'admin',
      roles: 'Admin',
    }
  };