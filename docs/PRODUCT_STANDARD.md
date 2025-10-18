# Arqam Product Development Standard

This document defines the standard for building sophisticated products across all workspaces (Build, Analyze, Explore) that match the quality and user experience of Intelligence workspace modules.

---

## 📐 Layout Requirements

### Overall Structure
All products MUST follow this layout structure:

```tsx
<div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
  {/* LEFT ANALYSIS PANEL */}
  <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'}`}>
    {/* Panel content */}
  </div>

  {/* MAIN CONTENT */}
  <div className="flex-1 flex flex-col overflow-hidden">
    {/* Header */}
    {/* Content Area */}
  </div>
</div>
```

### 1. Left Analysis Panel (Collapsible)
- **Width:** 256px (expanded), 0px (collapsed)
- **Background:** White with right border
- **Transition:** smooth 300ms

**Required Sections:**
- Panel header with collapse button
- **Indicators Section** (expandable cards)
  - Shows tracked metrics/KPIs
  - Each with color dot, name, expand/collapse
  - "+ Add Indicator" button
- **Measured As Section**
  - Grid of measurement types (Uniques, Totals, Average, Frequency)
  - Properties select dropdown
  - Formula builder
- **Segment By Section**
  - Numbered segments with conditions
  - Any/All selector
  - "+ Add Segment" button

### 2. Header Bar
**Height:** ~32px
**Background:** White with bottom border

**Required Elements:**
- Product icon (h-4 w-4, colored)
- Product title (text-sm font-semibold)
- Live badge with pulsing dot
- Metadata (last updated, confidence %, data sources link)
- Action buttons:
  - "+ Add View"
  - "Save" (bookmark icon)
  - "Export" (dropdown: PNG, CSV, Excel, PDF)
  - "Share"

### 3. Content Area

#### A. Analysis Controls Bar
- Advanced analysis mode selector (Standard/Anomaly/Forecast)
- Compare mode toggle
- Show/Hide forecast toggle
- Chart type selector (line/bar/area)
- Granularity selector (hourly/daily/weekly/monthly)
- Time range pills (7d, 30d, 60d, 90d) + calendar picker

#### B. Metrics Cards Grid
- **Layout:** 6-column grid, gap-2
- **Card Structure:**
  ```tsx
  - Title (10px font)
  - Large value (18px semibold)
  - Period label (9px gray)
  - Change badge (up/down/flat with arrow)
  - Sparkline chart (14px height)
  - Optional alert indicator
  ```

#### C. Main Visualization
- **Height:** 220px minimum
- **Background:** White card with border
- **Chart Header:**
  - Title + legend with color dots
  - Metadata indicators (anomaly, forecast)
- **Chart Area:**
  - Recharts ResponsiveContainer
  - Consistent color palette
  - Tooltips with styled content
  - Reference lines for targets
- **Chart Footer:**
  - Data source attribution
  - Configuration button

#### D. Breakdown Table/Tabs
- **Tab List:** Multiple views (Breakdown Table, Root Cause Analysis, etc.)
- **Tab Actions:** Breakdown by selector, export, search
- **Selection Features:**
  - Checkboxes for rows
  - Selected items toolbar with actions
- **Table:** DataTable component with sorting/filtering

---

## ⏱️ Loading Standards

### Implementation
```tsx
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 600)
  return () => clearTimeout(timer)
}, [])

if (isLoading) {
  return <PageSkeleton />
}
```

### Requirements
- **Duration:** 600ms simulated loading
- **Component:** Use `PageSkeleton` from `@/components/loading/PageSkeleton`
- **Animation:** Smooth fade-in with staggered delays

---

## 🎨 Styling Requirements

### Colors
- **Primary:** blue-600 (#2563eb)
- **Success:** green-600, emerald-50 background
- **Warning:** orange-500, orange-50 background
- **Error:** red-600, red-50 background
- **Neutral:** gray-50/100/200/600/900

### Workspace-Specific Colors
- **Build:** emerald-50 background, emerald-700 text
- **Analyze:** blue-50 background, blue-700 text
- **Explore:** purple-50 background, purple-700 text

### Typography
- **Headings:** font-semibold
- **Body:** font-medium (for labels), regular (for content)
- **Sizes:** text-[10px] to text-sm (small interface)

### Spacing & Layout
- **Borders:** 2px, rounded-lg (8px radius)
- **Padding:** p-2 to p-4 for cards
- **Gaps:** gap-2 to gap-4
- **Zoom:** style={{ zoom: 0.85 }} on main container

---

## 🔧 Feature Checklist

Every product MUST implement:

### Data Operations
- [ ] Export to PNG
- [ ] Export to CSV
- [ ] Export to Excel
- [ ] Export to PDF
- [ ] Share functionality
- [ ] Bookmark/Save views
- [ ] Refresh data manually

### Real-time Indicators
- [ ] Live badge with pulse animation
- [ ] Last updated timestamp
- [ ] Confidence/quality percentage
- [ ] Data source attribution links

### Time Controls
- [ ] Time range selector (7d, 30d, 60d, 90d, custom)
- [ ] Calendar picker
- [ ] Granularity controls
- [ ] Historical data support

### Visualization Controls
- [ ] Chart type toggle (line, bar, area, etc.)
- [ ] Show/hide forecast
- [ ] Anomaly detection indicators
- [ ] Compare mode
- [ ] Zoom/pan capabilities

### Analysis Features
- [ ] Collapsible left panel
- [ ] Customizable indicators
- [ ] Segment builder
- [ ] Filter capabilities
- [ ] Search functionality

---

## 📊 Analysis Panel Components

### Indicators Section
```tsx
{indicators.map((indicator) => (
  <div className="bg-gray-50 rounded-md p-2">
    <div className="flex items-center gap-2">
      <Button onClick={() => toggleExpanded(indicator.id)}>
        <ChevronDown className={expanded ? '' : '-rotate-90'} />
      </Button>
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: indicator.color }}></div>
      <span className="text-[11px] font-medium">{indicator.name}</span>
      <Button><MoreVertical /></Button>
    </div>
    {expanded && (
      <div className="mt-2 pl-6">
        <Button>+ Filter by</Button>
        <Button>+ Group-by</Button>
      </div>
    )}
  </div>
))}
```

### Measured As Section
- Grid of measurement buttons (Uniques, Totals, Average, Frequency)
- Properties select dropdown
- Formula builder with icon

### Segment By Section
- Numbered segments with expand/collapse
- Condition builder
- Any/All selector dropdown
- Saved segments dropdown

---

## 📈 Data Visualization Standards

### Recharts Configuration
```tsx
<ResponsiveContainer width="100%" height="100%">
  <ComposedChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
    <XAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} />
    <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} width={35} />
    <Tooltip contentStyle={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '11px'
    }} />
    {/* Lines/Areas/Bars */}
  </ComposedChart>
</ResponsiveContainer>
```

### Color Palette
- **Line 1:** #3b82f6 (blue-500)
- **Line 2:** #8b5cf6 (purple-500)
- **Line 3:** #10b981 (green-500)
- **Line 4:** #f59e0b (amber-500)
- **Area Fill:** Same color with 15% opacity gradient

### Sparklines
```tsx
<AreaChart data={sparklineData}>
  <Area
    type="monotone"
    dataKey="y"
    stroke={trendColor}
    strokeWidth={1}
    fill={trendColor}
    fillOpacity={0.3}
  />
</AreaChart>
```

---

## 🏗️ Implementation Template

### File Structure
```
app/(workspace)/[workspace]/products/[productId]/page.tsx
```

### Basic Template
```tsx
'use client'

import { useState, useEffect } from 'react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
// ... other imports

export default function ProductNamePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* LEFT PANEL */}
      <div className={`bg-white border-r transition-all ${leftPanelCollapsed ? 'w-0' : 'w-64'}`}>
        {/* Analysis panel content */}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-4 py-2">
          {/* Header content */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 space-y-2.5">
            {/* Controls bar */}
            {/* Metrics cards */}
            {/* Main chart */}
            {/* Breakdown table */}
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## ✅ Quality Checklist

Before marking a product as complete, verify:

- [ ] Loading state with 600ms delay
- [ ] PageSkeleton shown during loading
- [ ] Left panel collapsible and animated
- [ ] All header elements present
- [ ] 6-column metrics grid
- [ ] Main chart with proper styling
- [ ] Tabs with breakdown views
- [ ] Export functionality implemented
- [ ] Share functionality implemented
- [ ] Save/bookmark functionality
- [ ] Time range controls working
- [ ] Chart type toggles working
- [ ] Consistent color scheme
- [ ] Proper spacing (zoom: 0.85)
- [ ] Responsive layout
- [ ] No console errors
- [ ] Data loads correctly
- [ ] Animations smooth

---

## 📚 Reference Examples

**Best Practice Examples:**
- `app/(workspace)/[workspace]/economy/page.tsx` (948 lines)
- `app/(workspace)/[workspace]/prices/page.tsx` (1184 lines)
- `app/(workspace)/[workspace]/trade/page.tsx` (798 lines)

**Copy Structure From:** economy.tsx (most complete implementation)

---

## 🚀 Development Workflow

1. **Copy template** from `economy/page.tsx`
2. **Replace data** with product-specific content
3. **Customize indicators** in left panel
4. **Update metrics** to match product KPIs
5. **Modify chart** visualizations
6. **Adjust tabs** for product-specific views
7. **Test loading** state (600ms)
8. **Verify checklist** items
9. **Review with standard** document
10. **Mark "Coming Soon"** badge as complete

---

## 📝 Notes

- All measurements use rem-based sizing for consistency
- Icons from `lucide-react` library
- Charts use `recharts` library exclusively
- State management with React hooks (no external state library)
- Styled with Tailwind CSS utility classes
- No inline styles except for zoom and dynamic colors

---

**Last Updated:** 2025-10-18
**Version:** 1.0
**Status:** Active Standard
