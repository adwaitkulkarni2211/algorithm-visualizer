# Spec Delta

## Purpose

Ensure the algorithm visualizer remains usable and visually coherent across supported viewport sizes and orientations without page-level horizontal overflow, clipped controls, or fragile global element selectors.

## ADDED Requirements

### Requirement: Responsive control layout
The visualizer SHALL present the sort selector, array controls, and action buttons without clipping or page-level horizontal overflow at supported viewport widths of 320 CSS pixels and above.

#### Scenario: Narrow portrait viewport
- **WHEN** the visualizer is rendered in a 320 CSS pixel-wide portrait viewport
- **THEN** every sorting control is reachable without horizontal scrolling of the document

#### Scenario: Intermediate viewport
- **WHEN** the visualizer is rendered between narrow-phone and desktop widths
- **THEN** controls use the available space by wrapping or reflowing instead of overlapping or being clipped

#### Scenario: Ultra-wide viewport
- **WHEN** the visualizer is rendered at a width greater than 2000 CSS pixels
- **THEN** the options bar retains its standard desktop layout and styling

### Requirement: Overflow is contained to applicable content
The visualizer SHALL confine horizontal overflow to the sort-selector list, bar chart, or algorithm code panel when their content cannot fit, rather than widening the document.

#### Scenario: Sort choices exceed the available inline space
- **WHEN** all sort choices do not fit within the selector region
- **THEN** the selector region remains independently horizontally scrollable and each choice remains selectable

#### Scenario: Algorithm code exceeds panel width
- **WHEN** a preformatted algorithm line is wider than its information panel
- **THEN** the line can be viewed by scrolling that panel horizontally without widening the document

### Requirement: Height- and orientation-safe layout
The visualizer SHALL allow the options bar and algorithm content to grow with their content and remain reachable in portrait and short landscape viewports.

#### Scenario: Short landscape viewport
- **WHEN** the visualizer is rendered in a landscape viewport with limited height
- **THEN** the options bar does not clip its controls because of a fixed viewport-relative height

### Requirement: Slider value labels are hidden on narrow viewports
The visualizer SHALL hide the inline slider value labels (array size number and animation delay in ms) on narrow viewports to preserve available control space, and SHALL show them on tablet and wider viewports.

#### Scenario: Narrow viewport slider labels
- **WHEN** the visualizer is rendered at a viewport width below the tablet breakpoint
- **THEN** the array-size value and the delay-ms value beside each slider are not visible

#### Scenario: Tablet and wider slider labels
- **WHEN** the visualizer is rendered at the tablet breakpoint or wider
- **THEN** the array-size value and the delay-ms value beside each slider are visible

#### Scenario: No unintended element hiding
- **WHEN** slider value labels are hidden by their scoped CSS selector
- **THEN** no other paragraph or text elements in the visualizer are affected by that rule

### Requirement: Existing visual identity is preserved
The responsive layout SHALL retain the current color palette, sort options, controls, chart rendering, and desktop layout hierarchy while adapting the arrangement to available space.

#### Scenario: Desktop visualizer
- **WHEN** the visualizer is rendered at a standard desktop width
- **THEN** the sort selector and chart controls remain side by side with the established visual styling

#### Scenario: Responsive reflow
- **WHEN** the layout reflows at a smaller viewport
- **THEN** sorting behavior, array generation, delay selection, array-size selection, and sorting actions remain available and unchanged
