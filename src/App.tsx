import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 통합 레이아웃(중앙 정렬 카드 UI)
import StepLayout from './layouts/StepLayout';

// 4단계 페이지 (Quiz 제외)
import Landing from './pages/Landing';
import DepartmentSelect from './pages/DepartmentSelect';
import Upload from './pages/Upload';
import Loading from './pages/Loading';
import ResultDashboard from './pages/ResultDashboard';
import About from './pages/About';

// 상태 상자(Context) Provider
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    // 라우터의 가장 최상단에 State 상자를 씌웁니다.
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* 풀스크린 마케팅 랜딩 페이지 */}
          <Route path="/" element={<Landing />} />

          {/* 서비스 소개 페이지 */}
          <Route path="/about" element={<About />} />

          {/* 나머지 스텝 페이지들은 공통된 StepLayout 블록 안에서 변경됩니다. */}
          <Route element={<StepLayout />}>
            <Route path="/department" element={<DepartmentSelect />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/result" element={<ResultDashboard />} />
          </Route>

          {/* 잘못된 경로는 무조건 랜딩 페이지로 돌려보냅니다. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
