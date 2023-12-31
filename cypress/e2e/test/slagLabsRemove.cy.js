import { plpAndPdp } from '../../support/pages/pom'

const baseUrl = Cypress.env('baseUrl')
const username = Cypress.env('login').username
const password = Cypress.env('login').password
const urlPlp = Cypress.env('endpoint').inventory
const numProductToAdd = 3
const firstIndex = 0
var arrayNames

describe('SwagLabs | PLP PDP | Remover productos del SCP desde el PLP y PDP.', () => {
    
    beforeEach('User is logged with one or more products add to the SCP.', () => {
        cy.visit(baseUrl)
        cy.typeLogin(username, password) //commands
        plpAndPdp.addProduct(numProductToAdd).then(arrayNamesReturs => { arrayNames = arrayNamesReturs })
        plpAndPdp.element.linkCartIcon().should('contain', numProductToAdd)
    })
    //PLP = PRODUCT LIST PAGE / PDP = PRODUCT DETAILS PAGE / SCP = SHOPPING CART PAGE
    it('TC1: Validate remove one product of the SCP from PLP.', () => {
        let quantityToRemove = 1
        cy.url().should('contain', urlPlp)
        plpAndPdp.removeProductPlp(quantityToRemove, arrayNames).then(newArrayNames => {
            plpAndPdp.element.linkCartIcon().should('contain', numProductToAdd - newArrayNames.length).click()
            for (var name of newArrayNames.slice(firstIndex, quantityToRemove)) {
                plpAndPdp.element.getNameProduct().should('not.contain', name)
            }
        })
    })
    it('TC2: Validate remove more than one product of the SCP from PLP.', () => {
        let quantityToRemove = 2
        cy.url().should('contain', urlPlp)
        plpAndPdp.removeProductPlp(quantityToRemove, arrayNames).then(newArrayNames => {
            plpAndPdp.element.linkCartIcon().should('contain', numProductToAdd - newArrayNames.length).click()
            for (var name of newArrayNames.slice(firstIndex, quantityToRemove)) {
                plpAndPdp.element.getNameProduct().should('not.contain', name)
            }
        })
    })
    it('TC3: Validate remove one product of the SCP from PDP.', () => {
        let quantityToRemove = 1
        plpAndPdp.removeProductPdp(quantityToRemove, arrayNames).then(newArrayNames => {
            plpAndPdp.element.linkCartIcon().should('contain', numProductToAdd - newArrayNames.length).click()
            for (var name of newArrayNames.slice(firstIndex, quantityToRemove)) {
                plpAndPdp.element.getNameProduct().should('not.contain', name)
            }
        })   
    })
    it('TC4: Validate remove more than one product of the SCP from PDP.', () => {
        let quantityToRemove = 2
        plpAndPdp.removeProductPdp(quantityToRemove, arrayNames).then(newArrayNames => {
            plpAndPdp.element.linkCartIcon().should('contain', numProductToAdd - newArrayNames.length).click()
            for (var name of newArrayNames.slice(firstIndex, quantityToRemove)) {
                plpAndPdp.element.getNameProduct().should('not.contain', name)
            }
        }) 
    })
    it('TC5: Validate remove all products of the SCP from PLP.', () => {
        let quantityToRemove = numProductToAdd
        cy.url().should('contain', urlPlp)
        plpAndPdp.removeProductPlp(quantityToRemove, arrayNames).then(newArrayNames => {
            plpAndPdp.element.linkCartIcon().should('contain', '').click()
            for (var name of newArrayNames.slice(firstIndex, quantityToRemove)) {
                plpAndPdp.element.getNameProdct().should('not.contain', name)
            }
        })
    })
    it('TC6: Validate remove all products of the SCP from PDP.', () => {
        let quantityToRemove = numProductToAdd
        plpAndPdp.removeProductPdp(quantityToRemove, arrayNames).then(newArrayNames => {
            plpAndPdp.element.linkCartIcon().should('contain', '').click()
            for (var name of newArrayNames.slice(firstIndex, quantityToRemove)) {
                plpAndPdp.element.getNameProdct().should('not.contain', name)
            }
        })     
    })
})