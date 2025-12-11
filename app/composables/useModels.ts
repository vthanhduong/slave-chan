export function useModels() {
  const models = [
    'mistral/ministral-3b',
    'mistral/mistral-small',
    'mistral/mistral-medium',
    'mistral/mistral-large'
  ]

  const model = useCookie<string>('model', { default: () => 'mistral/mistral-medium' })

  return {
    models,
    model
  }
}
