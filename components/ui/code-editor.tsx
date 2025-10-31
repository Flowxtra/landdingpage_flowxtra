'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check, Maximize2, Minimize2, Monitor, Tablet, Smartphone } from 'lucide-react';

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
        copied ? 'text-green-500' : '',
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
  const [activeTab, setActiveTab] = React.useState<'code' | 'preview' | 'customization'>('code');
  const [customizationTab, setCustomizationTab] = React.useState<'settings' | 'design' | 'included-jobs'>('settings');
  const [isCopied, setIsCopied] = React.useState(false);
  const [previewDevice, setPreviewDevice] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const editorRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Device dimensions for preview
  const deviceDimensions = {
    mobile: { width: '375px', height: '667px', label: 'Mobile (375x667)' },
    tablet: { width: '768px', height: '1024px', label: 'Tablet (768x1024)' },
    desktop: { width: '100%', height: '100%', label: 'Desktop (Full Width)' },
  };

  // Auto-enable fullscreen when switching to Preview or Customization tab
  React.useEffect(() => {
    if (activeTab === 'preview' || activeTab === 'customization') {
      setIsFullscreen(true);
    }
    // Don't auto-disable fullscreen when switching to Code tab
    // User must manually click minimize button to exit fullscreen
  }, [activeTab]);

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

  // State for Shiki syntax highlighting
  const [highlightedCode, setHighlightedCode] = React.useState<string>('');
  const [isLoadingHighlight, setIsLoadingHighlight] = React.useState(true);

  // Highlight code using Shiki with vibrant colors
  React.useEffect(() => {
    const loadHighlightedCode = async () => {
      try {
        const { codeToHtml } = await import('shiki');
        
        const html = await codeToHtml(code, {
          lang: lang,
          themes: {
            light: 'min-light',
            dark: 'one-dark-pro',
          },
        });
        
        setHighlightedCode(html);
        setIsLoadingHighlight(false);
      } catch (error) {
        console.error(`Failed to highlight code for language "${lang}":`, error);
        // Fallback to plain code
        setHighlightedCode(`<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
        setIsLoadingHighlight(false);
      }
    };
    
    if (code) {
      loadHighlightedCode();
    }
  }, [code, lang]);

  // Handle copy with visual feedback
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
                <button
                  onClick={() => setActiveTab('customization')}
                  className={cn(
                    'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                    activeTab === 'customization'
                      ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  Customization
                </button>
              </div>
            </div>
            
            {/* Right Side: Exit -> Copy -> Toggle Fullscreen */}
            <div className="flex items-center gap-2">
              {/* Exit (first) */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-transparent hover:bg-white/10 text-[#c9d1d9] hover:text-white text-sm font-medium transition-colors"
              >
                <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs">Esc</span>
                <span>Exit</span>
              </button>

              {/* Copy (second) */}
              {copyButton && activeTab === 'code' && (
                <button
                  onClick={handleCopy}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md h-8 w-8 p-0 bg-transparent hover:bg-white/10 transition-colors",
                    isCopied ? "text-green-500" : "text-[#c9d1d9] hover:text-white"
                  )}
                  aria-label="Copy code"
                  title="Copy code"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}

              {/* Toggle Fullscreen: Maximize/Minimize (third) */}
              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center justify-center rounded-md h-8 w-8 p-0 bg-transparent hover:bg-white/10 text-[#c9d1d9] hover:text-white transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
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
              <button
                onClick={() => setActiveTab('customization')}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                  activeTab === 'customization'
                    ? 'bg-[#238636] text-white hover:bg-[#2ea043]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]'
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Customization
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
            {isLoadingHighlight ? (
              <pre className={cn(
                "text-[#7ee787] whitespace-pre-wrap break-words relative leading-relaxed w-full",
                isFullscreen && "text-base"
              )} dir="ltr">
                <code dir="ltr" className={cn(
                  "block w-full",
                  isFullscreen ? "text-base" : "text-sm"
                )}>
                  {visibleCode || (writing ? '' : code)}
                </code>
              </pre>
            ) : (
              <div
                className={cn(
                  "whitespace-pre-wrap break-words relative w-full",
                  // Remove default Shiki styles
                  "[&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!overflow-visible",
                  "[&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!font-mono [&_code]:!text-sm [&_code]:!leading-relaxed",
                  "[&_.shiki]:!bg-transparent [&_.shiki]:!font-mono",
                  // Dark mode support (like shadcn.io)
                  "dark:[&_.shiki]:!text-[var(--shiki-dark)]",
                  "dark:[&_.shiki]:!bg-transparent",
                  "dark:[&_.shiki_span]:!text-[var(--shiki-dark)]",
                  "dark:[&_.shiki_span]:![font-style:var(--shiki-dark-font-style)]",
                  "dark:[&_.shiki_span]:![font-weight:var(--shiki-dark-font-weight)]",
                  // Better text rendering
                  "[&_code]:!text-[14px]",
                  "[&_code]:!leading-[1.8]",
                  isFullscreen && "[&_code]:!text-[15px]"
                )}
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            )}
          </div>
        ) : activeTab === 'preview' ? (
          <div 
            className={cn(
              'w-full bg-gray-100 dark:bg-[#0d1117]',
              isFullscreen ? 'h-[calc(100vh-3.5rem)] mt-14' : 'min-h-[400px] max-h-[600px]'
            )}
          >
            {/* Device selector buttons */}
            <div className="flex items-center justify-center gap-2 bg-white dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] px-4 py-3">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  previewDevice === 'mobile'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-[#0d1117] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
                <span className="text-xs opacity-75">(375px)</span>
              </button>
              
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  previewDevice === 'tablet'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-[#0d1117] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <Tablet className="h-4 w-4" />
                <span>Tablet</span>
                <span className="text-xs opacity-75">(768px)</span>
              </button>
              
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  previewDevice === 'desktop'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-[#0d1117] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <Monitor className="h-4 w-4" />
                <span>Desktop</span>
                <span className="text-xs opacity-75">(Full)</span>
              </button>
            </div>

            {/* Preview container */}
            <div className="w-full h-[calc(100%-3.5rem)] overflow-auto flex items-center justify-center p-6">
              <div 
                className={cn(
                  'bg-white dark:bg-[#0d1117] shadow-2xl transition-all duration-300',
                  previewDevice !== 'desktop' && 'border border-gray-300 dark:border-[#30363d] rounded-lg overflow-hidden'
                )}
                style={{
                  width: deviceDimensions[previewDevice].width,
                  height: deviceDimensions[previewDevice].height,
                  maxHeight: previewDevice === 'desktop' ? '100%' : '90%',
                }}
              >
                <div 
                  className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: code }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div 
            className={cn(
              'w-full overflow-auto',
              isFullscreen ? 'h-[calc(100vh-3.5rem)] mt-14' : 'min-h-[400px] max-h-[600px]'
            )}
          >
            {/* Sub-tabs for Customization */}
            <div className="bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-[#30363d] px-6 py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomizationTab('settings')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    customizationTab === 'settings'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  Settings
                </button>
                <button
                  onClick={() => setCustomizationTab('design')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    customizationTab === 'design'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  Design
                </button>
                <button
                  onClick={() => setCustomizationTab('included-jobs')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    customizationTab === 'included-jobs'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  Included Jobs
                </button>
              </div>
            </div>

            {/* Content for sub-tabs */}
            <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-[#0d1117] dark:to-[#161b22]">
              {customizationTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-primary dark:text-primary mb-2">
                      Language
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Choose the language of the widget interface elements.
                    </p>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option>English</option>
                      <option>Arabic</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                  </div>

                  {/* Jobs per page */}
                  <div>
                    <label className="block text-sm font-medium text-primary dark:text-primary mb-2">
                      Jobs per page
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Define the number of jobs to be listed per page.
                    </p>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>25</option>
                    </select>
                  </div>

                  {/* Category filter */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Category filter
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Users can narrow the jobs listed down to a specific category.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Department filter */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Department filter
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Users can narrow the jobs listed down to a specific department.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Location filter */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Location filter
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Users can narrow the jobs listed down to a specific location.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Employment type filter */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Employment type filter
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Users can narrow the jobs listed down to a specific employment type.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Logo */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Logo
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your company logo is displayed next to each job (on desktop only).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Location */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Location
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Location is displayed for each job.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Salary */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Salary
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Salary is displayed.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Employment type */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Employment type
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Employment type is displayed for each job.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Category */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Category
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Category is displayed for each job.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Job Workplace */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Job Workplace
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display the job workplace type (Remote, On-site, Hybrid).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Show Job Date */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Show Job Date
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display the date when the job was posted.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Number of Employees */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Number of Employees
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display the number of employees at the company.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Company Category */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Company Category
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display the company's industry category.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Company Name */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Company Name
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display the company name in job listings.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* About Company */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        About Company
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display company description and information.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Benefits */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Benefits
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display company benefits and perks.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Company Values */}
                  <div className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Company Values
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display company values and culture.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Company Media */}
                  <div className="flex items-start justify-between py-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primary dark:text-primary mb-1">
                        Company Media
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display company photos and media content.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              )}

              {customizationTab === 'design' && (
                <div className="space-y-6 max-w-2xl">
                  {/* Background */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-primary dark:text-primary">
                      Background
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input 
                          type="color" 
                          defaultValue="#FFFFFF" 
                          className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          style={{ padding: '2px' }}
                        />
                      </div>
                      <input 
                        type="text" 
                        defaultValue="#FFFFFF" 
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Filter Borders */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-primary dark:text-primary">
                      Filter Borders
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input 
                          type="color" 
                          defaultValue="#D4D4D8" 
                          className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          style={{ padding: '2px' }}
                        />
                      </div>
                      <input 
                        type="text" 
                        defaultValue="#D4D4D8" 
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-primary dark:text-primary">
                      Pagination
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input 
                          type="color" 
                          defaultValue="#2563EB" 
                          className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                          style={{ padding: '2px' }}
                        />
                      </div>
                      <input 
                        type="text" 
                        defaultValue="#2563EB" 
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
                      Job Card Styles
                    </h4>

                    {/* Job Card Background */}
                    <div className="flex items-center justify-between mb-6">
                      <label className="text-sm font-medium text-primary dark:text-primary">
                        Background
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input 
                            type="color" 
                            defaultValue="#F8F8F8" 
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                            style={{ padding: '2px' }}
                          />
                        </div>
                        <input 
                          type="text" 
                          defaultValue="#F8F8F8" 
                          className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Job Card Border */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-primary dark:text-primary">
                          Border
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <div className="relative">
                          <input 
                            type="color" 
                            defaultValue="#AAAAAA" 
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                            style={{ padding: '2px' }}
                          />
                        </div>
                        <input 
                          type="text" 
                          defaultValue="#AAAAAA" 
                          className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Job Card Shadow */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-primary dark:text-primary">
                          Shadow
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <div className="relative">
                          <input 
                            type="color" 
                            defaultValue="#0000004D" 
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                            style={{ padding: '2px' }}
                          />
                        </div>
                        <input 
                          type="text" 
                          defaultValue="#0000004D" 
                          className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Primary Text */}
                    <div className="flex items-center justify-between mb-6">
                      <label className="text-sm font-medium text-primary dark:text-primary">
                        Primary Text
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input 
                            type="color" 
                            defaultValue="#FFFFFF" 
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                            style={{ padding: '2px' }}
                          />
                        </div>
                        <input 
                          type="text" 
                          defaultValue="#FFFFFF" 
                          className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Secondary Text */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-primary dark:text-primary">
                        Secondary Text
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input 
                            type="color" 
                            defaultValue="#007E9A" 
                            className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                            style={{ padding: '2px' }}
                          />
                        </div>
                        <input 
                          type="text" 
                          defaultValue="#007E9A" 
                          className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {customizationTab === 'included-jobs' && (
                <div className="space-y-6 max-w-2xl">
                  {/* Departments */}
                  <div>
                    <label className="block text-sm font-medium text-primary dark:text-primary mb-2">
                      Departments
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Limit the jobs displayed in this widget to one or more departments.
                    </p>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option>All Categories</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Human Resources</option>
                      <option>Finance</option>
                      <option>Customer Support</option>
                      <option>Design</option>
                      <option>Operations</option>
                    </select>
                  </div>

                  {/* Location Country */}
                  <div>
                    <label className="block text-sm font-medium text-primary dark:text-primary mb-2">
                      Location Country
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Limit the jobs displayed in this widget to one country.
                    </p>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option>Austria</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Spain</option>
                      <option>Italy</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Netherlands</option>
                      <option>Switzerland</option>
                      <option>Sweden</option>
                      <option>Norway</option>
                      <option>Denmark</option>
                      <option>Belgium</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                    </select>
                  </div>

                  {/* Location States */}
                  <div>
                    <label className="block text-sm font-medium text-primary dark:text-primary mb-2">
                      Location States
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Limit the jobs displayed in this widget to one or more locations.
                    </p>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option>All Locations States</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                      <option>Illinois</option>
                      <option>Pennsylvania</option>
                      <option>Ohio</option>
                      <option>Georgia</option>
                      <option>North Carolina</option>
                      <option>Michigan</option>
                      <option>Vienna</option>
                      <option>Salzburg</option>
                      <option>Graz</option>
                      <option>Linz</option>
                    </select>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-medium text-primary dark:text-primary mb-2">
                      Employment Type
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Limit the jobs displayed in this widget to one or more employment types.
                    </p>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option>All Types</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Temporary</option>
                      <option>Internship</option>
                      <option>Freelance</option>
                      <option>Remote</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { CodeEditor, CopyButton, type CodeEditorProps, type CopyButtonProps };

