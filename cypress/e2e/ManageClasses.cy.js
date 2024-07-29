describe('Manages Class for teacher', () => {
    it('visits manageclasses, creates edits, deletes class and logs out', () => {

      cy.visit('http://127.0.0.1:8000/');


      cy.contains('Sign In').click();
      cy.get('input[name="email"]').type('schneider.demetrius@example.com');


    cy.get('input[name="password"]').type('password');
    cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
    cy.contains('Manage Classes').click();
    cy.get('input[name="name"]').type('Test Class');
    cy.get('input[name="startDate"]').type('2024-08-01');


    cy.get('input[name="endDate"]').type('2024-08-31');
    cy.contains('Create Class').click();
    cy.contains('Edit').click();

    cy.get('input[name="startDate"]').type('2024-09-21');


    cy.get('input[name="endDate"]').type('2024-09-29');
    cy.contains('Save Changes').click();
    cy.contains('Delete').click();
    cy.get('.sc-dAlxHm.ekFPpr').click();
    cy.contains('Logout').click();






  });
});
