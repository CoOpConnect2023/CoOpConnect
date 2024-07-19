describe('Schedule Student Interview and send message', () => {
    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    it('visits student interview, creates, deletes an interview, and logs out', () => {
        cy.visit('http://127.0.0.1:8000/');

        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('monica.lindgren@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.contains('EDIT POSTING').click();

        const randomJobTitle = generateRandomString(10);
        const randomDescription = generateRandomString(30);
        const randomLocation = generateRandomString(30);

        cy.get('input[name="title"]').clear().type(randomJobTitle);
        cy.get('textarea[name="description"]').clear().type(randomDescription);
        cy.get('select[name="postingStatus"]').select('closed');
        cy.get('select[name="jobType"]').select('Part-time');
        cy.get('input[name="location"]').clear().type(randomLocation);

        cy.contains('Save Changes').click();
        cy.contains('VIEW POSTING').click();
        cy.contains('View Applicant').click();
        cy.contains('Add to Shortlist').click();
        cy.contains('×').click();

        cy.get('a[href="/employer/interviews"]').click();
        cy.get('.rbc-day-bg').eq(10).click();
        cy.contains('Title').next('input').clear().type('Tester');
        cy.contains('Description').next('textarea').clear().type('Tester');
        cy.contains('Start Time').next('input').should('be.visible').clear().type('00:00');
        cy.wait(500);
        cy.contains('End Time').next('input').should('be.visible').clear().type('01:00');
        cy.contains('Student:').next('select').should('be.visible').select(1);
        cy.contains('Save').scrollIntoView().click();
        cy.contains('Agenda').click();
        cy.get('a[href="/employer/messages"]').click();
        cy.wait(1000);
        cy.get('[data-testid="new-message-component"]').as('newMessageComponent');

        cy.get('@newMessageComponent').should('be.visible');
        cy.get('@newMessageComponent').find('select').select('rex.leffler@example.com');
        cy.get('@newMessageComponent').find('select').should('have.value', 'rex.leffler@example.com');
        cy.get('[data-testid="message-input"]').type("Hello, this is a test message");
        cy.get('[data-testid="send-button"]').click();
        cy.contains('Hello, this is a test message').click();

        cy.get('@newMessageComponent').should('be.visible');
        cy.get('[data-testid="type-message-input"]').type("Hello, please confirm");
        cy.get('[data-testid="type-message-send"]').click();

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();

        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('rex.leffler@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
        cy.get('[data-testid="nav-student-component"]').as('studentNavComponent').click();
        cy.get('[data-testid="nav-student-notification"]').click();
        cy.get('[data-testid="notification-modal"]').should('be.visible');



        // cy.get('[data-testid="conversation"]').each(($conversation) => {
        //     cy.wrap($conversation).each(($button) => {
        //         cy.wrap($button).click()
        //     });

            // cy.wait(3000);

            cy.get('a[href="/student/messages"]').click();


            cy.get('[data-testid="conversation-0"]').click();

            cy.get('input[data-testid="student-typeMessage"]').type('Confirmed!');
            cy.get('[data-testid="student-sendMessage"]').click();

            cy.get('a[href="/student/interviews"]').click();

            cy.contains('Title: Tester').scrollIntoView();
        cy.contains('X').click();

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();
        });
    });

