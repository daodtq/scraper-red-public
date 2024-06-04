import React from "react";
import './loading-screen.css';
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        {/* Bạn có thể sử dụng một thư viện CSS hoặc biểu tượng loading tùy ý ở đây */}
        Loading...
      </div>
    </div>
  );
};

export default LoadingScreen;
