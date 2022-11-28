import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import ApiKeyView from './apikey-view'
import '@testing-library/jest-dom'
import { options } from 'node-forge'

describe('apiKeyView component', () => {
  // const mockLoginWithRedirect = jest.fn(() => Promise.resolve({}))
  beforeEach(() => {
    // jest.resetAllMocks()
    // jest.spyOn(auth0ClientProvider, 'get').mockImplementation(() => Promise.resolve({
    //   isAuthenticated: jest.fn(() => Promise.resolve(false)),
    //   handleRedirectCallback: jest.fn(() => Promise.resolve({})),
    //   loginWithRedirect: mockLoginWithRedirect
    // }))
    render(<ApiKeyView />)
  })

  it('Contains a header', () => {
    const subject = screen.getByText('Generate API Key')

    expect(subject).toBeInTheDocument()
    expect(subject).toHaveClass('apiKey-view-title')
  })

  it('Contains instruction text', () => {
    const expectedText = 'Your API key should be kept secure and never shared. For security reasons, we do not display your API key.'
    const expectedText2 = 'For first time API Key creation or if you lose your API key, you can generate a new key here.'

    const subject = screen.getByText(expectedText)
    const subject2 = screen.getByText(expectedText2)

    expect(subject).toBeInTheDocument()
    expect(subject2).toBeInTheDocument()

    expect(subject).toHaveClass('apiKey-view-paragraph')
    expect(subject2).toHaveClass('apiKey-view-paragraph')
  })

  it('Contains a generate api key button', () => {
    const expectedText = 'Generate'

    const subject = screen.getByRole('button', { name: expectedText })

    expect(subject).toBeInTheDocument()

    expect(subject).toHaveClass('apiKey-view-generate-button')
  })

  describe('Confirmation modal', () => {
    let subject
    beforeEach(async () => {
      const generateButton = screen.getByRole('button', { name: 'Generate' })
      fireEvent.click(generateButton)

      subject = await screen.findByRole('dialog', { hidden: true })
    })
    it('Is opened from the Generate button', () => {
      expect(subject).toBeInTheDocument()

      expect(subject).toHaveClass('apiKey-modal-container')
    })

    // it('Contains a cancel button that closes the modal', () => {
    //   const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    //
    //   expect(subject).toBeInTheDocument()
    //
    //   expect(subject).toHaveClass('apiKey-modal-container')
    // })
  })
})
