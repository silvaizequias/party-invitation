describe('Conteúdo', () => {
  it('Verifica se está correto', () => {
    cy.visit('/')
    cy.get('[data-test="landing-page-text-h6"]').should(
      'contain.text',
      'confirme sua presença',
    )
    cy.get('[data-test="landing-page-text-h2"]').should(
      'contain.text',
      'Você é o Meu Convidado Especial!',
    )
    cy.get('[data-test="landing-page-text-body1"]').contains('p')
    cy.get('[data-test="landing-page-text-body1"]').should(
      'contain.text',
      'Para confirmar sua presença preencha o formulário, escolhendo sua cor favoria para ir no dia do evento.',
    )
    cy.get('[data-test="sign-up-form"]').should('contain.html', 'input')
    cy.get('[data-test="sign-up-form"]').should('contain.html', 'button')
  })
})
