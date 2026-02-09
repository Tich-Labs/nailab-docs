# Nailab Health Metrics Form - Visual Mockup

## Overview

The Health Metrics Form allows founders to track their startup's financial health with **4 simple inputs** and **auto-calculated metrics** (Net Burn & Runway). This design document shows the visual layout, interactions, and data flow.

**Date:** February 9, 2026  
**Status:** Ready for Stakeholder Review  
**Component:** `src/components/dashboard/HealthMetricsForm.tsx`

---

## 🎨 Desktop View Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Health Metrics                                              │
│  Update your startup's key financial metrics                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📅 REPORTING PERIOD                                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Month: [February 2025 ▼]                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  💰 FINANCIAL INPUTS                                           │
│                                                                 │
│  Current Cash Position *                                       │
│  💵 ┌──────────────────────────────┐                          │
│     │ 150000                       │                          │
│     └──────────────────────────────┘                          │
│     Help: How much money you have in the bank right now       │
│                                                                 │
│  Monthly Income *                                              │
│  💰 ┌──────────────────────────────┐                          │
│     │ 25000                        │                          │
│     └──────────────────────────────┘                          │
│     Help: Total revenue collected this month                  │
│                                                                 │
│  Monthly Burn Rate *                                           │
│  📉 ┌──────────────────────────────┐                          │
│     │ 30000                        │                          │
│     └──────────────────────────────┘                          │
│     Help: Total monthly operating expenses                    │
│           (salaries, tools, rent, etc.)                       │
│                                                                 │
│  Number of Paying Customers *                                  │
│  👥 ┌──────────────────────────────┐                          │
│     │ 45                           │                          │
│     └──────────────────────────────┘                          │
│     Help: Active paying users or subscribers                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ✨ AUTO-CALCULATED METRICS                                    │
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐              │
│  │ Net Burn Rate      │  │ Runway             │              │
│  ├────────────────────┤  ├────────────────────┤              │
│  │ -$5,000/month      │  │ 30 months          │              │
│  │                    │  │                    │              │
│  │ 🟢 Cash Positive   │  │ 🟢 Healthy         │              │
│  └────────────────────┘  └────────────────────┘              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Monthly Breakdown:                                       │  │
│  │ • Monthly Income:     +$25,000                           │  │
│  │ • Monthly Burn Rate:  -$30,000                           │  │
│  │ • Net Monthly Change: -$5,000 (You're in profit mode!)  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                             [Cancel] [Save Metrics]            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile View Layout

```
┌────────────────────────────┐
│  📊 Health Metrics         │
│  Update your metrics       │
├────────────────────────────┤
│                            │
│  📅 REPORTING PERIOD       │
│  Month: [Feb 2025 ▼]       │
│                            │
│  💵 Current Cash Position *│
│  ┌──────────────────────┐  │
│  │ 150000               │  │
│  └──────────────────────┘  │
│  Money in your bank        │
│                            │
│  💰 Monthly Income *       │
│  ┌──────────────────────┐  │
│  │ 25000                │  │
│  └──────────────────────┘  │
│  Revenue this month        │
│                            │
│  📉 Monthly Burn Rate *    │
│  ┌──────────────────────┐  │
│  │ 30000                │  │
│  └──────────────────────┘  │
│  Total expenses            │
│                            │
│  👥 Paying Customers *     │
│  ┌──────────────────────┐  │
│  │ 45                   │  │
│  └──────────────────────┘  │
│  Active paying users       │
│                            │
├────────────────────────────┤
│  ✨ AUTO-CALCULATED        │
│                            │
│  Net Burn Rate             │
│  -$5,000/month             │
│  🟢 Cash Positive          │
│                            │
│  Runway                    │
│  30 months                 │
│  🟢 Healthy                │
│                            │
│  Income:    +$25,000       │
│  Burn:      -$30,000       │
│  Net:       -$5,000        │
│                            │
├────────────────────────────┤
│  [Save Metrics]            │
│  [Cancel]                  │
└────────────────────────────┘
```

---

## 📊 Form Fields Specification

| Field | Type | Required | Default | Validation | Help Text |
|-------|------|----------|---------|-----------|-----------|
| **Month** | Dropdown | Yes | Current Month | Past 3 months | Select the reporting month/year |
| **Current Cash Position** | Currency ($) | Yes | — | ≥ 0 | How much money in your bank right now |
| **Monthly Income** | Currency ($) | Yes | — | ≥ 0 | Total revenue collected this month from all customers |
| **Monthly Burn Rate** | Currency ($) | Yes | — | > 0 | Total monthly operating expenses (salaries, tools, rent, etc.) |
| **Paying Customers** | Number | Yes | — | > 0 | Active paying users or subscribers |

---

## ✨ Auto-Calculated Metrics

### Net Burn Rate
```
Formula: Monthly Burn Rate - Monthly Income

Example: $30,000 (burn) - $25,000 (income) = $5,000/month
```

**Status Indicators:**
- If **Net Burn is NEGATIVE** (like -$5,000): 🟢 **Cash Positive** — You're making more than you spend!
- If **Net Burn is POSITIVE** (like +$5,000): 🔴 **Cash Negative** — You're spending more than you earn

### Runway
```
Formula: Current Cash ÷ Net Burn Rate = Months of Runway

Example: $150,000 (cash) ÷ $5,000 (net burn) = 30 months
```

**Status Indicators:**
| Runway | Status | Color | Indicator |
|--------|--------|-------|-----------|
| **> 6 months** | Healthy | 🟢 Green | You have plenty of time |
| **3-6 months** | Warning | 🟡 Yellow | Start planning for funding |
| **< 3 months** | Critical | 🔴 Red | Urgent action needed |

---

## 🔄 Real-Time Calculation Flow

As founder updates each field, calculations update instantly:

```
USER INPUTS:
┌─────────────────────┐
│ Current Cash: 150K  │ ──┐
│ Monthly Income: 25K │ ──┼──→ [Calculate Net Burn]
│ Burn Rate: 30K      │ ──┤    (30K - 25K = 5K)
│ Customers: 45       │ ──┼──→ [Calculate Runway]
└─────────────────────┘ ──┤    (150K ÷ 5K = 30mo)
                         │
                         └──→ [Update Display Instantly]
                             (No Save Needed)

AUTO-CALCULATED RESULTS:
┌─────────────────────┐
│ Net Burn: -$5,000   │
│ Status: 🟢 Positive │
├─────────────────────┤
│ Runway: 30 months   │
│ Status: 🟢 Healthy  │
└─────────────────────┘
```

---

## 🎯 State Variations

### ✅ Success State (After Save)

```
┌──────────────────────────────────┐
│ ✅ Metrics saved successfully!   │
│                                  │
│ Your data will be used for       │
│ health calculations and mentor   │
│ dashboards.                      │
└──────────────────────────────────┘
```

### ⚠️ Warning State

```
Runway < 3 months:
┌──────────────────────────────────┐
│ 🔴 CRITICAL: Only 2 months       │
│    runway remaining              │
│                                  │
│ Consider reaching out to         │
│ mentors for funding guidance.    │
└──────────────────────────────────┘
```

### ⏳ Loading State

```
Button shows loading spinner:
[🔄 Saving...] (disabled)
```

### ❌ Error State

```
┌──────────────────────────────────┐
│ ❌ Failed to save metrics        │
│                                  │
│ Monthly Burn Rate must be        │
│ greater than 0                   │
└──────────────────────────────────┘
```

---

## 🎨 Design System

### Color Palette

| Element | Color Code | Usage |
|---------|-----------|-------|
| Primary Purple | `#913f98` | Headers, badges, primary buttons |
| Light Purple BG | `#f3f0f5` | Auto-calc section background |
| Success Green | `#059669` | Healthy/positive status text |
| Light Green BG | `#dcfce7` | Healthy status background |
| Warning Yellow | `#d97706` | Warning status text |
| Light Yellow BG | `#fef3c7` | Warning status background |
| Error Red | `#dc2626` | Critical status text |
| Light Red BG | `#fee2e2` | Critical status background |
| Text Dark | `#1f2937` | Primary text |
| Text Muted | `#6b7280` | Secondary/helper text |
| Border Light | `#e5e7eb` | Form borders, dividers |
| Background | `#f9fafb` | Input background |

### Typography

- **Page Title:** 20px Bold, Primary Purple (#913f98)
- **Section Heading:** 14px Semibold, Dark text
- **Labels:** 14px Regular, Dark text
- **Input Values:** 16px Regular, Dark text
- **Helper Text:** 12px Regular, Muted gray
- **Metric Values:** 28px Bold, Primary Purple
- **Status Badge:** 11px Bold, Status color

### Spacing & Layout

- **Card Padding:** 24px
- **Section Margin:** 32px
- **Field Margin:** 20px
- **Input Padding:** 10px vertical, 12px horizontal
- **Border Radius:** 8-12px
- **Gap Between Items:** 8-16px

---

## 📐 Responsive Design

### Breakpoints

- **Desktop:** 1024px+ → 2-column metrics grid
- **Tablet:** 768px - 1023px → Responsive adjustments
- **Mobile:** < 768px → Single column stacked layout

### Mobile Optimizations

- Stack buttons vertically (full width)
- Single column metric cards
- Larger touch targets (minimum 44px)
- Reduced padding for screen space

---

## 🔧 Implementation Details

### Form Validation Rules

```javascript
// Current Cash Position
- Must be a number
- Must be ≥ 0
- Required field

// Monthly Income
- Must be a number
- Must be ≥ 0
- Required field

// Monthly Burn Rate
- Must be a number
- Must be > 0 (cannot be zero)
- Required field

// Paying Customers
- Must be an integer
- Must be > 0
- Required field
```

### Database Schema

```sql
CREATE TABLE startup_health_metrics (
  id UUID PRIMARY KEY,
  founder_id UUID REFERENCES auth.users(id),
  month DATE NOT NULL,
  
  -- Manual Inputs
  current_cash DECIMAL(15,2) NOT NULL,
  monthly_income DECIMAL(15,2) NOT NULL,
  burn_rate DECIMAL(15,2) NOT NULL,
  paying_customers INTEGER NOT NULL,
  
  -- Auto-Calculated
  net_burn DECIMAL(15,2) GENERATED ALWAYS AS (burn_rate - monthly_income),
  runway_months DECIMAL(10,2) GENERATED ALWAYS AS (current_cash / (burn_rate - monthly_income)),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📋 User Journey

### First-Time Entry (Onboarding)

1. Founder clicks "Add Health Metrics" in dashboard
2. Form opens with current month pre-selected
3. Founder enters 4 required fields
4. Calculations update in real-time
5. Founder reviews Net Burn & Runway
6. Founder clicks "Save Metrics"
7. Success message appears
8. Data is now visible on health dashboard

### Monthly Updates

1. Founder navigates to Health Metrics in dashboard
2. Previous month is populated as reference
3. Founder enters new month's data
4. Real-time calculations show health status
5. Founder saves (overwrites or creates new entry)
6. Monthly history becomes visible

---

## 🚀 Features Highlighted

✅ **Minimal Input** — Only 4 required fields, no overwhelming forms  
✅ **Real-Time Feedback** — Auto-calculated metrics update instantly as user types  
✅ **Color-Coded Health** — Instantly see if your startup is 🟢 Healthy, 🟡 Warning, 🔴 Critical  
✅ **Mobile-First Design** — Responsive layout on all devices  
✅ **Clear Breakdown** — Shows income, burn, and net change transparently  
✅ **Dashboard Consistent** — Matches Nailab's existing design system & styling  
✅ **Accessible** — Clear labels, good contrast, intuitive flow  
✅ **Instant Calculations** — No confusion about how metrics are derived  

---

## 📝 Notes for Development

1. **Component:** Create as `src/components/dashboard/HealthMetricsForm.tsx`
2. **Hook:** Create `useHealthMetrics(month)` to fetch/save data
3. **Validation:** Use form validation for all 4 required fields
4. **Toast Notifications:** Use Sonner for success/error messages
5. **Styling:** Match [StartupProfile.tsx](src/pages/dashboard/StartupProfile.tsx) patterns
6. **Testing:** Test with edge cases (zero burn, high runway, low runway)
7. **Dashboard Integration:** Add to [DashboardSidebar](src/components/dashboard/DashboardSidebar.tsx)

---

## 🔗 Related Documents

- [Startup Health Dashboard Overview](./health-dashboard-overview.md)
- [Database Schema](./database-schema.md)
- [API Endpoints](./api-endpoints.md)

---

**Status:** ✅ Ready for Development  
**Last Updated:** February 9, 2026  
**Author:** Nailab Product Team
