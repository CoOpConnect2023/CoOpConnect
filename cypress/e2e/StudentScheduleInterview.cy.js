describe('Schedule Student Interview', () => {
    it('visits student interview creates then deletes an interview then logs out', () => {

        cy.visit('http://127.0.0.1:8000/');


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('rex.leffler@example.com');


        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.get('a[href="/student/interviews"]').click();

        cy.get('.rbc-day-bg').eq(10).click();
        cy.contains('Title').next('input')
            .clear()
            .type('Tester');

        cy.contains('Description').next('textarea')
            .clear()
            .type('Tester');

            cy.contains('Start Time').next('input')
            .should('be.visible')
            .clear()
            .type('00:00');
        cy.wait(500);

        cy.contains('End Time').next('input')
            .should('be.visible')
            .clear()
            .type('01:00');




        cy.contains('Save').click();
        cy.wait(2000);

        cy

            .contains('X')


            .click();
            cy.wait(2000);


        cy.get('.sc-dAlxHm.ekFPpr').click();
        cy.contains('Logout').click();






    });
});








