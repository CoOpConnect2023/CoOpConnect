describe('Schedule Student Interview', () => {
    it('visits student interview, creates then deletes an interview, then logs out', () => {

        const studentemail = "moses31@example.com"
        const employeremail = "zetta69@example.net"
        const teacheremail = "tmiller@example.com"
        const school = "Schinner and Sons"
        // Visit the login page
        cy.visit('http://127.0.0.1:8000/');

        // Sign in
        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(studentemail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.wait(2000);

        // Navigate to messages
        cy.get('[data-test-id="messages-link"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the messages page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to interviews
        cy.get('[data-test-id="home-link"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the interviews page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to home
        cy.get('[data-test-id="viewapplications-link"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the home page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to profile
        cy.get('[data-test-id="profile-link"]').click();
        cy.wait(5000);
        // Scroll to the bottom of the profile page
        cy.wait(2000); // Wait to ensure scroll is complete

        // Navigate to settings
        cy.get('[data-test-id="settings-link"]').click();
        cy.wait(5000);

        cy.get('[data-test-id="map-link"]').click();
        cy.wait(5000);


        cy.wait(2000); // Wait to ensure scroll is complete

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();
    });
});
