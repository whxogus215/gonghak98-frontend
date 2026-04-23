import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Loading: React.FC = () => {
  const navigate = useNavigate();
  const { departmentName, entranceYear, file, setResult } = useAppContext();
  const [dots, setDots] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1초 단위로 '점(...)'이 늘어나는 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 실제 API 호출(모의) 로직
  useEffect(() => {
    // 1. 파일이나 학과/입학년도 정보가 없으면 튕겨냅니다 (비정상 접근 방지)
    if (!file || !departmentName || !entranceYear) {
      alert('필수 정보가 누락되었습니다. 첫 화면으로 돌아갑니다.');
      navigate('/');
      return;
    }

    // 2. 실제 백엔드 API 호출을 진행합니다.
    const abortController = new AbortController();

    const uploadFile = async () => {
      try {
        const formData = new FormData();
        // 백엔드(Spring)가 해당 필드들을 MultipartFile이 아닌 String으로 받을 수 있도록, Blob 래핑을 제거하고 일반 텍스트로 보냅니다.
        formData.append('departmentName', departmentName);
        formData.append('entranceYear', entranceYear);
        // 실제 성적표 파일 추가
        formData.append('file', file);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        // 최소 유지 시간 (3초) 타이머 
        const minWaitPromise = new Promise(resolve => setTimeout(resolve, 3000));

        // 실제 서버 API 요청
        const apiPromise = (async () => {
          const response = await fetch(`${apiUrl}/api/reports`, {
            method: 'POST',
            body: formData,
            signal: abortController.signal,
          });

          if (!response.ok) {
            // 백엔드의 커스텀 JSON 에러 추출 시도
            const errorData = await response.json().catch(() => null);

            // 규격화된 에러 응답이 존재하면 해당 객체를 그대로 throw
            if (errorData && errorData.errorMessage) {
              throw errorData;
            }
            throw new Error(`서버 응답 오류: ${response.status}`);
          }

          return response.json();
        })();

        // 두 작업이 모두 끝날 때까지 대기
        const [data] = await Promise.all([apiPromise, minWaitPromise]);


        // 3. 백엔드가 파싱해준 JSON 뭉치를 Context 상자에 담습니다.
        setResult(data);

        // 4. 분석 결과창으로 화면을 이동시킵니다!
        navigate('/result');
      } catch (error: any) {
        // 컴포넌트 언마운트로 인한 정상 취소는 무시합니다.
        if (error.name === 'AbortError') return;

        console.error('파일 업로드 및 분석 중 에러 발생:', error);

        // 실무형 에러 분기 처리 (개발 vs 운영)
        const isDev = import.meta.env.DEV;

        // 백엔드 커스텀 에러 응답인 경우 (errorMessage 필드가 존재)
        if (error.errorMessage) {
          setErrorMsg(`[${error.errorCode || '오류'}]\n${error.errorMessage}`);
        } else {
          // 예측할 수 없는 시스템 에러 / 일반 통신 에러
          const displayMessage = isDev
            ? `[개발용 상세 에러]\n${error.message}\n백엔드 서버 상태를 확인해주세요.`
            : '성적표 분석 중 일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주시거나 공학인증 센터에 문의해주세요.';

          setErrorMsg(displayMessage);
        }
      }
    };

    uploadFile();

    return () => abortController.abort();
  }, [file, departmentName, entranceYear, navigate, setResult]);

  // 에러 전용 컴포넌트 렌더링
  if (errorMsg) {
    return (
      <div style={{
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <AlertTriangle size={48} color="#EF4444" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          오류가 발생했습니다
        </h2>
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: '12px',
          padding: '1.5rem',
          color: '#B91C1C',
          maxWidth: '500px',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.6,
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          {errorMsg}
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      textAlign: 'center'
    }}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1.5s linear infinite;
            color: var(--color-primary);
          }
        `}
      </style>

      <div className="spinner" style={{ marginBottom: '2rem' }}>
        <Loader2 size={48} />
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        성적표를 분석하고 있습니다{dots}
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        파일: {file?.name}
        <br /><br />
        잠시만 기다려주세요. (최대 1~2분 소요될 수 있습니다.)
      </p>

      {/* 안내 문구 영역 (Disclaimer) */}
      <div style={{
        marginTop: '1rem',
        padding: '1.25rem 1.5rem',
        backgroundColor: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: '12px',
        maxWidth: '500px',
        color: '#92400E',
        fontSize: '0.95rem',
        lineHeight: 1.6,
        fontWeight: 500,
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        해당 내용은 참고용으로 활용하시기 바랍니다.<br />
        자세한 사항은 소속된 공학인증 센터에 문의하시기 바랍니다.
      </div>
    </div>
  );
};

export default Loading;
