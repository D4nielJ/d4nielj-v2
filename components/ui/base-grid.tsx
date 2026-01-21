export function BaseGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in container mx-auto duration-500 lg:max-w-7xl lg:flex lg:justify-center lg:gap-10">
      {children}
    </div>
  );
}

export function LeftGridColumn({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-fit px-4 lg:w-52 lg:sticky lg:top-24 lg:shrink-0 lg:px-0 lg:pl-4">
      {children || null}
    </div>
  );
}

export function RightGridColumn({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-fit px-4 lg:w-52 lg:sticky lg:top-24 lg:shrink-0 lg:px-0 lg:pr-4">
      {children || null}
    </div>
  );
}

export function MainGridColumn({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl flex-1 px-4">{children || null}</div>
  );
}

export default BaseGrid;
