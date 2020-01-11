// import { Given } from "cypress-cucumber-preprocessor/steps";
 
// const url = 'https://garybirges.github.io/Folio/'
// Given('I open Portfolio page', () => {
//   cy.visit(url)
// })

import { Given } from "cypress-cucumber-preprocessor/steps";
 
const url = 'https://google.com'
Given('I open Google page', () => {
  cy.visit(url)
})