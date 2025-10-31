'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

type CopyButtonProps = {
  content: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
  onCopy?: (content: string) => void;
};

function CopyButton({
  content,
  size = 'default',
  variant = 'default',
  className,
  onCopy,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.(content);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'h-8 w-8 p-0',
        'bg-transparent hover:bg-white/20',
        className
      )}
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}

type CodeEditorProps = {
  children: string;
  lang?: string;
  title?: string;
  icon?: React.ReactNode;
  copyButton?: boolean;
  header?: boolean;
  dots?: boolean;
  className?: string;
  writing?: boolean;
  duration?: number;
  delay?: number;
  cursor?: boolean;
  onCopy?: (content: string) => void;
};

function CodeEditor({
  children: code,
  lang = 'html',
  title,
  icon,
  copyButton = true,
  header = true,
  dots = true,
  className,
  writing = false,
  duration = 3,
  delay = 0,
  cursor = false,
  onCopy,
}: CodeEditorProps) {
  const [visibleCode, setVisibleCode] = React.useState(writing ? '' : code);
  const [isDone, setIsDone] = React.useState(!writing);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'code' | 'preview'>('code');
  const editorRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!writing || !code.length) {
      setVisibleCode(code);
      setIsDone(true);
      return;
    }

    const characters = Array.from(code);
    let index = 0;
    const totalDuration = duration * 1000;
    const interval = totalDuration / characters.length;
    let intervalId: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < characters.length) {
          setVisibleCode((prev) => {
            const currentIndex = index;
            index += 1;
            return prev + characters[currentIndex];
          });
          
          // Auto scroll to bottom
          if (editorRef.current) {
            editorRef.current.scrollTop = editorRef.current.scrollHeight;
          }
        } else {
          clearInterval(intervalId);
          setIsDone(true);
        }
      }, interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalId);
    };
  }, [code, duration, delay, writing]);

  // Handle ESC key to exit fullscreen and hide navigation
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Hide header/navigation in fullscreen
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
    } else {
      document.body.style.overflow = '';
      
      // Show header/navigation when exiting fullscreen
      const header = document.querySelector('header');
      if (header) {
        header.style.display = '';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      
      // Restore header display
      const header = document.querySelector('header');
      if (header) {
        header.style.display = '';
      }
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Backdrop for fullscreen mode */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[99998]"
          onClick={() => setIsFullscreen(false)}
        />
      )}
      
      <div
        ref={containerRef}
        className={cn(
          'relative w-full border overflow-hidden flex flex-col shadow-2xl transition-all',
          isFullscreen 
            ? 'fixed inset-0 z-[99999] rounded-none bg-[#0d1117] border-none max-w-none' 
            : 'bg-[#0d1117] border-[#30363d] rounded-xl',
          !isFullscreen && className
        )}
      >
        {/* Fullscreen Header Bar */}
        {isFullscreen && (
          <div className="absolute top-0 left-0 right-0 h-14 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-4 z-[100000]">
            {/* Left Side: Title + Tabs */}
            <div className="flex items-center gap-4">
              {/* Title */}
              <div className="flex items-center gap-2">
                {icon && (
                  <div className="text-[#8b949e] [&_svg]:size-4">
                    {icon}
                  </div>
                )}
                <span className="text-[#c9d1d9] text-sm font-medium">
                  {title || "Embed Code"}
                </span>
              </div>
              
              {/* Tabs */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('code')}
                  className={cn(
                    'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                    activeTab === 'code'
                      ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  Code
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={cn(
                    'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                    activeTab === 'preview'
                      ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  Preview
                </button>
              </div>
            </div>
            
            {/* Right Side: Copy + Minimize + Exit Buttons */}
            <div className="flex items-center gap-2">
              {copyButton && activeTab === 'code' && (
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(code);
                  }}
                  className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 bg-transparent hover:bg-white/10 text-[#c9d1d9] hover:text-white transition-colors"
                  aria-label="Copy code"
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
              )}
              
              <button
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 bg-transparent hover:bg-white/10 text-[#c9d1d9] hover:text-white transition-colors"
                aria-label="Exit fullscreen"
                title="Exit fullscreen"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-transparent hover:bg-white/10 text-[#c9d1d9] hover:text-white text-sm font-medium transition-colors"
              >
                <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs">Esc</span>
                <span>Exit</span>
              </button>
            </div>
          </div>
        )}
        
        {header && !isFullscreen && (
          <div className="bg-[#161b22] border-b border-[#30363d]">
            <div className="relative flex flex-row items-center justify-between gap-x-2 h-12 px-4">
              {dots && (
                <div className="flex flex-row gap-x-2 flex-shrink-0">
                  <div className="size-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="size-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="size-3 rounded-full bg-[#27c93f]"></div>
                </div>
              )}
              
              {title && (
                <div
                  className={cn(
                    'flex flex-row items-center gap-2 overflow-hidden',
                    dots && 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  )}
                >
                  {icon && (
                    <div className="text-[#8b949e] [&_svg]:size-4 flex-shrink-0">
                      {icon}
                    </div>
                  )}
                  <span className="text-[#c9d1d9] text-sm font-medium truncate">
                    {title}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                {copyButton && activeTab === 'code' && (
                  <CopyButton
                    content={code}
                    size="sm"
                    variant="ghost"
                    className="text-[#c9d1d9] hover:text-white flex-shrink-0"
                    onCopy={onCopy}
                  />
                )}
                
                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 bg-transparent hover:bg-white/20 text-[#c9d1d9] hover:text-white transition-colors flex-shrink-0"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  title={isFullscreen ? 'Exit fullscreen (ESC)' : 'Enter fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Tabs - shadcn.io style */}
            <div className="flex items-center gap-1 border-t border-[#30363d] px-3 py-1.5">
              <button
                onClick={() => setActiveTab('code')}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                  activeTab === 'code'
                    ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                Code
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                  activeTab === 'preview'
                    ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Preview
              </button>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        {activeTab === 'code' ? (
          <div 
            ref={editorRef}
            className={cn(
              'w-full font-mono text-sm overflow-auto',
              isFullscreen ? 'h-[calc(100vh-3.5rem)] mt-14 p-8' : 'min-h-[200px] max-h-96 p-6'
            )}
            dir="ltr"
          >
            <pre className={cn(
              "text-[#7ee787] whitespace-pre-wrap break-words relative leading-relaxed w-full",
              isFullscreen && "text-base"
            )} dir="ltr">
              <code dir="ltr" className={cn(
                "block w-full",
                isFullscreen ? "text-base" : "text-sm"
              )}>
                {visibleCode || (writing ? '' : code)}
                {cursor && !isDone && (
                  <span className="inline-block w-[2px] h-4 bg-[#7ee787] animate-pulse ml-0.5 align-middle"></span>
                )}
              </code>
            </pre>
          </div>
        ) : (
          <div 
            className={cn(
              'w-full overflow-auto',
              'bg-gradient-to-br from-white to-gray-50 dark:from-[#0d1117] dark:to-[#161b22]',
              isFullscreen ? 'h-[calc(100vh-3.5rem)] mt-14 p-12' : 'min-h-[400px] max-h-[600px] p-8'
            )}
          >
            <div 
              className={cn(
                "w-full h-full flex items-center justify-center bg-white dark:bg-[#0d1117] rounded-lg shadow-lg border border-gray-200 dark:border-[#30363d]",
                isFullscreen ? "p-8" : "p-4"
              )}
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export { CodeEditor, CopyButton, type CodeEditorProps, type CopyButtonProps };

