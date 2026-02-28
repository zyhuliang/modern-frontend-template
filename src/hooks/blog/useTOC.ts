import { useState, useEffect, useCallback } from 'react';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function useTOC() {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // 提取标题
  useEffect(() => {
    const extractHeadings = () => {
      const headings = document.querySelectorAll('article.prose h1, article.prose h2, article.prose h3, article.prose h4');
      const items: TOCItem[] = [];
      
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.replace('H', ''));
        const text = heading.textContent || '';
        const id = heading.id || `heading-${index}`;
        
        // 如果没有 id，给它添加一个
        if (!heading.id) {
          heading.id = id;
        }
        
        items.push({ id, text, level });
      });
      
      setToc(items);
    };

    // 延迟执行，等待 Markdown 渲染完成
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  // 监听滚动，高亮当前标题
  const handleScroll = useCallback(() => {
    const headings = document.querySelectorAll('article.prose h1, article.prose h2, article.prose h3, article.prose h4');
    
    let currentId = '';
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 150) {
        currentId = heading.id;
      }
    });
    
    setActiveId(currentId);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { toc, activeId };
}
