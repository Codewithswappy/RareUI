"use client";

import React from "react";

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
    <div className="flex flex-col gap-6 mt-16 mb-24 max-w-full overflow-hidden">
      <h2 className="text-4xl font-semibold text-neutral-400 dark:text-neutral-800 font-mono tracking-tight">
        Props
      </h2>

      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-neutral-900/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white/40 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:text-neutral-200 border-r border-neutral-200 dark:border-neutral-800 w-[140px]">
                  Prop
                </th>
                <th className="px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:text-neutral-200 border-r border-neutral-200 dark:border-neutral-800 w-[180px]">
                  Type
                </th>
                <th className="px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:text-neutral-200 border-r border-neutral-200 dark:border-neutral-800 w-[100px]">
                  Default
                </th>
                <th className="px-4 py-2.5 text-[13px] font-medium text-neutral-800 dark:text-neutral-200">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {props.map((prop, index) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-neutral-950 transition-colors"
                >
                  <td className="px-4 py-3 align-middle border-r border-neutral-200 dark:border-neutral-800 bg-[#fbfbfb] dark:bg-neutral-900/30">
                    <code className="inline-flex items-center px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[11px] font-mono leading-none text-neutral-600 dark:text-neutral-400 shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
                      {prop.name}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-neutral-200 dark:border-neutral-800">
                    <code className="inline-flex items-center px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[11px] font-mono leading-none text-neutral-600 dark:text-neutral-400">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-4 py-3 align-middle border-r border-neutral-200 dark:border-neutral-800 text-[12px] text-neutral-600 dark:text-neutral-400 font-inter">
                    {prop.default || "-"}
                  </td>
                  <td className="px-4 py-3 align-middle text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-inter">
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
