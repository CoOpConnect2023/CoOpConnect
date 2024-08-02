import 'cypress-file-upload';

const studentemail = "moses31@example.com"
const employeremail = "zetta69@example.net"


describe('All', () => {

    const generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const randomJobTitle = generateRandomString(10);
    const randomDescription = generateRandomString(30);
    const randomLocation = generateRandomString(30);

    it('Uses all features', () => {

//         cy.visit('http://127.0.0.1:8000/');
//         cy.contains('Sign In').click();
//         cy.get('input[name="email"]').type(employeremail);
//         cy.get('input[name="password"]').type('password');
//         cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

//         cy.contains('Post a Job').click();


//         cy.get('input[name="title"]').clear().type(randomJobTitle);
//         cy.get('input[name="company"]').clear().type(randomJobTitle);
//         cy.get('select[name="jobType"]').select('Hybrid');
//         cy.get('input[name="location"]').clear().type(randomLocation);

//         cy.contains('Continue').click();

//         cy.get('input[name="description"]').clear().type(randomLocation);
//         cy.get('input[name="skills"]')
//   .clear()
//   .type('PHP{enter}')
//   .type('JavaScript{enter}');
//   cy.contains('Finished').click();
 // cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
        //     .should('be.visible')
        //     .click();
        // cy.contains('Logout').click();


//   cy.visit('http://127.0.0.1:8000/');
//         cy.contains('Sign In').click();
//         cy.get('input[name="email"]').type(studentemail);
//         cy.get('input[name="password"]').type('password');
//         cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
//        cy.contains('View Jobs').click();
//        cy.get('[data-test-id="search-field-input"]')
//   .type('ib2lTbaNZ0');
//   cy.contains('View Jobs').click();
//   cy.contains('Apply Here!').click();
//   cy.wait(4000);
//   cy.contains('Apply').click();
//       cy.wait(4000);
//   cy.get('label:contains("Resume Link:") input')
//       .clear() // Clear the input field if necessary
//       .type('https://flowcv.com/resume/06rlrfaoih');
//       cy.wait(4000);

//       cy.contains('Apply Now').click();
//       cy.wait(4000);





//    cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
//             .should('be.visible')
//             .click();
//         cy.contains('Logout').click();










    //     cy.visit('http://127.0.0.1:8000/');
    //     cy.contains('Sign In').click();
    //     cy.get('input[name="email"]').type(employeremail);
    //     cy.get('input[name="password"]').type('password');
    //     cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
    //     cy.wait(3000);
    //     cy.contains('[data-test-id^="job-card-"]', 'ib2lTbaNZ0')
    //   .should('exist')
    //   .within(() => {
    //     cy.get('[data-test-id^="view-posting-"]').click();
    //   });
    //   cy.contains('View Applicants').click();
    //   cy.contains('Accept').click();
    //   cy.get('textarea[placeholder="Enter your message here"]')
    //   .type('Looking forward to our interview!');


    //   cy.get('input[placeholder="Select a time slot"]').first().click();


    //   cy.get('.rdtDay')
    //     .contains('15')
    //     .click();

    //     cy.contains('Send Details').click();


 // cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
        //     .should('be.visible')
        //     .click();
        // cy.contains('Logout').click();



          cy.visit('http://127.0.0.1:8000/');
        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type(studentemail);
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

        cy.get('[data-test-id="viewapplications-link"]').click();
        cy.contains('Interview').click();
        cy.contains('div', 'ib2lTbaNZ0') // Assuming the title is within a <div>
        .should('exist') // Ensure the div exists
        .within(() => {
          // Find and click the "Accept" button within this div
          cy.contains('button', 'Accept').click(); // Assuming the button contains the text "Accept"
        });


    });
});
