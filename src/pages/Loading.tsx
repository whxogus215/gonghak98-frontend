import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Loading: React.FC = () => {
  const navigate = useNavigate();
  const { departmentName, entranceYear, file, setResult } = useAppContext();
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
        const response = await fetch(`${apiUrl}/api/reports`, {
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
  }, [file, departmentName, entranceYear, navigate, setResult]);

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
