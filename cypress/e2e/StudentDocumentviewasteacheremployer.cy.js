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
        cy.get('input[name="email"]').type(studentemail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
        cy.get('[data-test-id="profile-link"]').click();
        cy.contains('My Documents').click();

        const filePath = '../test.docx';
        cy.get('[data-test-id="drop-zone-0"]').attachFile(filePath, { subjectType: 'drag-n-drop' });
        cy.wait(2000);
    // Verify the document is uploaded
    cy.contains('Upload Files').click();


    cy.wait(3000); // Wait for upload to complete, adjust the time as necessary





    cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('monica.lindgren@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
        cy.get('a[href="/employer/profile"]').click();
        cy.wait(2000);
        cy.contains('My Documents').click();
        cy.wait(2000);
        cy.contains('Shortlist Documents').click();
        cy.wait(2000);
        cy.contains('Employer Documents').click();
        cy.wait(2000);

        // cy.get('[data-test-id="document-item-employer"]').attachFile(filePath, { subjectType: 'drag-n-drop' });
        // cy.contains('Upload').click();
        // cy.wait(2000);
        // cy.contains('Employer Documents').click();
        // cy.wait(2000);

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();


    });
});
