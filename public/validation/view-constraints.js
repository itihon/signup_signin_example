function constraintsTemplate() {
    return `<div class="constraints"></div>`;
}

function constraintTemplate({desc}) {
    return `
        <span class="constraint">
            <span class="status">✔️</span>
            <span class="descr">${desc}</span>
        </span>
    `;
}

function preloaderTemplate() {
    return `
        <style>.preloader { opacity: 1; animation: 3s fadein; } @keyframes fadein { 0% { opacity: 0; } 100% { opacity: 1; }}</style>
        <svg class="preloader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="10" height="10" style="shape-rendering: auto; display: block; background: transparent;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-linecap="round" fill="none" stroke-dasharray="50.26548245743669 50.26548245743669" stroke="#0099e5" stroke-width="17" r="32" cy="50" cx="50">
        <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur=".5s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </circle><g></g></g></svg>
    `;
}

function htmlToNode(htmlString = '') {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function ConstraintComponent(validator) {
    const component = htmlToNode(constraintTemplate(validator));
    const status = component.firstElementChild;

    let showPreloaderTO; 
    
    validator.started(() => {
        clearTimeout(showPreloaderTO);
        status.innerText = '✔️';
        showPreloaderTO = setTimeout(() => { 
            status.innerHTML = preloaderTemplate(); 
        }, 1000);
    });

    validator.valid(() => {
        clearTimeout(showPreloaderTO);
        status.innerText = '✅';
    });

    validator.invalid(() => {
        clearTimeout(showPreloaderTO);
        status.innerText = '🚫';
    });

    validator.error((_, next) => {
        clearTimeout(showPreloaderTO);
        status.innerText = '❌';

        next();
    });

    return component;
}

export function renderConstraints(set, input) {
    const constraints = [].concat(...set);
    const constraintsContainer = htmlToNode(constraintsTemplate());

    input.insertAdjacentElement('afterend', constraintsContainer);
    
    constraints.forEach(constraint => {
        constraintsContainer.appendChild(ConstraintComponent(constraint));
    });
};

export function styleInputOnValidityChange(validation) {
    const [[input]] = validation.constraints;
    
    validation.changed(() => {
        if (validation.isValid) {
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
        }
    });
}

export const enableElement = (element) => () => { element.disabled = false; };
export const disableElement = (element) => () => { element.disabled = true; };