import 'cypress-file-upload';



describe('Manages Student profile', () => {

    const studentemail = "moses31@example.com"
    const employeremail = "zetta69@example.net"
    const teacheremail = "tmiller@example.com"
    const school = "Schinner and Sons"
    const coursename = "Nihil saepe ipsam."

    it('manages student profile', () => {
        cy.visit('http://127.0.0.1:8000/');


        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(studentemail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();


        cy.get('[data-test-id="profile-link"]').click();

        function generateRandomEmail() {
            const randomString = Math.random().toString(36).substring(7);
            const domain = 'example.com';

            return `${randomString}@${domain}`;
        }






        cy.contains('Full Name').next('input')
            .clear()
            .type('Tester User');

        const randomEmail = generateRandomEmail();
        cy.contains('Email').next('input')
            .clear()
            .type(randomEmail);
        cy.contains('Education').next('input')
            .clear()
            .type(school);
        cy.contains('Preferred').next('input')
            .clear()
            .type('Developer');

        cy.get('[data-testid="skill-chip"]').first().within(() => {
            cy.get('[data-testid="remove-skill"]').click();
        });


        cy.contains('No skills').next('input')
            .clear()
            .type('PHP');

        cy.contains('Add Skill').click();








        cy.get('[data-testid="course-0"]').within(() => {
            cy.get('[data-testid="remove-course-0"]').click();
        });


        cy.get('[data-testid="course-input"]').type(coursename);
        cy.get('[data-testid="autocomplete-list"]').within(() => {
            cy.contains(coursename).click();
        });


        cy.wait(500);


        cy.contains('Save Profile Changes').click();

        cy.wait(5000);

        cy.contains('Full Name').next('input')
            .clear()
            .type('Eric Bradshaw');


        cy.contains('Email').next('input')
            .clear()
            .type(studentemail);

        cy.contains('Save Profile Changes').click();

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView().should('be.visible').click();
        cy.contains('Logout').click();






    });
});



