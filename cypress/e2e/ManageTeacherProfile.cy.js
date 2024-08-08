import 'cypress-file-upload';



describe('Manages Student for teacher', () => {

    const studentemail = "moses31@example.com"
const employeremail = "zetta69@example.net"
const teacheremail = "tmiller@example.com"
const school = "Schinner and Sons"

    it('visits manage classes, creates, edits, deletes class, and logs out', () => {
        cy.visit('http://127.0.0.1:8000/');

        // Sign in
        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(teacheremail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();


        cy.get('[data-test-id="profile-link"]').click();
        //cy.contains('Clear').click();


        cy.contains('Full Name').next('input')
            .clear()
            .type('Tester User');





        cy.contains('School').next('input')
            .clear()
            .type(school);


        cy.contains('Specialty').next('input')
            .clear()
            .type('Developer');


        const imagePath = '../../public/storage/profile_images/1718995467.png';



        cy.contains('Edit Profile').click();


        cy.contains('Profile updated successfully!').should('be.visible');

        // Logout
        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();
    });
});



