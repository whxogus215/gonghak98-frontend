import React from 'react';

const KakaoIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <rect width="256" height="256" rx="60" fill="#FEE500" />
    <path
      d="M128 36C75.6 36 33.2 68.4 33.2 108.4C33.2 134.8 50.4 158 76.4 170.8L66.8 209.2C66 212 69.2 214.4 71.6 212.8L117.2 183.2C120.8 183.6 124.4 183.6 128 183.6C180.4 183.6 222.8 151.2 222.8 111.2C222.8 68.4 180.4 36 128 36Z"
      fill="#3C1E1E"
    />
  </svg>
);

export default KakaoIcon;
