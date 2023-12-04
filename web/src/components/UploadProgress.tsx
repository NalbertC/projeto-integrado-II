import * as Progress from "@radix-ui/react-progress";

interface UploadProgressProps {
  progress: number
}

export function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <Progress.Root
      className="w-full h-6 rounded-md bg-gray-400 relative overflow-hidden "
      style={{ transform: "translateZ(0)" }}
      value={progress}
    >
      <Progress.Indicator
        className=" bg-blue-500 w-full h-full rounded-md transition"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />

    </Progress.Root>
  )
}