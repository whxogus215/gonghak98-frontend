import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function ResultDashboard() {
  const navigate = useNavigate();
  // 상자(Context)에서 방금 백엔드가 파싱해준 결과 데이터(result)를 꺼내옵니다.
  const { result } = useAppContext();

  // 만약 누군가가 URL을 쳐서 강제로 이 페이지로 들어왔는데 데이터가 없다면 튕겨냅니다.
  useEffect(() => {
    if (!result) {
      alert('분석 결과가 없습니다. 처음부터 다시 시작해주세요.');
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) return null; // 튕겨내는 동안 화면이 하얗게 보이도록 빈 렌더링

  // CreditProgressBar를 위한 데이터 계산 (이 파일에서 직접 그립니다)
  const percentage = Math.min(Math.round((result.totalCurrentCredit / Math.max(result.totalTargetCredit, 1)) * 100), 100);

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
              {result.studentName} ({result.studentId}) 님의 공학인증 이수 상태입니다.
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
        
        {/* 진행률 바 (기존 구현 코드를 데이터랑 연결해서 통합) */}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>전체 이수 현황</h3>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{result.totalCurrentCredit}</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}> / {result.totalTargetCredit} 학점</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>진행률</span>
              <span style={{ color: 'var(--color-primary)' }}>{percentage}%</span>
            </div>
            <div style={{ width: '100%', height: '12px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '999px',
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
              }}></div>
            </div>
          </div>
        </div>

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
              {result.details.map((item, index) => {
                const isPass = item.status === 'PASS';
                const diff = item.target - item.current;
                
                return (
                  <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{item.category}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{item.target}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{item.current}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      {isPass ? (
                        <span style={{ color: 'var(--color-success)', fontWeight: 600, backgroundColor: '#F0FDF4', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>충족</span>
                      ) : (
                        <span style={{ color: 'var(--color-warning)', fontWeight: 600, backgroundColor: '#FFFBEB', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                          진행중 (-{diff > 0 ? diff : 0})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
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
}

export default ResultDashboard;
