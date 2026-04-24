import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  BarChart3,
  Shield,
  CheckCircle2,
  FileSpreadsheet,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import KakaoIcon from '../components/KakaoIcon';

/* ───────────────────── FAQ Accordion Item ───────────────────── */
const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    style={{
      borderBottom: '1px solid #E5E7EB',
      overflow: 'hidden',
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '1.5rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
        {question}
      </span>
      {isOpen ? (
        <ChevronUp size={20} color="#64748b" />
      ) : (
        <ChevronDown size={20} color="#64748b" />
      )}
    </button>
    <div
      style={{
        maxHeight: isOpen ? '200px' : '0',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease, opacity 0.3s ease',
      }}
    >
      <p
        style={{
          padding: '0 0 1.5rem',
          color: '#4B5563',
          lineHeight: 1.7,
          fontSize: '1rem',
          wordBreak: 'keep-all',
        }}
      >
        {answer}
      </p>
    </div>
  </div>
);

/* ───────────────────── Step Card ───────────────────── */
const StepCard = ({
  step,
  icon,
  title,
  desc,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      flex: '1 1 0',
      minWidth: '240px',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      textAlign: 'center',
      position: 'relative',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
    }}
  >
    {/* Step number badge */}
    <div
      style={{
        position: 'absolute',
        top: '-14px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        fontWeight: 800,
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(195,15,35,0.3)',
      }}
    >
      {step}
    </div>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '16px',
        backgroundColor: 'rgba(195, 15, 35, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
      }}
    >
      {icon}
    </div>
    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
      {title}
    </h3>
    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', wordBreak: 'keep-all' }}>
      {desc}
    </p>
  </div>
);

/* ───────────────────── About Page ───────────────────── */
const About: React.FC = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const faqs = [
    {
      q: '성적표는 어떤 형식으로 업로드해야 하나요?',
      a: '세종대학교 학사정보시스템에서 다운로드한 "기이수 성적표" 엑셀 파일(.xlsx)을 그대로 업로드하시면 됩니다. 별도의 가공이나 편집은 필요 없습니다.',
    },
    {
      q: '내 성적표 데이터는 안전한가요?',
      a: '네, 업로드된 성적표 파일은 분석 처리 후 서버에 저장되지 않으며, 학수번호/과목명/이수학점만 분석에 사용됩니다.',
    },
    {
      q: '분석 결과는 정확한가요?',
      a: '본 서비스는 세종대학교 공학인증 프로그램의 공식 가이드라인을 기반으로 개발되었습니다. 다만, 교과과정 변경이나 특수한 경우가 있을 수 있으므로 최종 확인은 소속 학과 사무실에 문의하시길 권장합니다.',
    },
    {
      q: '이 서비스는 공식 서비스인가요?',
      a: '본 서비스는 세종대학교의 공식 서비스가 아닌, 학생들의 편의를 위해 개발된 비공식 도구입니다. 참고용으로 활용하시기 바랍니다.',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, "Pretendard", sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* ─── 네비게이션 바 ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          zIndex: 1000,
        }}
      >
        <div
          style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
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
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          title="카카오톡 오픈채팅 문의"
        >
          <KakaoIcon size={26} />
        </a>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#4B5563',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            marginRight: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#4B5563')}
        >
          <ArrowLeft size={18} />
          홈으로
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
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#a30c1d')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
        >
          시작하기
        </button>
      </nav>

      {/* ─── 히어로 섹션: 개인 일화 인트로 ─── */}
      <section
        style={{
          padding: '160px 2rem 80px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(195,15,35,0.05) 0%, rgba(255,255,255,0) 100%)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            backgroundColor: 'rgba(195, 15, 35, 0.08)',
            color: 'var(--color-primary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '2rem',
          }}
        >
          <HelpCircle size={16} /> 서비스 소개
        </div>

        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-2px',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            wordBreak: 'keep-all',
          }}
        >
          <span style={{ color: 'var(--color-primary)' }}>이 서비스를 만든 이유</span>
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: '#4B5563',
            maxWidth: '700px',
            margin: '0 auto 4rem',
            lineHeight: 1.8,
            wordBreak: 'keep-all',
          }}
        >
          졸업이 가까워지면서 공학인증 이수체계도를 계속 확인해야 했습니다.
          <br />
          하지만 한눈에 들어오지 않는 정보로 공학인증에 대한 피로감만 쌓여갔습니다.
        </p>
      </section>

      {/* ─── 개인 일화 스토리 섹션 ─── */}
      <section style={{ padding: '0 2rem 6rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* 이수체계도 이미지 + 설명 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
              marginBottom: '4rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* 이미지 목업 */}
            <div
              style={{
                position: 'relative',
                flex: '0 0 auto',
                maxWidth: '440px',
                width: '100%',
              }}
            >
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
                  transform: 'rotate(-2deg)',
                  transition: 'transform 0.4s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'rotate(-2deg)')}
              >
                <img
                  src="/images/abeek-table.png"
                  alt="ABEEK 교과과정 이수체계도"
                  style={{
                    width: '100%',
                    display: 'block',
                  }}
                />
              </div>
              {/* 이미지 캡션 */}
              <div
                style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  color: '#94A3B8',
                  fontWeight: 500,
                }}
              >
                ▲ 전자정보통신공학과 18학년도 ABEEK 교과과정 이수체계도
              </div>
            </div>

            {/* 텍스트 스토리 */}
            <div style={{ flex: '1 1 340px', textAlign: 'left' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  color: '#991B1B',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                }}
              >
                😵 개발자의 실제 경험
              </div>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#1e293b',
                  lineHeight: 1.35,
                  marginBottom: '1.25rem',
                  wordBreak: 'keep-all',
                }}
              >
                선후수, 설계, 일반영역...
                <br />
                <span style={{ color: 'var(--color-primary)' }}>뭐가 이렇게 많은거지?</span>
              </h2>
              <p
                style={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                  marginBottom: '1rem',
                  wordBreak: 'keep-all',
                }}
              >
                전문교양 14학점, MSC 30학점, 전공 54학점…
                거기에 선후수 과목 조건, 설계 학점 조건까지
                <br />
              </p>
              <p
                style={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                  marginBottom: '1rem',
                  wordBreak: 'keep-all',
                }}
              >
                수기로 이수체계도와 내 성적표를 대조하다 보면 빠뜨리는 것이 생기고,
                학과 사무실에 여러 번 확인하는 일이 반복됐습니다.
              </p>
              <p
                style={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                  wordBreak: 'keep-all',
                }}
              >
                "이걸 자동으로 해주는 프로그램이 있다면 얼마나 좋을까?"
                <br />
                그 생각이 바로 이 서비스의 시작점이었습니다.
              </p>
            </div>
          </div>

          {/* 해결책 소개 카드 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
              borderRadius: '24px',
              padding: '3rem 3.5rem',
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(59,130,246,0.08)',
              border: '1px solid #BFDBFE',
            }}
          >
            {/* 학과별 이용자 수 차트 */}
            <div
              style={{
                flex: '0 0 auto',
                width: '280px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                { name: '전자정보통신공학과', count: 78 },
                { name: '컴퓨터공학과', count: 63 },
                { name: '소프트웨어학과', count: 26 },
                { name: '데이터사이언스학과', count: 17 },
              ].map((dept, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: '#475569' }}>{dept.name}</span>
                    <span style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{dept.count}명</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '10px',
                      backgroundColor: 'rgba(59,130,246,0.12)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${(dept.count / 79) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--color-primary) 0%, #DF3346 100%)',
                        borderRadius: '999px',
                        transition: 'width 0.6s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
              <div
                style={{
                  marginTop: '0.25rem',
                  textAlign: 'right',
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                  fontWeight: 600,
                }}
              >
                총 184명 이용
              </div>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  marginBottom: '0.75rem',
                  lineHeight: 1.35,
                }}
              >
                4개 학과, 4개월 간의 운영
              </h3>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  opacity: 0.85,
                  wordBreak: 'keep-all',
                }}
              >
                <span style={{ color: '#111827', fontWeight: 700 }}>2024년 9월부터 4개 학과를 대상으로 서비스를 운영했습니다.</span>
                {' '}이번 리뉴얼에서는 <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>선후수 조건, 설계 학점, 실험·실습 이수 등
                  공학인증의 세부 요건까지 검사하도록 알고리즘을 고도화</span>하여
                더욱 정확한 분석 결과를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 사용 방법 (How-to) ─── */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '1rem',
                letterSpacing: '-1px',
              }}
            >
              이용 방법
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <StepCard
              step={1}
              icon={<FileSpreadsheet size={28} color="var(--color-primary)" />}
              title="학과 선택 & 성적표 준비"
              desc="소속 학과를 선택하고, 세종대 학사정보시스템에서 '기이수 성적표' 엑셀 파일을 다운로드합니다."
            />
            <StepCard
              step={2}
              icon={<Upload size={28} color="var(--color-primary)" />}
              title="파일 업로드"
              desc="다운로드한 엑셀 파일을 업로드합니다."
            />
            <StepCard
              step={3}
              icon={<BarChart3 size={28} color="var(--color-primary)" />}
              title="결과 확인"
              desc="영역별 이수 현황, 부족한 학점, 미이수 필수 과목 등을 한눈에 확인할 수 있는 대시보드를 제공합니다."
            />
          </div>
        </div>
      </section>

      {/* ─── 핵심 기능 소개 ─── */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '1rem',
                letterSpacing: '-1px',
              }}
            >
              핵심 기능
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#6B7280', wordBreak: 'keep-all' }}>
              공학인증 검증에 필요한 모든 것을 하나의 서비스에 담았습니다.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              {
                icon: <BarChart3 size={24} color="#3B82F6" />,
                title: '직관적인 결과 대시보드',
                desc: '전체 이수 학점 진행률, 영역별 충족 상태를 시각적으로 확인할 수 있는 대시보드를 제공합니다.',
                bg: 'rgba(59, 130, 246, 0.06)',
                accent: '#3B82F6',
              },
              {
                icon: <CheckCircle2 size={24} color="var(--color-primary)" />,
                title: '정밀 분석 알고리즘',
                desc: '세종대 공학인증 이수체계도를 100% 반영한 알고리즘으로, 필수 과목 누락, 선수과목 미이수 등 세밀한 항목까지 검사합니다.',
                bg: 'rgba(195, 15, 35, 0.06)',
                accent: 'var(--color-primary)',
              },
              {
                icon: <Shield size={24} color="#10B981" />,
                title: '개인정보 보호',
                desc: '업로드된 성적 데이터는 분석 후 서버에 저장되지 않습니다. 로그인도 회원가입도 필요 없어 개인정보 노출 걱정이 없습니다.',
                bg: 'rgba(16, 185, 129, 0.06)',
                accent: '#10B981',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  padding: '2rem',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateX(6px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '14px',
                    backgroundColor: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: '#64748b',
                      lineHeight: 1.65,
                      fontSize: '0.95rem',
                      wordBreak: 'keep-all',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ 섹션 ─── */}
      <section style={{ padding: '6rem 2rem', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#111827',
                marginBottom: '1rem',
                letterSpacing: '-1px',
              }}
            >
              자주 묻는 질문
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#6B7280' }}>
              궁금한 점이 있으신가요?
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '0.5rem 2rem',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === idx}
                onToggle={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 하단 CTA ─── */}
      <section
        style={{
          padding: '6rem 2rem',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          지금 바로 확인해보세요
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
          복잡한 과정 없이, 1분이면 충분합니다.
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
          onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          무료로 분석 시작하기
        </button>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          backgroundColor: '#111827',
          color: '#9CA3AF',
        }}
      >
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

export default About;
