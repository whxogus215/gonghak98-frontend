import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, AlertCircle, BookOpen, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function ResultDashboard() {
  const navigate = useNavigate();
  const { result } = useAppContext();

  // 아코디언 탭 컨트롤을 위한 상태 관리 (기본적으론 모두 닫힘 false)
  const [expandedAreas, setExpandedAreas] = useState<Record<number, boolean>>({});
  const [isNonPassExpanded, setIsNonPassExpanded] = useState(false);
  const [isNotCheckedExpanded, setIsNotCheckedExpanded] = useState(false);

  useEffect(() => {
    // 뷰포트 확장을 위해 전역 CSS 변수 설정
    document.documentElement.style.setProperty('--layout-max-width', '1250px');

    if (!result) {
      alert('분석 결과가 없습니다. 처음부터 다시 시작해주세요.');
      navigate('/');
    }

    return () => {
      // 언마운트(타 페이지 이탈) 시 원래 크기로 복구
      document.documentElement.style.removeProperty('--layout-max-width');
    };
  }, [result, navigate]);

  if (!result) return null;

  const totalCurrentCredit = result.creditSummaries.reduce((sum, item) => sum + item.completedCredits, 0);
  const totalTargetCredit = result.creditSummaries.reduce((sum, item) => sum + item.requiredCredits, 0);
  const percentage = Math.min(Math.round((totalCurrentCredit / Math.max(totalTargetCredit, 1)) * 100), 100);

  const getAreaLabel = (areaType: string) => {
    switch (areaType) {
      case '`MSC`': return 'MSC';
      case 'BSM': return 'BSM';
      case 'MAJOR': return '전공 영역';
      case 'GYOYANG': return '교양 영역';
      case 'DESIGN': return '설계 영역';
      default: return areaType;
    }
  };

  const toggleExpand = (idx: number) => {
    setExpandedAreas(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div style={{
      padding: '2rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#f8fafc',
    }}>
      {/* 2x2 사이즈 구성을 위한 반응형 그리드 스타일 */}
      <style>
        {`
          .dashboard-grid-2x2 {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(2, 1fr);
          }
          
          /* 화면이 모바일/태블릿 수준으로 작아지면 1열로 떨어지도록 전환 */
          @media (max-width: 900px) {
            .dashboard-grid-2x2 {
              grid-template-columns: 1fr;
            }
          }

          /* 툴팁 스타일 */
          .tooltip-trigger {
            position: relative;
          }
          .tooltip-bubble {
            position: absolute;
            top: calc(100% + 10px);
            left: 1.5rem;
            background-color: #1e293b;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 999;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-4px);
            transition: all 0.2s ease-in-out;
          }
          .tooltip-bubble::before {
            content: '';
            position: absolute;
            top: -4px;
            left: 20px;
            width: 10px;
            height: 10px;
            background-color: #1e293b;
            transform: rotate(45deg);
          }
          .tooltip-trigger:hover .tooltip-bubble {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
        `}
      </style>

      {/* 결과 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <Trophy size={32} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>공학인증 분석 결과</h2>
          </div>
        </div>
      </div>

      {/* 메인 뷰: 가로 전체를 채우는 열(Column) 기반 배치. 스크롤 허용 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flex: 1, overflowY: 'auto', paddingRight: '0.5rem', paddingBottom: '2rem' }}>

        {/* 경고 및 알림 영역 (가로 2열 배치) */}
        {((result.nonPassResults && result.nonPassResults.length > 0) || (result.notCheckedResults && result.notCheckedResults.length > 0)) && (
          <div className="dashboard-grid-2x2">
            {/* 미충족 경고 영역 */}
            {result.nonPassResults && result.nonPassResults.length > 0 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FEF2F2', borderBottom: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertCircle size={24} color="#DC2626" style={{ flexShrink: 0 }} />
                  <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#991B1B' }}>
                    공학인증 미충족 항목
                  </h4>
                  <span style={{
                    marginLeft: 'auto',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: '#FEE2E2',
                    color: '#991B1B'
                  }}>
                    {result.nonPassResults.length}건
                  </span>
                </div>

                <button
                  onClick={() => setIsNonPassExpanded(!isNonPassExpanded)}
                  style={{
                    border: 'none',
                    backgroundColor: isNonPassExpanded ? '#f1f5f9' : 'white',
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#64748b',
                    fontSize: '0.95rem',
                    borderBottom: isNonPassExpanded ? '1px solid #e2e8f0' : 'none',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseOut={(e) => {
                    if (!isNonPassExpanded) e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  {isNonPassExpanded ? '목록 닫기' : '항목 확인하기'}
                  {isNonPassExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isNonPassExpanded && (
                  <div style={{ padding: '1rem 1.5rem', backgroundColor: 'white' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {result.nonPassResults.map((np, idx) => (
                        <li key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>{np.courseName}</span>
                            <span style={{ fontWeight: 700, color: '#DC2626', backgroundColor: '#FEF2F2', padding: '3px 8px', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'right', wordBreak: 'keep-all' }}>
                              {np.reason === 'NOT_SATISFIED_PREREQUISITE' ? '선수과목 미이수' : np.reason}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{np.year}년도 {np.semester}학기 · {np.credit}학점 · 과목코드: {np.courseCode}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 검사에 포함되지 않은 항목 영역 */}
            {result.notCheckedResults && result.notCheckedResults.length > 0 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div
                  className="tooltip-trigger"
                  style={{ position: 'relative', padding: '1.25rem 1.5rem', backgroundColor: '#FFFBEB', borderBottom: '1px solid #FCD34D', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', display: 'flex', alignItems: 'center', cursor: 'help' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <AlertCircle size={24} color="#D97706" style={{ flexShrink: 0 }} />
                      <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#92400E' }}>
                        검사에 포함되지 않은 항목
                      </h4>
                    </div>
                  </div>

                  {/* 말풍선 툴팁 (CSS 기반) */}
                  <div className="tooltip-bubble">
                    현재 시스템에 존재하지 않는 과목입니다.
                  </div>

                  <span style={{
                    marginLeft: 'auto',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    whiteSpace: 'nowrap'
                  }}>
                    {result.notCheckedResults.length}건
                  </span>
                </div>

                <button
                  onClick={() => setIsNotCheckedExpanded(!isNotCheckedExpanded)}
                  style={{
                    border: 'none',
                    backgroundColor: isNotCheckedExpanded ? '#f1f5f9' : 'white',
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#64748b',
                    fontSize: '0.95rem',
                    borderBottom: isNotCheckedExpanded ? '1px solid #e2e8f0' : 'none',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseOut={(e) => {
                    if (!isNotCheckedExpanded) e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  {isNotCheckedExpanded ? '목록 닫기' : '항목 확인하기'}
                  {isNotCheckedExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isNotCheckedExpanded && (
                  <div style={{ padding: '1rem 1.5rem', backgroundColor: 'white' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {result.notCheckedResults.map((nc, idx) => (
                        <li key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>{nc.courseName}</span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{nc.year}년도 {nc.semester}학기 · {nc.credit}학점 · 과목코드: {nc.courseCode}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 상단 통계 영역 (전체 이수 현황 & 영역별 통과 여부 - 가로 배치) */}
        <div className="dashboard-grid-2x2">

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
                  <div style={{ flexShrink: 0, marginLeft: '8px' }}>
                    {pr.isPassed ? <CheckCircle size={20} color="#22c55e" /> : <XCircle size={20} color="#94a3b8" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 세부 수강 내역 (하단 영역, 2x2 사이즈 구성 및 아코디언) */}
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' }}>영역별 상세 이수 내역</h3>
          <div className="dashboard-grid-2x2">
            {result.creditSummaries.map((summary, idx) => {
              const summaryPercentage = Math.min(Math.round((summary.completedCredits / Math.max(summary.requiredCredits, 1)) * 100), 100);
              const isFulfilled = summary.completedCredits >= summary.requiredCredits;
              const isExpanded = expandedAreas[idx] || false;

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
                  {/* 카드 헤더 (진행 상태) */}
                  <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getAreaLabel(summary.areaType)}
                        {summary.areaType === 'DESIGN' && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', backgroundColor: '#e2e8f0', padding: '3px 8px', borderRadius: '6px' }}>
                            설계 학점 기준
                          </span>
                        )}
                      </h4>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: isFulfilled ? '#DCFCE7' : '#FEF3C7',
                        color: isFulfilled ? '#166534' : '#92400E'
                      }}>
                        {isFulfilled ? '충족' : `진행중 (-${Math.max(0, summary.requiredCredits - summary.completedCredits)})`}
                      </span>
                    </div>
                    {/* 미니 진행률 바 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${summaryPercentage}%`,
                          height: '100%',
                          backgroundColor: isFulfilled ? '#22c55e' : 'var(--color-primary)',
                          borderRadius: '999px'
                        }}></div>
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569', minWidth: '60px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {summary.completedCredits} / {summary.requiredCredits} {summary.areaType === 'DESIGN' ? '설계 학점' : '학점'}
                      </span>
                    </div>
                  </div>

                  {/* 이수 과목 목록 보기 (아코디언 토글 버튼) */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    style={{
                      border: 'none',
                      backgroundColor: isExpanded ? '#f1f5f9' : 'white',
                      padding: '0.75rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#64748b',
                      fontSize: '0.95rem',
                      borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseOut={(e) => {
                      if (!isExpanded) e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    {isExpanded ? '과목 내역 닫기' : '이수 내역 확인하기'}
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {/* 실제 이수 과목 리스트 (열림 상태일 때만 렌더링) */}
                  {isExpanded && (
                    <div style={{ padding: '1rem 1.5rem', backgroundColor: 'white' }}>
                      {summary.relatedCourses && summary.relatedCourses.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                          {summary.relatedCourses.map((course, cIdx) => (
                            <li key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600, color: '#334155' }}>{course.courseName}</span>
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{course.year}년도 {course.semester}학기 · {course.courseCode}</span>
                              </div>
                              <span style={{ fontWeight: 700, color: '#3b82f6', backgroundColor: '#eff6ff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                                {course.credit}학점
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div style={{ padding: '1.5rem 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.95rem' }}>
                          수강 내역이 없습니다.
                        </div>
                      )}
                    </div>
                  )}

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
