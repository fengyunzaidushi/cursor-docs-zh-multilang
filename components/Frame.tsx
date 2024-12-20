interface FrameProps {
    children: React.ReactNode;
    className?: string;
}

export function Frame({ children, className = '' }: FrameProps) {
    return (
        <div className={`overflow-hidden rounded-lg border bg-background ${className}`}>
            {children}
        </div>
    );
} 