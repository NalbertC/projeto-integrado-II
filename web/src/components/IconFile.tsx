import { FileIcon, defaultStyles } from 'react-file-icon';

interface IconFileProps {
  fileName: string
}

export function IconFile({ fileName }: IconFileProps) {
  const extension = fileName.split('.').pop();


  return (

    <div className={`w-[92px] `}>
      <FileIcon extension={extension}  {...defaultStyles[`${extension}`] } />

    </div>
  )
}

