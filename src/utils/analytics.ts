import ReactGA from 'react-ga4';

// GA4 측정 ID — 환경변수에서 불러옴
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string;

/**
 * GA4 초기화.
 * 측정 ID가 없으면 초기화를 건너뜀 (개발 환경 등).
 */
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('[Analytics] VITE_GA_MEASUREMENT_ID가 설정되지 않았습니다. GA4를 초기화하지 않습니다.');
    return;
  }
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

/**
 * 페이지뷰 이벤트 전송.
 */
export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.send({ hitType: 'pageview', page: path });
};

/**
 * 커스텀 이벤트 전송.
 */
export const trackEvent = (category: string, action: string, label?: string) => {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.event({
    category,
    action,
    label,
  });
};
