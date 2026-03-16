import React from 'react';
import { Target } from 'lucide-react';

const CreditProgressBar: React.FC = () => {
  // 나중에 백엔드 API에서 받아올 데이터라고 가정합니다 (Mock Data)
  const currentCredit = 84;
  const targetCredit = 109;
  
  // 퍼센트 계산 로직: (현재 학점 / 목표 학점) * 100, 최대 100%까지만 표시
  const percentage = Math.min(Math.round((currentCredit / targetCredit) * 100), 100);

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      border: '1px solid var(--border-color)'
    }}>
      {/* 헤더 부분 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Target size={28} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>전체 이수 현황</h3>
        </div>
        
        {/* 우측 숫자 학점 표기 */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{currentCredit}</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}> / {targetCredit} 학점</span>
        </div>
      </div>

      {/* 시각적인 막대(Progress Bar) 영역 */}
      <div style={{ marginTop: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <span>진행률</span>
          <span style={{ color: 'var(--color-primary)' }}>{percentage}%</span>
        </div>
        
        {/* 바깥쪽 회색 바 */}
        <div style={{ 
          width: '100%', 
          height: '12px', 
          backgroundColor: '#E2E8F0', 
          borderRadius: '999px',
          overflow: 'hidden'
        }}>
          {/* 안쪽 붉은색(진행 상태) 바 */}
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '999px',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' // 부드럽게 차오르는 애니메이션
          }}></div>
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textAlign: 'right', marginTop: '0.25rem' }}>
        * 졸업 요건 중 인증 필수 학점 기준입니다.
      </p>
    </div>
  );
};

export default CreditProgressBar;
