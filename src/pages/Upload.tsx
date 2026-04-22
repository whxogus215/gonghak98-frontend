import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, FileText, CheckCircle, Info } from 'lucide-react';

// 전역 상태 상자를 꺼내오기 위한 Hook
import { useAppContext } from '../context/AppContext';

const Upload: React.FC = () => {
  const navigate = useNavigate();

  const { departmentName, entranceYear, file, setFile } = useAppContext();

  // 사용자가 학과나 입학년도를 선택하지 않고 바로 넘어온 경우 방어
  useEffect(() => {
    if (!departmentName || !entranceYear) {
      alert('소속 학과 및 입학년도를 먼저 선택해주세요.');
      navigate('/department');
    }
  }, [departmentName, entranceYear, navigate]);

  // 숨겨진 원본 file input을 조작하기 위한 껍데기 함수 (선택 창 띄우기)
  const handleUploadClick = () => {
    document.getElementById('hiddenFileInput')?.click();
  };

  // 파일이 첨부되었을 때 실행되는 1차 검증 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // 방어막 1: 파일 용량 제한 (5MB)
      const MAX_SIZE = 5 * 1024 * 1024;
      if (selectedFile.size > MAX_SIZE) {
        alert('파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다.');
        return; // 백엔드로 넘기지 않고 여기서 차단!
      }

      // 방어막 2: 확장자 및 진짜 MIME 타입(파일 조작 방지) 동시 검사 (오직 엑셀만 허용)
      const validExtensions = ['.xlsx', '.xls'];
      const validMimeTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
      ];

      const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));

      // 확장자도 맞으면서 브라우저가 인식한 진짜 파일 속성(type)도 허용 목록에 있어야 통과
      if (!validExtensions.includes(fileExtension) || (selectedFile.type && !validMimeTypes.includes(selectedFile.type))) {
        alert('지원하지 않는 파일 형식입니다. 조작되지 않은 정상적인 엑셀(XLSX) 파일만 올려주세요.');
        return;
      }

      // 모든 검증을 통과한 깨끗한 파일만 상자(Context) 안에 넣습니다.
      setFile(selectedFile);
    }
  };

  // 다음 단계로 넘어가기 전 로딩 처리
  const handleNext = () => {
    if (file) {
      // Loading 페이지로 이동하면, Loading 페이지가 알아서 상자 안의 파일을 꺼내 서버로 보낼 것입니다!
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
        세종대학교 포털사이트에서 다운로드 받은 '기이수성적조회(Excel)' 파일을 아래에 업로드해주세요.<br />
        업로드 된 파일은 분석 즉시 파기됩니다.
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
          if (!file) e.currentTarget.style.backgroundColor = '#FEE2E2';
        }}
        onMouseOut={(e) => {
          if (!file) e.currentTarget.style.backgroundColor = '#FEF2F2';
        }}
      >
        {/* 숨김 처리된 실제 HTML 첨부 인풋 박스 */}
        <input
          id="hiddenFileInput"
          type="file"
          accept=".xlsx,.xls"
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>지원되는 파일 형식: .xlsx</p>
            </div>
          </>
        )}
      </div>

      {/* 상시 노출 안내 요소 (Callout Box) */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#F8FAFC',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <Info size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
            기이수 성적표 다운로드 방법
          </h3>
          <ol style={{
            margin: 0,
            paddingLeft: '1.2rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}>
            <li>세종대학교 포털에 로그인하여 학사정보시스템에 접속합니다.</li>
            <li><strong>[수업/성적] - [성적 및 강의평가] - [기이수성적조회]</strong> 페이지에서 성적 파일 다운로드가 가능합니다.</li>
          </ol>
        </div>
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
