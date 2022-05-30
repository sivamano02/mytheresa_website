/// <reference types="cypress" />
describe('mytheresa-qa-assessment', () => {
  beforeEach(() => {
    cy.visit(("https://www.mytheresa.com/en-de/men.html"), {
      headers: {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "axios/0.18.0"
      }
    })

  })

  it('Testcase-1: to check if all the links provide 2xx or 3xx', () => {
      cy.get('a[href*="mytheresa.com"]:not([href=""])').each(($el) => { cy.request($el.prop("href")).as("link") })
      cy.get('@link').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.contain('^[2,3]{1}[0]{1}[0-9]{1}$')
    })
  })

  it('Testcase-2: Login', () => {
    cy.contains('#myaccount', 'My account').click()
    cy.get('[class="input-text validate-latin-only required-entry validate-email"]').clear().type('testmail@maildrop.cc')
    cy.get('[class="input-text required-entry validate-latin-only validate-password"]').clear().type('Me@2022')
    cy.get('[title="Login"]').click()
    cy.contains('.pa1', 'E-mail: testmail@maildrop.cc').should('be.visible')
  })
})