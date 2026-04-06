'use client';

import React from 'react';

export const PremiumButton = () => {
  return (
    <button className="group /* Gradient Background */ /* Shadows */ /* Transitions */ /* Hover States */ flex w-fit cursor-pointer items-center gap-[0.4rem] rounded-[30px] border-none bg-[linear-gradient(15deg,#ddff00,#b8d100,#93a300,#6e7500,#ddff00,#b8d100,#93a300,#6e7500)] bg-size-[300%] bg-left px-10 py-[1.2em] font-bold text-black shadow-[0_30px_10px_-20px_rgba(221,255,0,0.2)] transition-[background,color] duration-300 ease-out [text-shadow:2px_2px_3px_rgba(221,255,0,0.3)] hover:bg-size-[320%] hover:bg-right">
      <svg
        viewBox="0 0 36 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[23px] fill-black transition-all duration-300 ease-out group-hover:fill-black"
      >
        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
      </svg>
      Premium
    </button>
  );
};

export default PremiumButton;
