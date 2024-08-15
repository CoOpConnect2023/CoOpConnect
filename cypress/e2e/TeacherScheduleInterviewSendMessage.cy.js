describe('Schedule Student Interview', () => {

    const studentemail = "moses31@example.com"
    const employeremail = "zetta69@example.net"
    const employername = "Mr. Salvador McClure"
    const teacheremail = "tmiller@example.com"
    const school = "Schinner and Sons"
    const studentid = 2
    it('visits student interview creates then deletes an interview then logs out', () => {

        cy.visit('http://127.0.0.1:8000/');


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(teacheremail);


        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.get('[data-test-id="interviews-link"]').click();

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

        cy.contains('Student ID').next('input')


        .clear()
        .type(studentid);
        cy.wait(3000);




        cy.contains('Save').scrollIntoView().click();
        cy.wait(3000);

        cy.get('[data-test-id="messages-link"]').click();

        cy.get('[data-testid="new-message-component-teacher"]').as('newMessageComponentTeacher');

        cy.get('@newMessageComponentTeacher').should('be.visible');
        cy.get('@newMessageComponentTeacher').find('select').select(studentemail);
        cy.get('@newMessageComponentTeacher').find('select').should('have.value', studentemail);
        cy.get('[data-testid="message-input-teacher"]').type("Hello, this is a test message");
        cy.get('[data-testid="send-button-teacher"]').click();
        cy.contains('Hello, this is a test message').click();

        cy.get('@newMessageComponentTeacher').should('be.visible');
        cy.get('[data-testid="type-message-input-teacher"]').type("Hello, please confirm");
        cy.get('[data-testid="type-message-send-teacher"]').click();






        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();

        cy.wait(3000);

        cy.reload();

        cy.wait(3000);

        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(studentemail);

        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.get('[data-test-id="interviews-link"]').click();
        cy.wait(4000);
        cy.contains('Title: Tester').scrollIntoView();
        cy.contains('X').click();
        cy.wait(4000);

        cy.get('[data-test-id="messages-link"]').click();

cy.wait(4000);
cy.get('[data-testid="conversation-0"]').click();

            cy.get('input[data-testid="student-typeMessage"]').type('Confirmed!');
            cy.get('[data-testid="student-sendMessage"]').click();


            cy.wait(4000);
        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
        .should('be.visible')
        .click();
    cy.contains('Logout').click();



    });
});








