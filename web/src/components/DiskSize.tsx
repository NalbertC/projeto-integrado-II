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
    <div className=" rounded-md px-2 max-w-xs w-full flex flex-col gap-1">
      <div className={`border rounded-lg h-6 w-full flex items-center bg-slate-300 ${progress >= 90 ? 'border-red-500' : 'border-blue-400'}`}>
        <div className={`h-6  ${progress >= 90 ? 'bg-red-500 rounded-lg' : 'bg-blue-500 rounded-l-lg'}`} style={{ width: `${progress}%` }} />
      </div>
      <div className="w-full flex justify-between">
        <span>
          {formatarTamanho(calcularSomaTamanhos(files))} usados
        </span>

        <span>
          {formatarTamanho(totalSpace - usedSpace)} livres
        </span>

      </div>
    </div>
  );
};


