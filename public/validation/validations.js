import { Validation } from 'isomorphic-validation';
import { hasOnlyLetters, isEmail, isGreaterThan, isLessThan, isLongerThan, isPositiveInt, isShorterThan } from './predicates.js';

// validations here are not bound to any form field yet 
// they will be bound in the importing, profile-specific modules
export const firstNameV = Validation();
export const lastNameV = Validation();
export const ageV = Validation(); // this field is optional
export const emailV = Validation();
export const passwordV = Validation();
export const pwdconfirmV = Validation();

/**
 * Constraints that are common/shared 
 * between specified validations in all profiles and environments
 */

Validation.group(

    Validation.group(firstNameV, lastNameV)
        .constraint(
            hasOnlyLetters, 
            { desc: 'Should contain only letters.' }
        )
        .constraint(
            isLongerThan(0), 
            { desc: 'Should be at least 1 character long.' }
        ),

    Validation.group(passwordV, pwdconfirmV)
        .constraint(
            isLongerThan(5),
            { desc: 'Should be at least 6 characters long.' }
        )

).constraint(
    isShorterThan(35),
    { desc: 'Should be at most 34 characters long.' }
);

/**
 * In terms of just adding constraints the code above is roughly equivalent to
 * the code below:
 * 
 *  [firstNameV, lastNameV].map(
 *  
 *      // 1. First we are adding constraints to firstNameV and lastNameV
 *      validation => validation
 *          .constraint(
 *              hasOnlyLetters, 
 *              { desc: 'Should contain only letters.' }
 *          )
 *          .constraint(
 *              isLongerThan(0), 
 *              { desc: 'Should be at least 1 character long.' }
 *          ),
 *  
 *  // 3. Then we are concatenating the two resulting arrays
 *  ).concat(
 *  
 *      [passwordV, pwdConfirmV].map(
 * 
 *          // 2. Then we are adding a constraint to passwordV and pwdConfirmV
 *          validation => validation
 *              .constraint(
 *                  isLongerThan(5),
 *                  { desc: 'Should be at least 6 characters long.' }
 *              ),
 * 
 *      ),
 *  
 *  ).forEach(
 *  
 *      // 4. And lastly we are adding a constraint to each of the four validations
 *      validation => validation
 *          .constraint(
 *              isShorterThan(35),
 *              { desc: 'Should be at most 34 characters long.' }
 *          ),
 *  
 *  );
 * 
 */


/**
 * Constraints that are unique among Validations 
 * but common/shared among validation profiles and environments.
 * Validation-specific constraints.
 */

// optional predicates are executed if the validatable value is not equal to the
// validation's initial value (default is '') and undefined, otherwise 
// they are valid
ageV
    .constraint(
        isPositiveInt,
        { desc: 'Should be a number', optional: true }
    )
    .constraint(
        isGreaterThan(18),
        { desc: 'An applicant should be older than 18.', optional: true }
    )
    .constraint(
        isLessThan(45),
        { desc: 'An applicant should not be older than 45.', optional: true }
    );

// if it is not in the e-mail format, checking the email for existense later
// is meaningless, it is a costly operation. (next = false)
emailV
    .constraint(
        isLongerThan(4),
        { desc: 'Should be at least 5 characters long.' }
    )
    .constraint(
        isShorterThan(81),
        { desc: '80 characters is enough for a readable email.' }
    )
    .constraint(
        isEmail,
        { desc: 'Should be written in the e-mail format.', next: false }
    );




/**
 * !Constraints that are unique among validation profiles 
 * should be added only to cloned Validations after creating profiles
 * in the importing, profile-specific modules
 */