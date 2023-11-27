import { useEffect, useState } from 'react';
import { TFile, calcularSomaTamanhos, formatarTamanho } from '../pages/Home';

interface DiskSpaceProgressBarPros {
  usedSpace: number
  files: TFile[]
}

export const DiskSpaceProgressBar = ({ usedSpace, files }: DiskSpaceProgressBarPros) => {
  const [progress, setProgress] = useState(0);
  const totalSpace = 5 * 1024 * 1024 * 1024

  useEffect(() => {
    (() => {
      const availableSpace = totalSpace - usedSpace;
      const percentage = 100 - (availableSpace / totalSpace) * 100;
      setProgress(percentage);
    })()

  }, [usedSpace]);

  return (
    <div className="bg-gray-200 rounded-md p-4 w-full">
      <div className='border border-blue-400 rounded-lg h-6 w-full flex items-center bg-slate-300'>
        <div className="h-6 bg-blue-500 rounded-lg" style={{ width: `${progress}%` }} />
      </div>
      <div className="w-full flex justify-between font-bold">

        <span>
          {formatarTamanho(calcularSomaTamanhos(files))} usados
        </span>
        <span>
        {formatarTamanho(totalSpace)} disponíveis
        </span>

      </div>
    </div>
  );
};


