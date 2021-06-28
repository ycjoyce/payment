export function valiCheckBeforeSubmit (err) {
    const newErr = err.slice();
    if (!this.props.confirmCheck) {
        this.props.handleSetUnvalid('confirmCheck', true);
        newErr.push('confirm-check');
    }
    if (!this.props.validateEmail(this.props.email)) {
        this.props.handleSetUnvalid('email', true);
        newErr.push('email');
    }
    if (newErr.length > 0) {
        return;
    }
    this.props.handleChangeStep('next');
};