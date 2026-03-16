import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  // 정답 입력값을 담고 있는 state
  const [answer, setAnswer] = useState('');
  
  // 에러 메시지 state
  const [error, setError] = useState('');

  // 폼(양식) 제출 시 실행되는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    // (예시) 백엔드 없이 프론트엔드에서 간단히 정답 검증
    if (answer.trim() === '대양AI센터') {
      navigate('/upload'); // 정답일 경우 업로드 페이지로 이동
    } else {
      setError('정답이 아닙니다. 다시 시도해주세요.'); // 오답일 경우 에러 메시지 세팅
    }
  };

  return (
    <div style={{
      padding: '2rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <ShieldCheck size={28} color="var(--color-primary)" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>재학생 인증</h2>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.5 }}>
        원활한 서비스 제공을 위해 세종대학교 재학생임을 인증해주세요.<br />
        아래 퀴즈의 정답을 입력하시면 다음 단계로 이동합니다.
      </p>

      {/* 폼 영역 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        <div style={{
          backgroundColor: '#F8FAFC',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>
            Q. 소프트웨어융합대학이 위치한 건물의 이름은 무엇인가요?
          </p>
          <input 
            type="text" 
            placeholder="예: 집현관"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(''); // 타이핑 중에는 에러 지우기
            }}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: `1px solid ${error ? 'var(--color-danger)' : 'var(--border-color)'}`,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-danger)', marginTop: '0.5rem', fontSize: '0.85rem' }}>
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* 빈 공간 차지용 (버튼을 하단으로 밀어냄) */}
        <div style={{ flex: 1 }}></div>

        {/* 하단 네비게이션 버튼 영역 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            type="button"
            onClick={() => navigate(-1)} // 뒤로가기
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            이전으로
          </button>
          
          <button 
            type="submit"
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: 'var(--color-primary)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              opacity: answer.trim() ? 1 : 0.5, // 값이 없으면 반투명
              pointerEvents: answer.trim() ? 'auto' : 'none', // 값이 없으면 클릭 불가
            }}
          >
            다음 단계
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
