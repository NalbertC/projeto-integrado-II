import { useEffect, useState } from 'react';

interface T {
  usedSpace: number
}

export const DiskSpaceProgressBar = ( {usedSpace}: T) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const totalSpace = 1073741824
      const availableSpace = totalSpace - usedSpace;
      const percentage = (availableSpace / totalSpace) * 100;
      setProgress(percentage);
    };

    calculateProgress();
  }, [ usedSpace]);

  return (
    <div className="bg-gray-200 rounded-md p-1">
      <div className="h-6 bg-blue-500 rounded-md" style={{ width: `${progress}%` }} />
      <div className="text-white text-center pt-1">{`${progress.toFixed(2)}%`}</div>
    </div>
  );
};