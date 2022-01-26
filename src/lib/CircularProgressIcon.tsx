export function CircularProgressIcon({
  progress,
  ...props
}: React.SVGProps<SVGSVGElement> & { progress: number }) {
  return (
    <svg
      height={24}
      width={24}
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        r={10}
        cx={14}
        cy={14}
        fill="white"
        stroke="#468def"
        strokeWidth={2}
      />
      <circle
        r={5}
        cx={14}
        cy={14}
        fill="transparent"
        stroke="#468def"
        strokeWidth={10}
        strokeDasharray={`calc(${progress * 100} * 3.14 / 10) 31.4`}
        transform="rotate(-90 14 14)"
      />
    </svg>
  );
}
