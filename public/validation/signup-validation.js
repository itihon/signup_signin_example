import { Validation } from "isomorphic-validation";
import { firstNameV, lastNameV, ageV, emailV, passwordV, pwdconfirmV } from "./validations.js";
import { areTwoEqual, isEmailNotTemp, isEmailVacantC, isEmailVacantS } from "./predicates.js";

/**
 * Creates/queries (by the selector) a form.
 * Clones passed validations and groupes the clones into one validation.
 * Binds cloned validations to corresponding form fields.
 */
const [signupForm, signupValidation] = Validation.profile(
    '#signup_form', 
    [ 'firstName', 'lastName', 'age', 'email', 'password', 'pwdconfirm'], 
    [firstNameV, lastNameV, ageV, emailV, passwordV, pwdconfirmV]
);

/** cloned validations */
const [,,, emailVc, passwordVc, pwdconfirmVc] = signupValidation.validations;

/** 
 * Constraints, unique among validation profiles.
 * Profile-specific constraints.
 */

// constraints added to a glued validation receive validatable values
// of all glued validaions as arguments and validate/invalidate all 
// glued validations
Validation.glue(passwordVc, pwdconfirmVc)
    .constraint(
        areTwoEqual,
        { desc: 'Password and password confirmation should be the same.' }
    );


emailVc
    .constraint( 
        isEmailNotTemp,
        { desc: 'A permanent e-mail address should be used.', next: false }
    )
    .client.constraint( // constraint will be added only on the client side
        isEmailVacantC,
        { 
            desc: 'The specified e-mail should not be already registered.',
            debounce: 5000,
        }
    )
    .server.constraint( // constraint will be added only on the server side
        isEmailVacantS,
    );

// callback will be added only on the client side
signupValidation.client.validated(
    ({isValid}) => { signupForm.submitBtn.disabled = !isValid }
);

signupForm.addEventListener('input', signupValidation);

export default signupValidation;
export { emailVc as emailValidation };