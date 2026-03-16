import React from 'react';
import { UserCircle, BookOpen, Award } from 'lucide-react';

const StudentInfoCard: React.FC = () => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <UserCircle size={28} color="var(--color-primary)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>학생 정보</h3>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
        <div style={{ flex: '1 1 200px', backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>이름 / 학번</p>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>김세종 (19000001)</p>
        </div>
        
        <div style={{ flex: '1 1 200px', backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <BookOpen size={16} color="var(--text-secondary)" />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>소속 학과</p>
          </div>
          <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>소프트웨어학과 (심화)</p>
        </div>
        
        <div style={{ flex: '1 1 200px', backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Award size={16} color="var(--text-secondary)" />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>공학인증 상태</p>
          </div>
          <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-warning)' }}>이수 진행 중</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
