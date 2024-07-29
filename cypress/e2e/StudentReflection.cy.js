describe('Schedule Student Interview', () => {
    it('visits student interview, creates then deletes an interview, then logs out', () => {
        // Visit the login page
        cy.visit('http://127.0.0.1:8000/');

        // Sign in
        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('rex.leffler@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.wait(2000);

        // Navigate to messages
        cy.get('a[href="/student/profile"]').eq(0).click();
        cy.contains('My Reflections').click();

        cy.get('#reflectionInput').type('This is a sample reflection content.');

        // Submit the form
        cy.get('form').submit(); // Assumes the form is the first <form> element

        // Check for a success message
        cy.contains('View My Reflections').click();

        cy.wait(3000);

        cy.contains('Delete').click();

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();


    });
});
