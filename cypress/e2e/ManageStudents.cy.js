describe('Schedule Student Interview', () => {


    const studentemail = "moses31@example.com"
const employeremail = "zetta69@example.net"
const teacheremail = "tmiller@example.com"
const coursename = "Nihil saepe ipsam."
const studentid = 2

    it('visits student interview creates then deletes an interview then logs out', () => {

        cy.visit('http://127.0.0.1:8000/');


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(teacheremail);


        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.wait(3000);

        cy.contains(studentemail).scrollIntoView();

        cy.contains('View').click();
        cy.wait(3000);

        cy.contains(studentemail).scrollIntoView().should('be.visible')
            .parent() // find the parent element that contains both 'bgleason' and the 'Delete' button
            .within(() => {
                cy.contains('Delete').click(); // find and click the 'Delete' button within this parent element
            });
            cy.wait(1000);
            cy.get('input[name="id"]').type(studentid);

            // Select the course "Commodi illum ullam voluptatibus"
            cy.get('select[name="courses"]').select(coursename);

            // Click the 'Add Student' button
            cy.contains('Add Student').click();
            cy.wait(3000);

            

            cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();
        //62

        // cy.get('a[href="/teacher/scheduling"]').click();

        // cy.get('.rbc-day-bg').eq(10).click();
        // cy.contains('Title').next('input')
        //     .clear()
        //     .type('Tester');

        // cy.contains('Description').next('textarea')
        //     .clear()
        //     .type('Tester');

        // cy.contains('Start Time').next('input')
        //     .should('be.visible')
        //     .clear()
        //     .type('00:00');
        // cy.wait(500);

        // cy.contains('End Time').next('input')
        //     .should('be.visible')
        //     .clear()
        //     .type('01:00');

        // cy.contains('Student:').next('select')

        //     .should('be.visible')
        //     .select(3);
        // cy.wait(3000);




        // cy.contains('Save').scrollIntoView().click();
        // cy.wait(3000);

        // cy;

        // //.contains('X')


        // //.click();
        // // cy.wait(3000);


        // cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
        //     .should('be.visible')
        //     .click();
        // cy.contains('Logout').click();

        // cy.wait(3000);

        // cy.reload();

        // cy.wait(3000);

        // cy.contains('Sign In').click();
        // cy.get('input[name="email"]').type('lleffler@exfddgmplde.net');

        // cy.get('input[name="password"]').type('password');
        // cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        // cy.get('a[href="/student/interviews"]').click();

        // cy.contains('Title: Tester').scrollIntoView();
        // cy.contains('X').click();
        // cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
        // .should('be.visible')
        // .click();
    cy.contains('Logout').click();



    });
});








