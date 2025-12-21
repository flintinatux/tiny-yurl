---
name: Dark Mode Implementation
overview: Add dark mode support to the tiny-yurl app using next-themes package with Tailwind CSS dark mode variants, including a theme toggle component and updating all components with appropriate dark mode styles.
todos: []
---

# Dark Mode Implement

ation Plan

## Overview

Implement dark mode using `next-themes` for theme management and Tailwind CSS `dark:` variants for styling. The implementation will support system preference detection, manual theme switching, and persistent theme storage.

## Implementation Steps

### 1. Install Dependencies

- Install `next-themes` package: `npm install next-themes`

### 2. Update Root Layout

Update [`src/app/layout.tsx`](src/app/layout.tsx):

- Add `suppressHydrationWarning` to `<html>` tag to prevent hydration warnings
- Wrap children with `ThemeProvider` from `next-themes`
- Configure ThemeProvider with `attribute="class"`, `defaultTheme="system"`, and `enableSystem`

### 3. Update Global Styles

Update [`src/app/globals.css`](src/app/globals.css):

- Change `:root.dark` selector to use class-based dark mode (matching Tailwind's class strategy)
- Uncomment and update the dark mode CSS variables
- Ensure CSS variables work with both light and dark themes

### 4. Create Theme Toggle Component

Create new file [`src/components/ThemeToggle.tsx`](src/components/ThemeToggle.tsx):

- Client component using `useTheme` hook from `next-themes`
- Handle mounting state to prevent hydration mismatches
- Toggle button with light/dark icons (☀️/🌙)
- Positioned fixed in top-right corner
- Use dark mode variants for button styling

### 5. Update Main Page

Update [`src/app/page.tsx`](src/app/page.tsx):

- Import and add `ThemeToggle` component
- Add `dark:bg-neutral-800` to the main section background

### 6. Update Shortener Component

Update [`src/components/Shortener.tsx`](src/components/Shortener.tsx):

- Input: Add `dark:bg-neutral-900` and `dark:text-foreground` classes
- Button: Add `dark:bg-blue-600` and `dark:hover:bg-blue-700` classes
- Error text: Add `dark:text-red-400` for better contrast

### 7. Update TinyYurl Component

Update [`src/components/TinyYurl.tsx`](src/components/TinyYurl.tsx):

- Error message: Add `dark:text-red-400`
- Loading/status text: Add `dark:text-gray-400`
- Link: Add `dark:text-blue-400` and `dark:hover:text-blue-300`
- Copy button: Add `dark:bg-neutral-800`, `dark:border-neutral-700`, and `dark:text-foreground`

### 8. Update FAQs Component

Update [`src/components/FAQs.tsx`](src/components/FAQs.tsx):

- Links: Add `dark:text-blue-400` and `dark:hover:text-blue-300`
- Green badge: Add `dark:bg-green-600` for better visibility

## Files to Modify

1. `package.json` - Add next-themes dependency (via npm install)
2. `src/app/layout.tsx` - Add ThemeProvider wrapper
3. `src/app/globals.css` - Update dark mode CSS variables
4. `src/app/page.tsx` - Add ThemeToggle and dark mode classes
5. `src/components/Shortener.tsx` - Add dark mode variants
6. `src/components/TinyYurl.tsx` - Add dark mode variants
7. `src/components/FAQs.tsx` - Add dark mode variants

## Files to Create

1. `src/components/ThemeToggle.tsx` - Theme toggle button component

## Testing Considerations

- Verify theme persists across page refreshes
- Test system preference detection
- Verify all components have appropriate contrast in dark mode