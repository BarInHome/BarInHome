import {
  useState, useEffect, useCallback
} from 'react';
import axios, { cancelToken, isCancel as isAxiosCancel } from '../axios';
import history from '../../history';

const DEFAULT_ERROR_MESSAGE = '죄송합니다.. 데이터 조회중 오류가 발생했습니다..';
const UNAUTHORIZED = 401;
export interface UseGetRequestObject<T> {
  data: T | null;
  loading: boolean | null;
  error: string;
  doGetRequest: () => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

type DefaultParamType = { [key: string]: any };
/**
 * API서버로 `GET` 요청을 보낼 때 사용하는 react **hook**.
 * ## 타입파라미터 (제네릭)
 * @type `PARAM_TYPE` API서버로 보낼 파라미터의 타입
 * @type `RES_DATA_TYPE` API서버로부터 전달받을 데이터 타입
 * 
 * ## 파라미터
 * @param {string} url 데이터를 삭제할 API 서버 endpoint
 * @param {PARAM_TYPE} params GET 요청에 필요한 파라미터 객체
 * 
 * ## 반환값
 * @return 전달받은데이터 `data`
 * @return 로딩여부 `loading`
 * @return 에러메시지문자열 `error`
 * @return GET요청함수 `doGetRequest`
 * @example
 * const {
 *   data, loading, error, doGetRequest
 * } = useGetData<ParameterType, ResponseDataType>('/test',
 *   () => { console.log('success callback done'); handleOpen(); }  
 * );
 */
export default function useGetRequest<
  PARAM_TYPE=DefaultParamType, RES_DATA_TYPE = any>(
  url: string,
  params?: PARAM_TYPE,
): UseGetRequestObject<RES_DATA_TYPE> {
  const [param] = useState(params);
  const [data, setData] = useState<RES_DATA_TYPE | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');

  const [unmounted, setUnmounted] = useState(false);
  const [source] = useState(cancelToken.source());

  const doGetRequest = useCallback(() => {
    setLoading(true);
    axios.get<RES_DATA_TYPE>(`http://localhost:5000${url}`, {
      params: { ...param },
      cancelToken: source.token,
      withCredentials: true
    })
      .then((res) => { // 상태코드 200번대 
        if (!unmounted) { // 컴포넌트가 unmount 되지 않은 경우
          setLoading(false); // 로딩 완료
          setData(res.data); // 데이터 설정
        }
      })
      .catch((err) => { // 상태코드 300~
        if (!unmounted) { // 컴포넌트가 unmount 되지 않은 경우
          setLoading(false); // 로딩 완료

          if (err && err.isAxiosError) {
            if (err && err.response) {
              if (err.response.status === UNAUTHORIZED) { // 세션없는 요청의 경우
                setError(err.response.data.mesage);
                history.push('/');
              } else {
                console.error('statuscode: ', err.response.status, err.response.data);
                setError(err.response.data.message || DEFAULT_ERROR_MESSAGE);
              }
            } else {
              setError(err.message);
            }
          } else if (isAxiosCancel(err)) {
            console.info(`reqeust canceling in - ${url}`, err.message);
          } else {
            // axios 에러가 아닌 경우
            console.error('not axios error - ', err);
          }
        }
      });
  }, [url, param, source.token, unmounted]);

  useEffect(() => {
    doGetRequest();

    // cleanup function
    return (): void => {
      source.cancel('Cancelling in cleanup');
      setUnmounted(true);
    };
  }, [doGetRequest, source]);

  return {
    data, loading, error, doGetRequest, setData
  };
}