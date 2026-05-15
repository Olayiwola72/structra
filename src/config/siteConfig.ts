import { exportFormats } from './exportConfig'
import { headerColorSwatches, contentColorSwatches } from './colorPalette'
import { presets } from './presets'

export const siteConfig = {
  brand: {
    name: 'Structra',
    tagline: 'Tables, your way.',
    githubUrl: 'https://github.com/Olayiwola72/structra',
    contactEmail: 'hello@structra.app',
  },
  exportFileBaseName: 'structra-table',
  exports: exportFormats,
  colors: {
    defaultHeader: '#1E293B',
    defaultContent: '#111827',
    header: headerColorSwatches,
    content: contentColorSwatches,
  },
  presets,
  columnFormats: [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'currency', label: 'Currency' },
    { value: 'percentage', label: 'Percentage' },
    { value: 'date', label: 'Date' },
  ],
  routes: {
    home: '/',
    app: '/app',
    about: '/about',
    contact: '/contact',
    openSource: '/open-source',
  },
  nav: [
    { label: 'Home', route: 'home' },
    { label: 'Open Source', route: 'openSource' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ],
  labels: {
    // Sidebar panels
    gridSize: 'Grid Size',
    rows: 'Rows',
    columns: 'Columns',
    createTable: 'Create Table',
    headerDefinitions: 'Header Definitions',
    headerStyle: 'Header Style',
    headerStyleOptions: [
      { value: 'none', label: 'No Header' },
      { value: 'first-row', label: 'First Row' },
      { value: 'first-column', label: 'First Column' },
      { value: 'both', label: 'Both' },
    ] as const,
    columnType: 'Column Type',
    templates: 'Templates',
    exportOptions: 'Export Options',
    mergeCells: 'Merge Cells',
    merge: 'Merge',
    unmerge: 'Unmerge',
    noSelection: 'No selection',
    colors: 'Colors',
    header: 'Header',
    content: 'Content',
    mergeInstructions: 'Click a cell, then Shift-click another cell to select a merge range.',

    // Toolbar
    addRow: 'Add Row',
    addColumn: 'Add Column',
    removeRow: 'Remove Row',
    removeColumn: 'Remove Column',
    clearAll: 'Clear All',
    undo: 'Undo',
    tooltipMerge: 'Merge selected cells',
    templatesLabel: 'Templates',
    importLabel: 'Import',
    importCsv: 'Import from CSV',
    importExcel: 'Import from Excel',

    // Status bar
    autoFitColumn: 'Double-click a column border to AutoFit width',
    autoFitRow: 'Double-click to AutoFit row height',

    // Merge announcements
    mergeAnnounce: 'Cells merged.',
    unmergeAnnounce: 'Cells unmerged.',
    cannotMergeSingleCell: 'Cannot merge a single cell. Select a range of cells first.',
    noMergeInSelection: 'No merge found in the selected range.',

    // Loading
    loading: 'Loading\u2026',

    // Nav
  },
  messages: {
    importTooLarge: 'File too large. Maximum size is 5MB.',
    importParseError: 'Could not read file. Check the format and try again.',
  },
  locale: {
    date: 'en-US',
    currency: 'en-US',
    number: 'en-US',
    percent: 'en-US',
    currencyCode: 'USD',
    dateMonth: 'short' as const,
    dateDay: '2-digit' as const,
    dateYear: 'numeric' as const,
  },
  importLimits: {
    maxSizeMb: 5,
  },
} as const
