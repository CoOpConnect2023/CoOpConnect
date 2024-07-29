import 'cypress-file-upload';



describe('All', () => {
    it('Uses all features', () => {

        cy.visit('http://127.0.0.1:8000/');


        //     cy.contains('Sign In').click();
        //     cy.get('input[name="email"]').type('admin@a.ca');


        //     cy.get('input[name="password"]').type('password2');
        //     cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
        //     const filepathexcel = '../testupload.xlsx'; // Replace with the actual path to your Excel file
        //     cy.get('input[type="file"]').attachFile(filepathexcel);
        //     cy.wait(2000);
        //     // Click the Upload button
        //     cy.contains('Upload File').click();

        //     // Verify the success message
        //     cy.contains('Users uploaded successfully!').should('be.visible');
        //     cy.wait(2000);

        //     cy.reload()
        //     cy.wait(2000);

        //     cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
        //     .should('be.visible')
        //     .click();
        // cy.contains('Logout').click();


            cy.contains('Sign In').click();
                cy.get('input[name="email"]').type('eliassghauss@gmail.com');
                cy.get('input[name="password"]').type('password');
                cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

                cy.contains('Post a Job').click();

                cy.contains('Job Title').next('input')
                    .clear()
                    .type('Tester Job');

                    cy.contains('Company').next('input')
                    .clear()
                    .type('Tester Company');

                    cy.contains('Workplace Type').next('select')

                    .should('be.visible')
                    .select(1);

         cy.contains('Job Location').next('input')
                    .clear()
                    .type('Tester Location');

                    cy.contains('Continue').click();

                    cy.contains('Add a Job')
                    .parent()
                    .find('input[name="description"]')
                    .clear()
                    .type('This job requires many skills some of which you may or may not possess.');

                    cy.contains('Skill to add').next('input')
                    .clear()
                    .type('php');

                    cy.contains('Finished').click();

                    cy.contains('EDIT POSTING').click();

                    cy.wait(2000);
                    cy.contains('Save Changes').click();

                    cy.wait(2000);

                    cy.get('[data-test-id="profile-link"]').click();
                    cy.wait(2000);


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
                    .type('Eliass Ghauss');

                    cy.contains('Email').next('input')
                    .clear()
                    .type('eliassghauss@gmail.com');

                    cy.contains('Company').next('input')
                    .clear()
                    .type(randomString2);

                    cy.contains('Position').next('input')
                    .clear()
                    .type(randomString2);

                    cy.contains('Edit Profile').click();

                    cy.wait(2000);

                    cy.get('a[href="/employer/home"]').click();

                        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
                .should('be.visible')
                .click();
            cy.contains('Logout').click();
            cy.wait(2000);

                 cy.reload()

                 cy.wait(4000);

            cy.contains('Sign In').click();
                cy.get('input[name="email"]').type('ericwong@gmail.com');
                cy.get('input[name="password"]').type('password');
                cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

                cy.contains('Manage Classes').click();
                cy.get('input[name="name"]').type('Test Class');
                cy.get('input[name="startDate"]').type('2024-08-01');


                cy.get('input[name="endDate"]').type('2024-08-31');
                cy.contains('Create Class').click();

                cy.wait(4000);


                cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
                .should('be.visible')
                .click();
            cy.contains('Logout').click();
            cy.wait(2000);
                 cy.reload()
                 cy.wait(4000);

        cy.contains('Sign In').click();
        cy.get('input[name="email"]').type('ericbradshaw@gmail.com');
        cy.get('input[name="password"]').type('password');
        cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();
            cy.get('[data-test-id="profile-link"]').click();


            cy.contains('Full Name').next('input')
                .clear()
                .type('Tester User');


            cy.contains('Email').next('input')
                .clear()
                .type(randomEmail);
            cy.contains('Education').next('input')
                .clear()
                .type('Jones PLC');
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

            cy.get('[data-testid="course-input"]').type('Test');
            cy.get('[data-testid="autocomplete-list"]').within(() => {
                cy.contains('Test').click();
            });

            cy.wait(500);


            cy.contains('Save Profile Changes').click();












            cy.wait(5000);

            cy.contains('Full Name').next('input')
                .clear()
                .type('Eric Bradshaw');


            cy.contains('Email').next('input')
                .clear()
                .type('ericbradshaw@gmail.com');

            cy.contains('Save Profile Changes').click();

            cy.wait(2000);

            cy.contains('My Reflections').click();

            cy.wait(3000);

            cy.get('#reflectionInput').type('This is a sample reflection content.');

            cy.wait(3000);


            cy.get('form').submit();


            cy.contains('View My Reflections').click();

            cy.wait(3000);

            cy.contains('Delete').click();

            cy.wait(200);

            cy.get('[data-test-id="profile-link"]').click();


            cy.contains('My Documents').click();

            const filePath = '../test.docx';
            cy.get('[data-test-id="drop-zone-0"]').attachFile(filePath, { subjectType: 'drag-n-drop' });
            cy.wait(2000);

        cy.contains('Upload Files').click();


        cy.wait(3000);


        cy.get('a[href="/student/home"]').click();


        cy.wait(2000);

        cy.contains('View Jobs').click();

        cy.get('[data-test-id="search-field-input"]')
            .clear()
            .type('Test');

        cy.contains('View Jobs').click();

        cy.wait(3000);

        cy.contains('VIEW POSTING').click();

        cy.contains('Apply Now').click();

        cy.contains('Close').click();

        cy.get('img[src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"]').scrollIntoView()
            .should('be.visible')
            .click();
        cy.contains('Logout').click();


             cy.contains('Sign In').click();
                cy.get('input[name="email"]').type('eliassghauss@gmail.com');
                cy.get('input[name="password"]').type('password');
                cy.get('.flex.flex-col.items-center.mt-4').contains('Sign In').click();

                cy.wait(4000);

                cy.contains('VIEW POSTING').click();


    });
});
