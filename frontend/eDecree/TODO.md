# SearchDecree Redesign - Progress Tracker

## Current Issues
- Basic unstyled inputs and button
- Results table incorrectly nested inside form grid
- No loading, empty, or error states
- No icons on form fields
- Plain typography and spacing

## Proposed Design Plan

### 1. Search Form Section
- **Gradient header banner** with icon + title (matching Dashboard aesthetic)
- **3 form fields** with floating labels + left icons:
  - Case Type: `BriefcaseIcon` + styled dropdown
  - Case No: `DocumentTextIcon` + styled input
  - Case Year: `CalendarIcon` + styled input
- **Search button**: Gradient primary button with `MagnifyingGlassIcon` + hover lift + loading spinner state
- **Card container**: White rounded-2xl with subtle shadow and border

### 2. Results Table Section
- **Professional data table** with:
  - Striped rows (`even:bg-slate-50`)
  - Hover highlight on rows
  - Column headers with uppercase tracking + subtle background
  - Status badges for petitioner presence
  - Smooth fade-in animation when results load
- **Empty state**: Illustration-style message when no results
- **Loading state**: Skeleton rows or spinner during search
- **Error state**: Inline alert banner for API errors

### 3. UX Improvements
- Form validation (disable search if fields empty)
- Loading spinner on search button
- Result count badge
- Responsive: stack form fields on mobile, horizontal scroll table

## Files to Edit
- `src/pages/decree/SearchDecree.jsx`

## Follow-up
- Build verification
- Test responsive behavior

Do you approve this plan?

