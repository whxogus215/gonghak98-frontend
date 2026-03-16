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

    // 2. 여기서 진짜라면 fetch('http://api.sejong.ac.kr/upload', { body: formData }) 를 호출합니다.
    // 지금은 백엔드가 없으므로, setTimeout으로 3초 대기 후 가짜 응답을 만들었다고 칩니다.
    const timer = setTimeout(() => {
      const mockBackendResponse = {
        studentName: "김세종",
        studentId: "19000001",
        totalTargetCredit: 109,
        totalCurrentCredit: 84,
        details: [
          { category: "MSC (기초교양)", target: 30, current: 30, status: "PASS" as const },
          { category: "전공주제", target: 60, current: 45, status: "FAIL_REMAINING" as const },
          { category: "전문교양", target: 14, current: 11, status: "FAIL_REMAINING" as const }
        ]
      };

      // 3. 백엔드가 준 JSON 뭉치를 내 Context 상자에 얌전히 담습니다.
      setResult(mockBackendResponse);
      
      // 4. 상자에 담았으니 결과창으로 화면을 강제 이동시킵니다!
      navigate('/result');
    }, 3000);

    return () => clearTimeout(timer);
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
        <br/><br/>
        잠시만 기다려주세요. (최대 1~2분 소요될 수 있습니다.)
      </p>
    </div>
  );
};

export default Loading;
