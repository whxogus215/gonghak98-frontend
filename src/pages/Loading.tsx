import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  // 1초 단위로 '점(...)'이 늘어나는 애니메이션 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 실제 백엔드 연동 전 임시로 3초 대기 후 결과창으로 넘어가는 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
      {/* 
        lucide-react의 Loader2 아이콘に CSS 애니메이션을 적용하여 
        무한히 빙글빙글 도는 스피너를 구현합니다. (현재는 inline 스타일로 spin 지원 안됨)
        따라서 index.css 에 작성된 커스텀 애니메이션 클래스(animate-spin)를 활용합니다.
      */}
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
        잠시만 기다려주세요. (최대 1~2분 소요될 수 있습니다.)
      </p>
    </div>
  );
};

export default Loading;
