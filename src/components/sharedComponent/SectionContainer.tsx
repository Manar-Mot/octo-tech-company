import React, { forwardRef } from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  custom?: string;
}

const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ children, custom }, ref) => {
    return (
      <div ref={ref} className={`px-8 lg:px-20 relative py-[32px] ${custom && custom}`}>
        {children}
      </div>
    );
  }
);

export default SectionContainer;
