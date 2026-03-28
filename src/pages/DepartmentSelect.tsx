import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DepartmentSelect: React.FC = () => {
  const navigate = useNavigate();
  const { departmentName, setDepartmentName } = useAppContext();

  // 사용자 입력을 위한 대표적인 학과 예시 목록입니다.
  // 추후 백엔드나 설정 파일에서 배열로 받아오는 것으로 확장할 수 있습니다.
  const departments = [
    '전자정보통신공학과',
    '컴퓨터공학과',
    '정보보호학과',
    '소프트웨어학과',
    '데이터사이언스학과',
    '인공지능학과',
    '기계공학과',
    '우주항공공학과'
  ];

  const handleNext = () => {
    if (departmentName) {
      navigate('/upload');
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
        <School size={28} color="var(--color-primary)" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>소속 학과 선택</h2>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.5 }}>
        성적표 분석을 위해 <b>본인의 소속 학과</b>를 선택해 주세요.<br/>
        선택한 학과의 공학인증 이수체계에 맞춰 성적표를 검증합니다.
      </p>

      {/* 학과 선택 박스 영역 */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        alignContent: 'start',
        overflowY: 'auto',
        paddingRight: '0.5rem',
        marginBottom: '1rem'
      }}>
        {departments.map((dept) => {
          const isSelected = departmentName === dept;
          return (
            <div
              key={dept}
              onClick={() => setDepartmentName(dept)}
              style={{
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-color)'}`,
                backgroundColor: isSelected ? '#FEF2F2' : 'white',
                borderRadius: '12px',
                padding: '1.25rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                boxShadow: isSelected ? '0 4px 6px -1px rgba(195, 15, 35, 0.1)' : 'none',
              }}
              onMouseOver={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }
              }}
              onMouseOut={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {dept}
            </div>
          );
        })}
      </div>

      {/* 하단 네비게이션 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => navigate(-1)} // 뒤로가기
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ArrowLeft size={16} /> 이전
        </button>
        
        <button 
          onClick={handleNext}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: departmentName ? 1 : 0.5,
            pointerEvents: departmentName ? 'auto' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
        >
          다음 단계 <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default DepartmentSelect;
