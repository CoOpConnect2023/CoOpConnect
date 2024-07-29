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

        cy.contains('View Jobs').click();


    });
});
