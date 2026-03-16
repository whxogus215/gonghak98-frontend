import React from 'react';
import { Outlet } from 'react-router-dom';

const StepLayout: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-main)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      {/* 
        중앙 집중형 카드 UI
        - 비회원이 한 단계씩 집중해서 넘어갈 수 있도록 
          불필요한 메뉴를 없애고 중앙에 띄우는 레이아웃입니다.
      */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        width: '100%',
        maxWidth: '800px',
        minHeight: '500px',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 상단 간이 헤더 (로고 및 진행 단계 표시용) */}
        <header style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAFAFA' // 약간 구분되는 밝은 배경
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            letterSpacing: '-0.5px'
          }}>
            세종대학교 공학인증 패스
          </h1>
        </header>

        {/* 
          실제 각 단계(라우트) 화면이 렌더링되는 영역 
          - flex: 1을 주어 남은 높이를 모두 차지하게 합니다.
        */}
        <main style={{ flex: 1, position: 'relative' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StepLayout;
