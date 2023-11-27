interface FileNameProps {
  isHovered: boolean
  fileName: string
}

export function FileName({ isHovered, fileName }: FileNameProps) {
  return (
    <div
      className={`h-full text-center w-full break-words  ${isHovered ? '' : 'truncate'}`}
    >
      {fileName}
    </div>
  )
}