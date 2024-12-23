interface InfoProps {
    children: React.ReactNode;
}

export function Info({ children }: InfoProps) {
    return (
        <div className="my-6 rounded-lg bg-blue-50 dark:bg-blue-900/30 p-4 text-blue-900 dark:text-blue-200">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">{children}</div>
            </div>
        </div>
    );
} 