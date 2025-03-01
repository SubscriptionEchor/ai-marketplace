export const CATEGORY_TYPES = {
  MODEL: 'model',
  DATASET: 'dataset',
  INFRA: 'infra'
} as const;

export const CATEGORY_LABELS = {
  [CATEGORY_TYPES.MODEL]: 'AI Model',
  [CATEGORY_TYPES.DATASET]: 'Dataset',
  [CATEGORY_TYPES.INFRA]: 'Infrastructure'
} as const;