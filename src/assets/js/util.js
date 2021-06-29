export function valiCheckBeforeSubmit (err) {
    const newErr = err.slice();
    if (!this.state.confirmCheck) {
        this.handleSetUnvalid('confirmCheck', true);
        newErr.push('confirm-check');
    }
    if (!this.validateEmail(this.state.email)) {
        this.handleSetUnvalid('email', true);
        newErr.push('email');
    }
    if (newErr.length > 0) {
        return;
    }
    this.handleChangeStep('next');
};