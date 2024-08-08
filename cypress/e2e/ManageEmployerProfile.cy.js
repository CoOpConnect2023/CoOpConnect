import 'cypress-file-upload';



describe('Manages Student profile', () => {

    const studentemail = "moses31@example.com"
    const employeremail = "zetta69@example.net"
    const teacheremail = "tmiller@example.com"
    const school = "Schinner and Sons"

    it('manages student profile', () => {
        cy.visit('http://127.0.0.1:8000/');


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(employeremail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        function generateRandomEmail() {
            const randomString = Math.random().toString(36).substring(7);
            const domain = 'example.com';

            return `${randomString}@${domain}`;
        }

        function generateRandomString() {
            const randomString = Math.random().toString(36).substring(7);


            return `${randomString}`;
        }

        const randomString = generateRandomString();
        const randomEmail = generateRandomEmail();
        const randomString2 = generateRandomString();



        cy.get('[data-test-id="profile-link"]').click();

        cy.contains('Bio').next('input')
            .clear()
            .type('This is a test bio lalala');

            cy.contains('Full Name').next('input')
            .clear()
            .type('Tester User');

            cy.contains('Email').next('input')
            .clear()
            .type(randomEmail);

            cy.contains('Company').next('input')
            .clear()
            .type(randomString);

            cy.contains('Position').next('input')
            .clear()
            .type(randomString);

            cy.contains('Edit Profile').click();

        cy.wait(5000);


        cy.contains('Full Name').next('input')
            .clear()
            .type('Tester User');

            cy.contains('Email').next('input')
            .clear()
            .type(employeremail);

            cy.contains('Company').next('input')
            .clear()
            .type(randomString2);

            cy.contains('Position').next('input')
            .clear()
            .type(randomString2);

            cy.contains('Edit Profile').click();

            cy.wait(2000);

            cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();


    })})
