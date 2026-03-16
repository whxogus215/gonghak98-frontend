import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, FileText, CheckCircle } from 'lucide-react';

const Upload: React.FC = () => {
  const navigate = useNavigate();
  // 선택된 파일 정보를 가지고 있는 state
  const [file, setFile] = useState<File | null>(null);

  // 숨겨진 원본 file input을 조작하기 위한 껍데기 함수 (선택 창 띄우기)
  const handleUploadClick = () => {
    document.getElementById('hiddenFileInput')?.click();
  };

  // 파일이 첨부되었을 때 실행되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 다음 단계로 넘어가기 전 로딩 처리
  const handleNext = () => {
    if (file) {
      // 나중에 이 부분에서 실제 백엔드 API 서버로 파일을 전송(Fetch) 하는 로직이 들어갑니다.
      navigate('/loading'); 
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
        <FileText size={28} color="var(--color-primary)" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>기이수 성적표 업로드</h2>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.5 }}>
        학교 포털사이트에서 다운로드 받은 '기이수 성적표(PDF 혹은 Excel)' 파일을 아래에 업로드해주세요.<br/>
        문서 및 개인정보는 분석 즉시 파기됩니다.
      </p>

      {/* 업로드 박스 (점선 영역) */}
      <div 
        onClick={handleUploadClick}
        style={{
          border: `2px dashed ${file ? 'var(--color-success)' : 'var(--color-primary-light)'}`,
          backgroundColor: file ? '#F0FDF4' : '#FEF2F2',
          borderRadius: '16px',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flex: 1
        }}
        onMouseOver={(e) => {
          if(!file) e.currentTarget.style.backgroundColor = '#FEE2E2';
        }}
        onMouseOut={(e) => {
          if(!file) e.currentTarget.style.backgroundColor = '#FEF2F2';
        }}
      >
        {/* 숨김 처리된 실제 HTML 첨부 인풋 박스 */}
        <input 
          id="hiddenFileInput"
          type="file" 
          accept=".pdf,.xlsx,.csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {file ? (
          <>
            <CheckCircle size={48} color="var(--color-success)" />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-success)', marginBottom: '0.5rem' }}>업로드 완료</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <File size={16} />
                <span>{file.name}</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>클릭하여 다른 파일 선택</p>
          </>
        ) : (
          <>
            <UploadCloud size={48} color="var(--color-primary)" />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>클릭하여 성적표 파일 찾기</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>지원되는 파일 형식: PDF, XLSX, CSV</p>
            </div>
          </>
        )}
      </div>

      {/* 하단 네비게이션 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => navigate(-1)} // 뒤로가기
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          이전으로
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
            opacity: file ? 1 : 0.5,
            pointerEvents: file ? 'auto' : 'none',
          }}
        >
          제출 및 분석 시작
        </button>
      </div>
    </div>
  );
};

export default Upload;
