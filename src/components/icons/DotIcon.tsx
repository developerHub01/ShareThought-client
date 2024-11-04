const DotIcon = ({
  size = 24,
  strokeWidth = 5,
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${size}`}
    height={`${size}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={`${strokeWidth}`}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-dot ${className}`}
  >
    <circle cx="12.1" cy="12.1" r="1" />
  </svg>
);

export default DotIcon;
