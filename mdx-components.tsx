import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Preview } from '@/components/mdx/preview';
import { PreviewCode } from '@/components/mdx/preview-code';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        Preview,
        PreviewCode,
        ...components,
    };
}