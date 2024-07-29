import React from 'react'
import Interviews from './Interviews'

describe('<Interviews />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Interviews />)
  })
})