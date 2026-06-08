'use client'
import { contentTemplates, ContentTemplate } from '@/lib/contentTemplates'

interface Props {
  onSelect: (template: ContentTemplate) => void
}

export function TemplateSelector({ onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Templates</h3>
      <div className="grid grid-cols-2 gap-2">
        {contentTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-colors text-left group"
          >
            <span className="text-xl">{template.icon}</span>
            <span className="text-xs font-medium text-gray-700 group-hover:text-purple-700 leading-tight">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
