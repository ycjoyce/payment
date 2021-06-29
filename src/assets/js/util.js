export function validateEmail (email) {
    const rule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return rule.test(email);
}

export function validCheckBeforeSubmit (err) {
    const newErr = err.slice();
    if (!this.state.confirmCheck) {
        this.handleSetUnvalid('confirmCheck', true);
        newErr.push('confirm-check');
    }
    if (!validateEmail(this.state.email)) {
        this.handleSetUnvalid('email', true);
        newErr.push('email');
    }
    if (newErr.length > 0) {
        return;
    }
    this.handleChangeStep('next');
}