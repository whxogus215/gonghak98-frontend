import React, { createContext, useContext, useState, type ReactNode } from 'react';

// 백엔드에서 넘겨줄 분석 결과의 데이터 형태(타입)를 정의합니다.
// 타입스크립트의 장점: 이 형태를 벗어난 데이터가 들어오면 코드를 짤 때 즉시 에러가 납니다.
export interface DetailItem {
  category: string;
  target: number;
  current: number;
  status: 'PASS' | 'FAIL_REMAINING';
}

export interface AnalysisResult {
  studentName: string;
  studentId: string;
  totalTargetCredit: number;
  totalCurrentCredit: number;
  details: DetailItem[];
}

// 이 '상자(Context)'가 보관할 정보의 구조를 정의합니다.
interface AppContextType {
  file: File | null;             // 업로드 한 파일 객체
  setFile: (file: File | null) => void;
  result: AnalysisResult | null; // 백엔드에서 받은 결과 JSON
  setResult: (result: AnalysisResult | null) => void;
}

// 초기값이 비어있는 진짜 'Context 상자'를 생성합니다.
const AppContext = createContext<AppContextType | undefined>(undefined);

// 이 상자를 전역(App.tsx 수준)에서 쓸 수 있도록 감싸주는 덮개 컴포넌트입니다.
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <AppContext.Provider value={{ file, setFile, result, setResult }}>
      {children}
    </AppContext.Provider>
  );
};

// 다른 컴포넌트(Upload.tsx 등)에서 이 상자를 쉽게 열어볼 수 있도록 돕는 커스텀 스위치(Hook)입니다.
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
