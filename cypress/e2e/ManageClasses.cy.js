describe('Manages Class for teacher', () => {

const studentemail = "moses31@example.com"
const employeremail = "zetta69@example.net"
const teacheremail = "tmiller@example.com"

    it('visits manageclasses, creates edits, deletes class and logs out', () => {

      cy.visit('http://127.0.0.1:8000/');


      cy.contains('Sign In').click();
      cy.get('input[name="email"]').type(teacheremail);


    cy.get('input[name="password"]').type('password');
    cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
    cy.wait(3000);
    cy.contains('View class').scrollIntoView().click();
    cy.get('input[name="name"]').type('Test Class');
    cy.get('input[name="startDate"]').type('2024-08-01');


    cy.get('input[name="endDate"]').type('2024-08-31');
    cy.contains('Create Class').click();
    cy.contains('Edit').click();

    cy.get('input[name="startDate"]').type('2024-09-21');


    cy.get('input[name="endDate"]').type('2024-09-29');
    cy.contains('Save Changes').click();
    cy.contains('Delete').click();
    cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();





  });
});
