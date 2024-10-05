import React from 'react';

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[200px] sm:h-[270px] md:h-[370px] bg-gray-200 rounded animate-pulse"></div>
      <div className="w-full h-4 sm:h-5 md:h-6 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

export default Skeleton;

