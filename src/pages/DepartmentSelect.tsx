import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DepartmentSelect: React.FC = () => {
  const navigate = useNavigate();
  const { departmentName, setDepartmentName, entranceYear, setEntranceYear } = useAppContext();

  // 사용자 입력을 위한 대표적인 학과 예시 목록입니다.
  const departments = [
    '전자정보통신공학과'
  ];

  // 최근 학번 리스트 (2024 ~ 2025)
  const entranceYears = Array.from({ length: 2 }, (_, i) => String(2025 - i));

  const handleNext = () => {
    if (departmentName && entranceYear) {
      navigate('/upload');
    }
  };

  return (
    <div style={{
      padding: '2rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <School size={28} color="var(--color-primary)" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>기본 정보 입력</h2>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.5 }}>
        정확한 성적표 분석을 위해 본인의 <b>소속 학과와 입학년도</b>를 선택해 주세요.<br />
        입학년도에 따라 공학인증 이수 기준이 달라집니다.
      </p>

      {/* 학과 선택 박스 영역 */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <School size={20} color="var(--color-primary)" />
        1. 소속 학과
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '0.75rem',
        marginBottom: '2.5rem'
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
                padding: '1rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                boxShadow: isSelected ? '0 4px 6px -1px rgba(195, 15, 35, 0.1)' : 'none',
              }}
            >
              {dept}
            </div>
          );
        })}
      </div>

      {/* 입학년도 선택 박스 영역 */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <User size={20} color="var(--color-primary)" />
        2. 입학년도
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        {entranceYears.map((year) => {
          const isSelected = entranceYear === year;
          return (
            <div
              key={year}
              onClick={() => setEntranceYear(year)}
              style={{
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-color)'}`,
                backgroundColor: isSelected ? '#FEF2F2' : 'white',
                borderRadius: '8px',
                padding: '0.75rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                boxShadow: isSelected ? '0 4px 6px -1px rgba(195, 15, 35, 0.1)' : 'none',
              }}
            >
              {year}년
            </div>
          );
        })}
      </div>

      {/* 하단 네비게이션 버튼 영역 */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={() => navigate(-1)}
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
            opacity: (departmentName && entranceYear) ? 1 : 0.5,
            pointerEvents: (departmentName && entranceYear) ? 'auto' : 'none',
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

