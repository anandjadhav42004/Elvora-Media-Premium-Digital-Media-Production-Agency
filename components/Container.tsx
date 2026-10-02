type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

/**
 * One consistent page container.
 * max-w: 1440px | px: 20px mobile → clamp(24px, 4vw, 64px) desktop
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-[clamp(24px,4vw,64px)] ${className}`}
    >
      {children}
    </div>
  );
}
