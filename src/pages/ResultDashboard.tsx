import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Download, AlertCircle, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function ResultDashboard() {
  const navigate = useNavigate();
  const { result } = useAppContext();

  useEffect(() => {
    if (!result) {
      alert('분석 결과가 없습니다. 처음부터 다시 시작해주세요.');
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) return null;

  const totalCurrentCredit = result.creditSummaries.reduce((sum, item) => sum + item.completedPoints, 0);
  const totalTargetCredit = result.creditSummaries.reduce((sum, item) => sum + item.requiredPoints, 0);
  const percentage = Math.min(Math.round((totalCurrentCredit / Math.max(totalTargetCredit, 1)) * 100), 100);

  const getAreaLabel = (areaType: string) => {
    switch(areaType) {
      case 'MSC': return 'MSC (기초/교양)';
      case 'BSM': return 'BSM (수/과/전산)';
      case 'MAJOR': return '전공 영역';
      case 'GYOYANG': return '교양 영역';
      case 'DESIGN': return '설계 영역';
      default: return areaType;
    }
  };

  return (
    <div style={{
      padding: '2rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#f8fafc',
    }}>
      {/* 결과 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <Trophy size={32} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>공학인증 분석 결과</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '1rem', marginTop: '4px' }}>
              {result.studentName} ({result.studentId}) 님의 이수 현황입니다.
            </p>
          </div>
        </div>
        
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          color: '#475569',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.95rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease',
        }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}>
          <Download size={18} /> PDF 다운로드
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto', paddingRight: '0.5rem', paddingBottom: '2rem' }}>
        
        {/* 미충족 경고 영역 */}
        {result.nonPassResults && result.nonPassResults.length > 0 && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <AlertCircle size={24} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#991B1B', fontSize: '1.1rem', fontWeight: 700 }}>주의사항 및 미충족 항목</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#B91C1C', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {result.nonPassResults.map((np, idx) => (
                  <li key={idx}>과목코드 {np.courseId}: {np.reason === 'NOT_SATISFIED_PREREQUISITE' ? '선수과목 미이수' : np.reason}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 상단 통계 영역 (진행률 & 영역별 통과 여부) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '1.5rem', flexWrap: 'wrap' }}>
          
          {/* 전체 진행률 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={24} color="#3b82f6" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#334155' }}>전체 이수 현황</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>{totalCurrentCredit}</span>
                <span style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}> / {totalTargetCredit} 학점</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 700 }}>
                <span style={{ color: '#475569' }}>진행률</span>
                <span style={{ color: 'var(--color-primary)' }}>{percentage}%</span>
              </div>
              <div style={{ width: '100%', height: '14px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                  borderRadius: '999px',
                  transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}></div>
              </div>
            </div>
          </div>

          {/* 영역별 통과 뱃지 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: '#334155' }}>영역별 인증 심사</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
              {result.passResults.map((pr, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: pr.isPassed ? '#F0FDF4' : '#F8FAFC',
                  border: `1px solid ${pr.isPassed ? '#BBF7D0' : '#E2E8F0'}`,
                  borderRadius: '12px',
                  minHeight: '60px'
                }}>
                  <span style={{ fontWeight: 600, color: pr.isPassed ? '#166534' : '#475569', fontSize: '0.95rem' }}>{getAreaLabel(pr.areaType)}</span>
                  <div style={{flexShrink: 0, marginLeft: '8px'}}>
                    {pr.isPassed ? <CheckCircle size={20} color="#22c55e" /> : <XCircle size={20} color="#94a3b8" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 세부 수강 내역 (영역별 카드) */}
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem', marginTop: '1rem' }}>영역별 상세 이수 내역</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {result.creditSummaries.map((summary, idx) => {
              const summaryPercentage = Math.min(Math.round((summary.completedPoints / Math.max(summary.requiredPoints, 1)) * 100), 100);
              const isFulfilled = summary.completedPoints >= summary.requiredPoints;

              return (
                <div key={idx} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                  border: '1px solid #f1f5f9',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* 카드 헤더 */}
                  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#334155' }}>
                        {getAreaLabel(summary.areaType)}
                      </h4>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: isFulfilled ? '#DCFCE7' : '#FEF3C7',
                        color: isFulfilled ? '#166534' : '#92400E'
                      }}>
                        {isFulfilled ? '충족' : `진행중 (-${Math.max(0, summary.requiredPoints - summary.completedPoints)})`}
                      </span>
                    </div>
                    {/* 미니 진행률 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${summaryPercentage}%`,
                          height: '100%',
                          backgroundColor: isFulfilled ? '#22c55e' : 'var(--color-primary)',
                          borderRadius: '999px'
                        }}></div>
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569', minWidth: '60px', textAlign: 'right' }}>
                        {summary.completedPoints} / {summary.requiredPoints}
                      </span>
                    </div>
                  </div>
                  
                  {/* 수강 과목 리스트 */}
                  <div style={{ padding: '1rem 1.5rem', flex: 1, backgroundColor: 'white' }}>
                    {summary.relatedCourses && summary.relatedCourses.length > 0 ? (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {summary.relatedCourses.map((course, cIdx) => (
                          <li key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 600, color: '#334155' }}>{course.name}</span>
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{course.year}년도 {course.semester}학기 · {course.courseId}</span>
                            </div>
                            <span style={{ fontWeight: 700, color: '#3b82f6', backgroundColor: '#eff6ff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                              {course.point}학점
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ padding: '2rem 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.95rem' }}>
                        수강 내역이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 홈으로 돌아가기 버튼 */}
      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 2.5rem',
            backgroundColor: 'white',
            border: '1px solid #cbd5e1',
            borderRadius: '50px',
            color: '#475569',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.transform = 'none'; }}
        >
          <ArrowLeft size={20} /> 처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default ResultDashboard;
