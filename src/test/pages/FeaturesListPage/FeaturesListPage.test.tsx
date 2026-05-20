import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import FeaturesListPage from '../../../pages/FeaturesListPage/FeaturesListPage'
import { allFeatures } from '../../../services/featureService'

function renderPage(): void {
  render(
    <MemoryRouter>
      <FeaturesListPage />
    </MemoryRouter>,
  )
}

describe('FeaturesListPage', () => {
  it('renders page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1, name: /features/i })).toBeInTheDocument()
  })

  it('renders a card for every feature', () => {
    renderPage()
    for (const feature of allFeatures) {
      expect(screen.getByText(feature.heroHeadline)).toBeInTheDocument()
    }
  })

  it('links each card to the correct /features/:slug route', () => {
    renderPage()
    for (const feature of allFeatures) {
      const link = screen.getByRole('link', { name: new RegExp(feature.heroHeadline, 'i') })
      expect(link).toHaveAttribute('href', `/features/${feature.slug}`)
    }
  })

  it('shows learn more link on each card', () => {
    renderPage()
    const learnMoreLinks = screen.getAllByText(/learn more/i)
    expect(learnMoreLinks.length).toBe(allFeatures.length)
  })
})
