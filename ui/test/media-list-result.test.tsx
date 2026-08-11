import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppContext } from '../lib/components/App'
import { MediaListResult, getMediaKind, getMediaUrl } from '../shared/joai/MediaListResult'

const renderList = (items: Record<string, unknown>[]) => {
  const copyToClipboard = vi.fn()
  render(
    <AppContext.Provider value={{ copyToClipboard } as any}>
      <MediaListResult title="Media" emptyText="No media found." items={items} />
    </AppContext.Provider>
  )
  return copyToClipboard
}

describe('MediaListResult', () => {
  it('renders image and video previews with a compact audio tile', () => {
    const { container } = render(
      <AppContext.Provider value={{ copyToClipboard: vi.fn() } as any}>
        <MediaListResult
          title="Media"
          emptyText="No media found."
          items={[
            { id: 'image', name: 'Portrait', mime: 'image/jpeg', url: 'https://example.com/portrait.jpg' },
            { id: 'video', name: 'Launch film', mime: 'video/mp4', url: 'https://example.com/launch.mp4' },
            { id: 'audio', name: 'Theme song', mime: 'audio/mpeg', url: 'https://example.com/theme.mp3' },
          ]}
        />
      </AppContext.Provider>
    )

    expect(screen.getByRole('img', { name: 'Portrait' })).toHaveAttribute('src', 'https://example.com/portrait.jpg')
    expect(container.querySelector('video')).toHaveAttribute('src', 'https://example.com/launch.mp4')
    expect(screen.getByLabelText('Theme song audio')).toBeInTheDocument()
    expect(screen.queryByText('https://example.com/portrait.jpg')).not.toBeInTheDocument()
  })

  it('uses library URLs and falls back when a preview fails', () => {
    renderList([{ name: 'Library image', mime: 'image/png', library: { preview_url: 'https://example.com/library.png' } }])
    const image = screen.getByRole('img', { name: 'Library image' })

    expect(image).toHaveAttribute('src', 'https://example.com/library.png')
    fireEvent.error(image)
    expect(screen.getByLabelText('Library image preview unavailable')).toBeInTheDocument()
  })

  it('copies the complete media response', () => {
    const items = [{ id: 'media-1', name: 'Photo', mime: 'image/jpeg', url: 'https://example.com/photo.jpg' }]
    const copyToClipboard = renderList(items)

    fireEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(copyToClipboard).toHaveBeenCalledWith(JSON.stringify(items, null, 2))
  })

  it('identifies media from mime types, extensions, and nested URLs', () => {
    expect(getMediaKind({ mime: 'video/webm' })).toBe('video')
    expect(getMediaKind({ name: 'recording.wav' })).toBe('audio')
    expect(getMediaKind({ library: { original_url: 'https://example.com/photo.webp' } })).toBe('image')
    expect(getMediaUrl({ library: { preview_url: 'https://example.com/preview.jpg' } })).toBe('https://example.com/preview.jpg')
  })
})
