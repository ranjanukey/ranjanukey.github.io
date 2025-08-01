import React from 'react';

const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] rounded-lg ${className}`}>
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
    </div>
  );
};

const ProjectSkeleton = () => {
  return (
    <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
      <SkeletonLoader className="w-full h-[230px] mb-5" />
      <SkeletonLoader className="w-3/4 h-6 mb-2" />
      <SkeletonLoader className="w-full h-4 mb-2" />
      <SkeletonLoader className="w-5/6 h-4 mb-4" />
      <div className="flex gap-2">
        <SkeletonLoader className="w-16 h-5" />
        <SkeletonLoader className="w-20 h-5" />
        <SkeletonLoader className="w-14 h-5" />
      </div>
    </div>
  );
};

const ExperienceSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <SkeletonLoader className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <SkeletonLoader className="w-3/4 h-6 mb-2" />
          <SkeletonLoader className="w-1/2 h-4" />
        </div>
      </div>
      <SkeletonLoader className="w-full h-4 mb-2" />
      <SkeletonLoader className="w-5/6 h-4 mb-2" />
      <SkeletonLoader className="w-4/5 h-4" />
    </div>
  );
};

export { SkeletonLoader, ProjectSkeleton, ExperienceSkeleton };
export default SkeletonLoader;
