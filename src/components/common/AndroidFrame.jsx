import React from 'react';

export const AndroidFrame = ({ children, isDark = true }) => {
  return (
    <div className="flex items-center justify-center p-2 sm:p-4 w-full">
      <div
        className="w-full max-w-[384px] h-[800px] rounded-[40px] overflow-hidden flex flex-col relative border border-[rgba(var(--lineRGB),0.12)] shadow-2xl transition-all"
        style={{
          background: 'var(--bg)',
          color: 'var(--fg)',
          boxShadow: isDark
            ? '0 30px 80px -15px rgba(0, 0, 0, 0.8), 0 0 0 1.5px rgba(255, 255, 255, 0.12)'
            : '0 25px 60px -15px rgba(0, 0, 0, 0.18), 0 0 0 1.5px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Android Punch Hole & Status Bar */}
        <div className="px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono font-medium text-[rgba(var(--fgRGB),0.6)] select-none shrink-0 z-20">
          <span>9:41</span>
          <div className="w-3.5 h-3.5 rounded-full bg-[rgba(var(--bgRGB),0.9)] border border-[rgba(var(--lineRGB),0.2)] shadow-inner" />
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">4G</span>
            <div className="w-5 h-2.5 border border-[rgba(var(--fgRGB),0.6)] rounded-xs p-0.5 flex items-center">
              <div className="h-full bg-[var(--fg)] w-4/5 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col relative">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <div className="h-4 flex items-center justify-center shrink-0 z-20">
          <div className="w-24 h-1 rounded-full bg-[rgba(var(--fgRGB),0.3)]" />
        </div>
      </div>
    </div>
  );
};
