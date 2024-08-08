import 'cypress-file-upload';


describe('Schedule Student Interview', () => {
    const studentemail = "moses31@example.com"
    const employeremail = "zetta69@example.net"
    const teacheremail = "tmiller@example.com"
    const school = "Schinner and Sons"
    it('visits student interview, creates then deletes an interview, then logs out', () => {
        // Visit the login page
        cy.visit('http://127.0.0.1:8000/');

        // Sign in
        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(teacheremail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.contains('Documents').scrollIntoView().click({ force: true });

        const filePath = '../test.docx';
        cy.get('[data-testid="drop-zone-employer"]').attachFile(filePath, { subjectType: 'drag-n-drop' });
        cy.wait(2000);
    // Verify the document is uploaded
    cy.contains('Upload').click();
    cy.wait(3000);
    cy.contains('My Files').scrollIntoView().click({ force: true });


    cy.wait(3000); // Wait for upload to complete, adjust the time as necessary





    cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();




    });
});
