import { plpAndPdp } from '../support/pages/pom'

Cypress.Commands.add('typeLogin', (username, password) => {
	plpAndPdp.element.inputUsername().type(username)
	plpAndPdp.element.inputPassword().type(password)
	plpAndPdp.element.buttonLogin().click()
})