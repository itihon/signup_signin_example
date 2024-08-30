import { Validation } from "isomorphic-validation";
import { emailV, passwordV } from "./validations.js";

/**
 * Creates/queries (by the selector) a form.
 * Clones passed validations and groupes the clones into one validation.
 * Binds cloned validations to corresponding form fields.
 */
const [signinForm, signinValidation] = Validation.profile(
    '#signin_form', ['email', 'password'], [emailV, passwordV]
);

// callback will be added only on the client side
signinValidation.client.validated(
    ({isValid}) => { signinForm.submitBtn.disabled = !isValid }
);

signinForm.addEventListener('input', signinValidation);

export default signinValidation;