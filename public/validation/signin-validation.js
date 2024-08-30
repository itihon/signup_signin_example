import { Validation } from "isomorphic-validation";
import { emailV, passwordV } from "./validations.js";
import { disableElement, enableElement, renderConstraints, styleInputOnValidityChange } from "./view-constraints.js";

/**
 * Creates/queries (by the selector) a form.
 * Clones passed validations and groupes the clones into one validation.
 * Binds cloned validations to the corresponding form fields.
 */
const [signinForm, signinValidation] = Validation.profile(
    '#signin_form', ['email', 'password'], [emailV, passwordV]
);

// callbacks will be added only on the client side
signinValidation
    .client
    .started(disableElement(signinForm.submitBtn))
    .valid(enableElement(signinForm.submitBtn));

// these iterations will be executed only on the client side
signinValidation.client.constraints.forEach(renderConstraints);
signinValidation.client.validations.forEach(styleInputOnValidityChange);

signinForm.addEventListener('input', signinValidation);

export default signinValidation;