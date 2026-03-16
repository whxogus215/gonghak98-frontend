import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 통합 레이아웃(중앙 정렬 카드 UI)
import StepLayout from './layouts/StepLayout';

// 5단계 페이지
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Upload from './pages/Upload';
import Loading from './pages/Loading';
import ResultDashboard from './pages/ResultDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모든 스텝 페이지는 공통된 StepLayout 블록 안에서 변경됩니다. */}
        <Route path="/" element={<StepLayout />}>
          
          {/* 최초 접속 화면 */}
          <Route index element={<Landing />} />
          
          {/* 단계벌 플로우 */}
          <Route path="quiz" element={<Quiz />} />
          <Route path="upload" element={<Upload />} />
          <Route path="loading" element={<Loading />} />
          <Route path="result" element={<ResultDashboard />} />
          
          {/* 잘못된 경로는 무조건 랜딩 페이지로 돌려보냅니다. */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
