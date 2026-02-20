import React from "react";

interface BGContainerProps {
  children: React.ReactNode;
}

const BGContainer: React.FC<BGContainerProps> = ({ children }) => {
  return (
    <div className="main-wrapper">
      <div className="gradient-bg">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="interactive"></div>
      </div>

      <div className="grid-overlay"></div>

      <main className="content-layer">{children}</main>
    </div>
  );
};

export default BGContainer;
