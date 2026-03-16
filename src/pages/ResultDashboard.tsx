import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Download } from 'lucide-react';

// 이전에 만들었던 학점 계산 컴포넌트 재활용
import CreditProgressBar from '../components/Dashboard/CreditProgressBar';

const ResultDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '2rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* 결과 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '8px', backgroundColor: '#FEF2F2', borderRadius: '8px' }}>
            <Trophy size={28} color="var(--color-primary)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>분석 결과 리포트</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              홍길동 (12345678) 님의 공학인증 이수 상태입니다.
            </p>
          </div>
        </div>
        
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <Download size={16} /> PDF 다운로드
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        {/* 진행률 바 (기존 구현 컴포넌트 재사용) */}
        <CreditProgressBar />

        {/* 세부 이수 항목 테이블 */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>영역별 이수 현황 상세</h3>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>영역 구분</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>필수 학점</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>취득 학점</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>MSC (기초교양)</td>
                <td style={{ padding: '1rem 1.5rem' }}>30</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>30</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ color: 'var(--color-success)', fontWeight: 600, backgroundColor: '#F0FDF4', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>충족</span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>전공주제</td>
                <td style={{ padding: '1rem 1.5rem' }}>60</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>45</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ color: 'var(--color-warning)', fontWeight: 600, backgroundColor: '#FFFBEB', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>진행중 (-15)</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>전문교양</td>
                <td style={{ padding: '1rem 1.5rem' }}>14</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>11</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ color: 'var(--color-warning)', fontWeight: 600, backgroundColor: '#FFFBEB', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>진행중 (-3)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 홈으로 돌아가기 버튼 */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '50px',
            color: 'var(--text-primary)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
        >
          <ArrowLeft size={18} /> 처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ResultDashboard;
