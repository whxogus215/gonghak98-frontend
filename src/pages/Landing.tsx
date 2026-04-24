import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, BarChart3, CheckCircle2, Trophy, BookOpen, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import KakaoIcon from '../components/KakaoIcon';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, "Pretendard", sans-serif',
      overflowX: 'hidden'
    }}>
      {/* 네비게이션 바 */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        zIndex: 1000
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
          세종대 공학인증 패스
        </div>
        <div style={{ flex: 1 }} />
        <a
          href="https://open.kakao.com/o/se7DqQri"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '1rem',
            borderRadius: '8px',
            padding: '6px',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          title="카카오톡 오픈채팅 문의"
        >
          <KakaoIcon size={26} />
        </a>
        <button
          onClick={() => navigate('/about')}
          style={{
            background: 'none',
            border: 'none',
            color: '#4B5563',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            marginRight: '1.5rem',
            transition: 'color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseOut={e => e.currentTarget.style.color = '#4B5563'}
        >
          서비스 소개
        </button>
        <button
          onClick={() => navigate('/department')}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#a30c1d'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        >
          시작하기
        </button>
      </nav>

      {/* 히어로 섹션 */}
      <section style={{
        padding: '160px 2rem 120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(195,15,35,0.04) 0%, rgba(255,255,255,0) 100%)'
      }}>
        <div style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          padding: '0.6rem 1.2rem',
          borderRadius: '50px',
          fontWeight: 700,
          fontSize: '0.9rem',
          marginBottom: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 10px rgba(195, 15, 35, 0.3)'
        }}>
          <img src="/favicon.svg" alt="logo" style={{ width: 18, height: 18 }} /> 복잡한 공학인증을 한 번에
        </div>

        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 800,
          color: '#111827',
          letterSpacing: '-2px',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          wordBreak: 'keep-all'
        }}>
          내 <span style={{ color: 'var(--color-primary)' }}>공학인증</span> 상태<br />
          단 1분 만에 확인하세요
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: '#4B5563',
          maxWidth: '600px',
          lineHeight: 1.6,
          marginBottom: '3rem',
          wordBreak: 'keep-all'
        }}>
          번거로운 로그인이나 복잡한 과정 없이<br />
          기이수 성적표 엑셀파일만 업로드하면 자동으로<br />
          요건을 분석해 드립니다.
        </p>

        <button
          onClick={() => navigate('/department')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            padding: '1.25rem 3rem',
            fontSize: '1.25rem',
            fontWeight: 700,
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(195, 15, 35, 0.4)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(195, 15, 35, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(195, 15, 35, 0.4)';
          }}
        >
          지금 바로 시작하기 <ArrowRight size={24} />
        </button>

        {/* 대시보드 미리보기 이미지 (CSS 박스로 목업 표현) */}
        <div style={{
          marginTop: '6rem',
          width: '100%',
          maxWidth: '1000px',
          height: 'auto',
          minHeight: '520px',
          paddingBottom: '3rem',
          backgroundColor: '#f8fafc',
          borderRadius: '24px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Mock Header */}
          <div style={{ height: '48px', backgroundColor: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '8px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }} />
          </div>

          {/* Mock Content */}
          <div style={{ flex: 1, padding: '2rem 3rem', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', overflow: 'hidden', backgroundColor: '#f8fafc' }}>

            {/* Left Column: 정상 이수 대시보드 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex' }}>
                  <Trophy size={32} color="white" />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#1e293b' }}>공학인증 분석 결과</h2>
              </div>

              {/* 전체 진행률 카드 (실제 디자인 적용) */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={24} color="#3b82f6" />
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#334155' }}>전체 이수 현황</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>71</span>
                    <span style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem' }}> / 86 학점</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 700 }}>
                    <span style={{ color: '#475569' }}>진행률</span>
                    <span style={{ color: 'var(--color-primary)' }}>82%</span>
                  </div>
                  <div style={{ width: '100%', height: '14px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)', borderRadius: '999px' }} />
                  </div>
                </div>
              </div>

              {/* 영역별 통과 뱃지 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#166534', fontSize: '0.95rem' }}>MSC</span>
                  <CheckCircle size={20} color="#22c55e" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#166534', fontSize: '0.95rem' }}>설계 영역</span>
                  <CheckCircle size={20} color="#22c55e" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#166534', fontSize: '0.95rem' }}>교양 영역</span>
                  <CheckCircle size={20} color="#22c55e" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.95rem' }}>전공 영역</span>
                  <XCircle size={20} color="#94a3b8" />
                </div>
              </div>
            </div>

            {/* Right Column: 미이수 경고 알림 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ height: '56px' }}></div> {/* 헤더 높이 맞춤용 여백 */}

              <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FEF2F2', borderBottom: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertCircle size={24} color="#DC2626" />
                  <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#991B1B' }}>공학인증 미충족 항목</h4>
                  <span style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#FEE2E2', color: '#991B1B' }}>2건</span>
                </div>
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>알고리즘 및 실습</span>
                      <span style={{ fontWeight: 700, color: '#DC2626', backgroundColor: '#FEF2F2', padding: '3px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>선수과목 미이수</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.95rem' }}>운영체제</span>
                      <span style={{ fontWeight: 700, color: '#DC2626', backgroundColor: '#FEF2F2', padding: '3px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>필수 전공 누락</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 검사 제외 항목 (노란색 디자인 적용) */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FFFBEB', borderBottom: '1px solid #FCD34D', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertCircle size={24} color="#D97706" />
                  <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#92400E' }}>검사에 포함되지 않은 항목</h4>
                  <span style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#92400E' }}>1건</span>
                </div>
                <div style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
                  해당 과목은 인증 기준에서 제외됩니다.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section style={{ padding: '8rem 2rem', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              더 이상 수기로 학점을 계산하지 마세요
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6B7280', wordBreak: 'keep-all' }}>
              공학인증 이수체계도를 완벽하게 자동화 알고리즘이 모든 것을 분석합니다.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <FeatureCard
              icon={<BarChart3 size={32} color="#3B82F6" />}
              title="직관적인 결과 대시보드"
              desc="이수해야 할 필수 과목과 부족한 학점을 시각화된 그래프로 누구나 이해하기 쉽게 보여줍니다."
              bgColor="rgba(59, 130, 246, 0.1)"
            />
            <FeatureCard
              icon={<Shield size={32} color="#10B981" />}
              title="철저한 보안"
              desc="업로드된 성적표는 서버에 저장되지 않으며, 사용자의 브라우저 내에서 분석된 후 폐기됩니다."
              bgColor="rgba(16, 185, 129, 0.1)"
            />
            <FeatureCard
              icon={<CheckCircle2 size={32} color="var(--color-primary)" fill="white" />}
              title="빈틈없는 분석 알고리즘"
              desc="세종대학교 공학인증 프로그램의 가이드라인을 100% 반영하여, 수기 계산 시 놓칠 수 있는 부분까지 검증합니다."
              bgColor="var(--color-primary-light)"
            />
          </div>
        </div>
      </section>

      {/* 하단 CTA 섹션 */}
      <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          졸업 준비의 필수 요소, 공학인증 현황을 확인해보세요
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
          세종대학교 학사정보시스템에서 다운로드한 '기이수 성적표'만 준비해주세요.
        </p>
        <button
          onClick={() => navigate('/department')}
          style={{
            backgroundColor: 'white',
            color: 'var(--color-primary)',
            border: 'none',
            padding: '1.2rem 3rem',
            fontSize: '1.25rem',
            fontWeight: 800,
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          무료로 분석 시작하기
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#111827', color: '#9CA3AF' }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'white', marginBottom: '1rem' }}>
          세종대 공학인증 패스
        </div>
        <p>© 2026 gonghak98. All rights reserved.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '1rem', opacity: 0.7 }}>
          * 본 서비스는 공식 시스템이 아니며, 참고용으로만 활용하시기 바랍니다.
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, bgColor }: { icon: React.ReactNode, title: string, desc: string, bgColor: string }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease',
  }}
    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-8px)'}
    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ width: 72, height: 72, borderRadius: '20px', backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: '#111827' }}>{title}</h3>
    <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: '1.05rem' }}>{desc}</p>
  </div>
);

export default Landing;
