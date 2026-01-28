import { useCallback, useState, SetStateAction, useMemo } from 'react'
import { McpWidgetState } from './types'

const WIDGET_STATE_STORAGE_PREFIX = 'mcp_widget_state_'

/**
 * Hook to manage widget state that persists between renders
 * This hook keeps locally-persisted widget state aligned with your local React state.
 * Since MCP Apps doesn't support setWidgetState (unlike OpenAI Apps),
 * this hook uses localStorage as a fallback.
 *
 * @example
 * const [state, setState] = useMcpWidgetState({ count: 0 })
 *
 * // Update state
 * setState({ count: state.count + 1 })
 *
 * // Or with a function
 * setState(prev => ({ ...prev, count: prev.count + 1 }))
 */
export function useMcpWidgetState<T extends McpWidgetState>(
  defaultState: T | (() => T)
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const key = useMemo(() => {
    const key = typeof window !== 'undefined' ? crypto.randomUUID() : 'widget_state'
    return key
  }, [])

  const storageKey = `${WIDGET_STATE_STORAGE_PREFIX}${key}`

  const loadStateFromStorage = (): T | null => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        return JSON.parse(stored) as T
      }
    } catch (error) {
      console.error('Failed to load widget state from localStorage:', error)
    }
    return null
  }

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    const stored = loadStateFromStorage()
    if (stored != null) {
      return stored
    }

    return typeof defaultState === 'function'
      ? (defaultState as () => T)()
      : (defaultState ?? null);
  });

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === 'function' ? (state as (prev: T | null) => T | null)(prevState) : state;

        // Persist to localStorage
        if (newState != null) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(newState))
          } catch (error) {
            console.error('Failed to persist widget state to localStorage:', error)
          }
        } else {
          localStorage.removeItem(storageKey)
        }

        return newState;
      });
    },
    [storageKey]
  );

  return [widgetState, setWidgetState] as const;
}
