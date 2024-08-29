/**
 * Mock repository
 */

const existingEmails = new Map([ 
    ['w@w.w', 1], ['x@x.x', 2], ['y@y.y', 3], ['z@z.z', 4],
]);

export default {
    async getUserIdBy({ email = '' }) {
        return existingEmails.get(email);
    }
}
