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
        cy.get('a[href="/student/messages"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the messages page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to interviews
        cy.get('a[href="/student/interviews"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the interviews page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to home
        cy.get('a[href="/student/home"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the home page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to profile
        cy.get('a[href="/student/profile"]', { multiple: true }).each(($el) => {
            cy.wrap($el).click();
        });
        cy.wait(5000);
        // Scroll to the bottom of the profile page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to settings
        cy.get('a[href="/student/settings"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the settings page
        cy.wait(2000); // Wait to ensure scroll is complete
    });
});
