import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

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
      <div style={{
        width: '64px',
        height: '64px',
        backgroundColor: 'var(--color-primary-light)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: 'white'
      }}>
        <CheckCircle2 size={36} />
      </div>
      
      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-1px' }}>
        내 공학인증 상태,<br />1분 만에 확인하세요.
      </h2>
      
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
        번거로운 로그인이나 복잡한 과정 없이<br />
        기이수 성적표만 있으면 자동으로 분석해 드립니다.
      </p>

      {/* 
        시작 버튼 
        클릭 시 퀴즈 페이지(/quiz)로 넘어갑니다.
      */}
      <button 
        onClick={() => navigate('/quiz')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(195, 15, 35, 0.39)', // 붉은 글로우 효과
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(195, 15, 35, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(195, 15, 35, 0.39)';
        }}
      >
        시작하기 <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Landing;
