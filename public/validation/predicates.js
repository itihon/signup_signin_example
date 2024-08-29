const defineName = (fn, name) => 
  Object.defineProperty(fn, 'name', { value: name });

export const hasOnlyLetters = (value) => /^[A-Za-z]+$/.test(value);

export const isLongerThan = (number) =>
  defineName(
    (value) => String(value).length > number,
    `${isLongerThan.name}(${number})`,
  );

export const isShorterThan = (number) =>
  defineName(
    (value) => String(value).length < number,
    `${isShorterThan.name}(${number})`,
  );

export const isGreaterThan = (number) =>
  defineName(
    (value) => Number(number) < Number(value),
    `${isGreaterThan.name}(${number})`,
  );

export const isLessThan = (number) =>
  defineName(
    (value) => Number(number) > Number(value),
    `${isLessThan.name}(${number})`,
  );

export const isEmail = (value) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    .test(value);

export const isEmailNotTemp = (
    (domainBlacklist) => function isEmailNotTemp(value) {
      const domain = String(value).split('@')[1];
      return !domainBlacklist.some((v) => v === domain);
    }
)([ 'bacaki.com', 'hellomailo.net', 'belgianairways.com' ]);

export const isEmailVacantC = value => 
    fetch(
        'checkemail', 
        { 
            method: 'post', 
            body: new URLSearchParams(`email=${value}`),
        }
    ).then(resp => resp.json());

export const isEmailVacantS = async value => {
    const repository = (await import('../../repository.js')).default;
    return !(await repository.getUserIdBy({email: value}));
};

export const isPositiveInt = 
  (value) => Number(value) >= 0 && Number.isInteger(Number(value));

export const areTwoEqual = (a, b) => a === b;
