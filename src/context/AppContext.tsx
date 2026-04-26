import React, { createContext, useContext, useState, type ReactNode } from 'react';

// 백엔드에서 넘겨줄 분석 결과의 데이터 형태(타입)를 정의합니다.
// 타입스크립트의 장점: 이 형태를 벗어난 데이터가 들어오면 코드를 짤 때 즉시 에러가 납니다.
export interface Course {
  courseCode: string;
  courseName: string;
  year: number;
  semester: number;
  credit: number;
}

export interface CreditSummary {
  areaType: string;
  completedCredits: number;
  requiredCredits: number;
  relatedCourses: Course[];
}

export interface PassResult {
  areaType: string;
  isPassed: boolean;
}

export interface NonPassResult {
  courseCode: string;
  courseName: string;
  year: number;
  semester: number;
  credit: number;
  reason: string;
}

export interface AnalysisResult {
  id: string | null;
  studentName?: string;
  studentId?: string;
  passResults: PassResult[];
  nonPassResults: NonPassResult[];
  creditSummaries: CreditSummary[];
}

// 이 '상자(Context)'가 보관할 정보의 구조를 정의합니다.
interface AppContextType {
  departmentName: string | null;
  setDepartmentName: (name: string | null) => void;
  entranceYear: string | null;
  setEntranceYear: (year: string | null) => void;
  file: File | null;             // 업로드 한 파일 객체
  setFile: (file: File | null) => void;
  result: AnalysisResult | null; // 백엔드에서 받은 결과 JSON
  setResult: (result: AnalysisResult | null) => void;
}

// 초기값이 비어있는 진짜 'Context 상자'를 생성합니다.
const AppContext = createContext<AppContextType | undefined>(undefined);

// 이 상자를 전역(App.tsx 수준)에서 쓸 수 있도록 감싸주는 덮개 컴포넌트입니다.
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [departmentName, setDepartmentName] = useState<string | null>(null);
  const [entranceYear, setEntranceYear] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <AppContext.Provider value={{ departmentName, setDepartmentName, entranceYear, setEntranceYear, file, setFile, result, setResult }}>
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
