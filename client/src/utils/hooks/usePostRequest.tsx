import React, { useCallback } from 'react';
import axios from '../axios';

const DEFAULT_ERROR_MESSAGE = '죄송합니다.. 오류가 발생했습니다..';
export interface UsePostRequestObject<T, P> {
    success: true | null;
    loading: boolean | undefined;
    error: string;
    doPostRequest: (param: T) => void;
    data: P | null;
    // setTokenHeader:()=>void;
  }

  export default function usePostRequest<PARAM_TYPE = {[key: string]: any}, RES_DATA_TYPE = any>(
  url: string,
  successCallback?: (param?:RES_DATA_TYPE) => void
): UsePostRequestObject<PARAM_TYPE, RES_DATA_TYPE> {
  const [success, setSuccess] = React.useState<true | null>(null);
  const [data, setData] = React.useState<RES_DATA_TYPE | null>(null);
  const [loading, setLoading] = React.useState<boolean | undefined>(undefined);
  const [error, setError] = React.useState('');
  const [refresh, setrefresh] = React.useState<string | null>(null);
  const [access, setaccess] = React.useState<string | null>(null);

  //로그인했다 그 뒤에 토큰을 넣는다
  const setTokenHeader = ()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    axios.defaults.headers.common['Refresh'] = `Bearer ${refresh}`;
    //로그인 이후에 토큰을 앞에 붙혀서 전송한다는 의미이다
    //추후에 data는 access 토큰만 들어가도록 바꾸어 주자
  }
  //로그인 할때 아예 이것도 받아서 콜백으로 넣어주자

  const doSilentRefresh = (param:PARAM_TYPE) => {
    axios.post('/refresh/silent')
      .then((res)=>{
        setaccess(res.headers('Authorization'));
        setrefresh(res.headers('Refresh'));
        setTokenHeader();
        doPostRequest(param);
      })
      .catch(error => {
          // ... 로그인 실패 처리
          //refresh에 널을 주자 login에서 null이면 예외처리 할 수 있게
      });
  }
//충분 step 1 access 만료되었을때 api 돌리는데 만료오류나면 
//쿠키에 저장해 놨던 refresh를 불러와서 doSilentRefresh하고 
//만약 refresh도 실패한다면 로그인 실패 처리 

  const doPostRequest = useCallback((param: PARAM_TYPE): void => { //param넣으면 void 나온다
    setLoading(true); // 로딩 시작
    // console.log('param',param);
    axios.post<RES_DATA_TYPE>(`${url}`,
      { ...param })
      .then((res) => { // 200 번대 상태코드
        console.log('res.data',res.data);
        setLoading(false); // 로딩 완료
        setData(res.data);
        setSuccess(true);
        setaccess(res.headers('Authorization'));
        setrefresh(res.headers('Refresh'));
        setTokenHeader();
        if (successCallback) { successCallback(); }
      })
      .catch((err) => {
        setLoading(false); // 로딩 완료
        setSuccess(null);

        if (err.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답한 경우.
          console.error(`error in POST ${url}: `, err.response.status, err.response.data);
          setError(err.response.data.message || DEFAULT_ERROR_MESSAGE);
        } else if (err.response.name=='TokenExpiredError') {
          // 토큰이 만료가 된 경우 (조건문을 고쳐주자)
          axios.defaults.headers.common['Authorization'] = `Bearer ${refresh}`;
          doSilentRefresh(param);
        } else if (err.request) {
          // 요청이 이루어 졌으나 응답을 받지 못한 경우.
          console.log('요청이 이루어 졌으나 응답을 받지 못한 경우: ', err.request);
          setError(DEFAULT_ERROR_MESSAGE);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생
          console.log('오류를 발생시킨 요청을 설정하는 중에 문제가 발생');
          setError(DEFAULT_ERROR_MESSAGE);
        }
      });
  }, [successCallback, url]);

  //서버에서는 https cookie 헤더에 refreshtoken 설정 accessToken을 JSON payload에 담아 보내준다
  //https cookie only 저장 방식에서 refreshtoken 저장 방법 찾자

  return {
    success, loading, error, data, doPostRequest, 
  };
}

 