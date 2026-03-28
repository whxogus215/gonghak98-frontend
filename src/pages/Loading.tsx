import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Loading: React.FC = () => {
  const navigate = useNavigate();
  const { file, setResult } = useAppContext();
  const [dots, setDots] = useState('');

  // 1초 단위로 '점(...)'이 늘어나는 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 실제 API 호출(모의) 로직
  useEffect(() => {
    // 1. 파일이 없으면 튕겨냅니다 (비정상 접근 방지)
    if (!file) {
      alert('업로드된 성적표가 없습니다. 첫 화면으로 돌아갑니다.');
      navigate('/');
      return;
    }

    // 2. 실제 백엔드 API (localhost:8080) 호출을 진행합니다.
    const abortController = new AbortController();

    const uploadFile = async () => {
      try {
        const formData = new FormData();
        // API 명세에 맞춰 departmentName (text/plain) 추가 (예시: 전자정보통신공학과)
        formData.append('departmentName', new Blob(['전자정보통신공학과'], { type: 'text/plain' }));
        // 실제 성적표 파일 추가
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/reports', {
          method: 'POST',
          body: formData,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const data = await response.json();

        // 3. 백엔드가 파싱해준 JSON 뭉치를 Context 상자에 담습니다.
        setResult(data);

        // 4. 분석 결과창으로 화면을 이동시킵니다!
        navigate('/result');
      } catch (error: any) {
        // 컴포넌트 언마운트로 인한 정상 취소는 무시합니다.
        if (error.name === 'AbortError') return;

        console.error('파일 업로드 및 분석 중 에러 발생:', error);
        alert('파일 분석 중 오류가 발생했습니다. 백엔드 서버가 켜져 있는지 확인해주세요.');
        navigate('/');
      }
    };

    uploadFile();

    return () => abortController.abort();
  }, [file, navigate, setResult]);

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
      <p style={{ color: 'var(--text-secondary)' }}>
        파일: {file?.name}
        <br /><br />
        잠시만 기다려주세요. (최대 1~2분 소요될 수 있습니다.)
      </p>
    </div>
  );
};

export default Loading;
