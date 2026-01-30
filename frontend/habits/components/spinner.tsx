type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={`h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-500 ${
        className ?? ""
      }`}
      aria-label="Loading"
      role="status"
    />
  );
}

export default Spinner;
