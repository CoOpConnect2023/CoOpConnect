import 'cypress-file-upload';



describe('Schedule Student Interview', () => {
    it('visits student interview creates then deletes an interview then logs out', () => {

        cy.visit('http://127.0.0.1:8000/');


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('admin@a.ca');


        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
        const filePath = '../testupload.xlsx'; // Replace with the actual path to your Excel file
        cy.get('input[type="file"]').attachFile(filePath);
        cy.wait(2000);
        // Click the Upload button
        cy.contains('Upload File').click();

        // Verify the success message
        cy.contains('Users uploaded successfully!').should('be.visible');
        cy.wait(2000);

        cy.reload()
        cy.wait(2000);

        const createdUserEmails = ['ericbradshaw@gmail.com', 'eliassghauss@gmail.com', 'ericwong@gmail.com', ];

        createdUserEmails.forEach(userId => {
            cy.get(`[data-testid="user-card-${userId}"]`).within(() => {
                cy.get(`[data-testid="delete-button-${userId}"]`).click();
            });
        });
        cy.wait(3000);

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();
    });
});








