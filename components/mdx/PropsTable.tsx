'use client';

import React from 'react';

interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropItem[];
}

export const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <div className="mb-24 flex max-w-full flex-col gap-6 overflow-hidden">
      <h2 className="font-mono text-4xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-800">
        Props
      </h2>

      <div className="overflow-hidden rounded-md bg-[#fafafa] dark:border-neutral-800 dark:bg-neutral-900/10">
        <div className="overflow-x-auto rounded-md border border-neutral-200 shadow ring-1 shadow-black/10 ring-black/10 dark:border-neutral-800">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-200 bg-white/40 dark:border-neutral-800 dark:bg-neutral-900/40">
                <th className="w-[140px] border-r border-neutral-200 px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:border-neutral-800 dark:text-neutral-200">
                  Prop
                </th>
                <th className="w-[180px] border-r border-neutral-200 px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:border-neutral-800 dark:text-neutral-200">
                  Type
                </th>
                <th className="w-[100px] border-r border-neutral-200 px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:border-neutral-800 dark:text-neutral-200">
                  Default
                </th>
                <th className="px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:text-neutral-200">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {props.map((prop, index) => (
                <tr key={index} className="bg-white transition-colors dark:bg-neutral-950">
                  <td className="border-r border-neutral-200 bg-[#fbfbfb] px-4 py-3 align-middle dark:border-neutral-800 dark:bg-neutral-900/30">
                    <code className="inline-flex items-center rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-[11px] leading-none text-neutral-600 shadow-[0_1px_1px_rgba(0,0,0,0.02)] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                      {prop.name}
                    </code>
                  </td>
                  <td className="border-r border-neutral-200 px-4 py-3 align-middle dark:border-neutral-800">
                    <code className="inline-flex items-center rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-[11px] leading-none text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                      {prop.type}
                    </code>
                  </td>
                  <td className="font-inter border-r border-neutral-200 px-4 py-3 align-middle text-[12px] text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                    {prop.default || '-'}
                  </td>
                  <td className="font-inter px-4 py-3 align-middle text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
