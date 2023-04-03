import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import ApiKeyView from './apikey-view'
import '@testing-library/jest-dom'

describe('apiKeyView component', () => {
  describe('generate page', () => {
    const fakeProps = {
      apiKey: '',
      isLoading: false,
      generate: jest.fn(),
      dismissGlobalError: jest.fn()
    }

    beforeEach(() => {
      jest.resetAllMocks()
      render(<ApiKeyView {...fakeProps} />)
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
  })

  describe('confirmation modal', () => {
    let modal
    const fakeProps = {
      apiKey: '',
      isLoading: false,
      generate: jest.fn(),
      dismissGlobalError: jest.fn()
    }

    beforeEach(async () => {
      jest.resetAllMocks()
      render(<ApiKeyView {...fakeProps} />)

      const generateButton = screen.getByRole('button', { name: 'Generate' })
      fireEvent.click(generateButton)

      modal = await screen.findByRole('dialog', { hidden: true })
    })

    it('Is opened from the Generate button', () => {
      expect(modal).toBeInTheDocument()
    })

    it('Contains a generate button', () => {
      const modalGenerateButton = screen.getByRole('button', { name: 'Confirm', hidden: true })
      expect(modalGenerateButton).toBeInTheDocument()

      expect(modalGenerateButton).toHaveClass('modal-confirm-button')
    })

    it('Generates the API key when the generate button is clicked', () => {
      const modalGenerateButton = screen.getByRole('button', { name: 'Confirm', hidden: true })
      expect(modalGenerateButton).toBeInTheDocument()
      expect(modalGenerateButton).toHaveClass('modal-confirm-button')

      fireEvent.click(modalGenerateButton)

      expect(fakeProps.generate).toHaveBeenCalled()
    })

    it('Contains a cancel button', () => {
      const modalCancelButton = screen.getByRole('button', { name: 'Cancel', hidden: true })

      expect(modalCancelButton).toBeInTheDocument()
      expect(modalCancelButton).toHaveClass('modal-cancel-button')
    })

    it('Closes the modal when cancel button is clicked', () => {
      const modalCancelButton = screen.getByRole('button', { name: 'Cancel', hidden: true })
      expect(modalCancelButton).toBeInTheDocument()
      expect(modalCancelButton).toHaveClass('modal-cancel-button')

      fireEvent.click(modalCancelButton)

      expect(modal).not.toBeInTheDocument()
    })
  })

  describe('when isLoading', () => {
    const fakeProps = {
      apiKey: '',
      isLoading: true,
      generate: jest.fn(),
      dismissGlobalError: jest.fn()
    }

    beforeEach(async () => {
      jest.resetAllMocks()
      render(<ApiKeyView {...fakeProps} />)
      const generateButton = screen.getByRole('button', { name: 'Generate' })
      fireEvent.click(generateButton)
    })

    it('Displays a loading spinner when the generate button is clicked', () => {
      const loadingSpinner = screen.getByTestId('loading-spinner', { hidden: true })
      expect(loadingSpinner).toBeInTheDocument()
      expect(loadingSpinner).toHaveClass('loading-spinner')
    })
  })

  describe('display page', () => {
    const fakeProps = {
      apiKey: 'someFakeApiKey',
      isLoading: false,
      generate: jest.fn(),
      dismissGlobalError: jest.fn()
    }

    beforeEach(() => {
      jest.resetAllMocks()
      render(<ApiKeyView {...fakeProps} />)
    })

    it('Contains a header', () => {
      const subject = screen.getByText('Your API Key')

      expect(subject).toBeInTheDocument()
      expect(subject).toHaveClass('apiKey-view-title')
    })

    it('Contains instruction text', () => {
      const expectedText = 'This API key will only be displayed once. Please store it somewhere secure. If you lose it, you will need to reset your key to get a new one.'

      const subject = screen.getByText(expectedText)

      expect(subject).toBeInTheDocument()

      expect(subject).toHaveClass('apiKey-view-paragraph')
    })

    it('Contains a sub-header', () => {
      const subject = screen.getByText('API Key')

      expect(subject).toBeInTheDocument()
      expect(subject).toHaveClass('apiKey-view-sub-title')
    })

    it('Contains an display window for the api key', () => {
      const subject = screen.getByDisplayValue(fakeProps.apiKey)

      expect(subject).toBeInTheDocument()
      expect(subject).toHaveClass('apiKey-view-display-page-display-window')
    })

    it('Contains a copy button for the api key', () => {
      const subject = screen.getByText('Copy')

      expect(subject).toBeInTheDocument()
      expect(subject).toHaveClass('apiKey-view-display-page-copy-button')
    })

    it('Copies the api key when clicking on the copy button', () => {
      navigator.clipboard = {
        writeText: jest.fn()
      }

      const copyButton = screen.getByText('Copy')
      expect(copyButton).toBeInTheDocument()
      expect(copyButton).toHaveClass('apiKey-view-display-page-copy-button')

      fireEvent.click(copyButton)

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(fakeProps.apiKey)
    })

    it('Contains a return home button', () => {
      const subject = screen.getByText('Return Home')

      expect(subject).toBeInTheDocument()
      expect(subject).toHaveClass('apiKey-view-display-page-return-button')
    })
  })
})
