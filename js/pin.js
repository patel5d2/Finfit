console.log('pin.js: Script start');
import { getUser, setPin, login } from './backend.js';

document.addEventListener('componentsLoaded', () => {
    console.log('pin.js: componentsLoaded event received');
    const pinLockModalElement = document.getElementById('pin-lock-modal');
    if (!pinLockModalElement) {
        console.warn('pin.js: pin-lock-modal element not found.');
        return;
    }
    const pinLockModal = new bootstrap.Modal(pinLockModalElement);
    const pinForm = document.getElementById('pin-form');
    const pinInput = document.getElementById('pin-input');
    const pinLockModalLabel = document.getElementById('pinLockModalLabel');

    if (!pinForm || !pinInput || !pinLockModalLabel) {
        console.warn('pin.js: One or more PIN form elements not found.');
        return;
    }

    const user = getUser();

    if (user.pin) {
        pinLockModalLabel.textContent = 'Enter PIN';
        pinLockModal.show();
    } else {
        pinLockModalLabel.textContent = 'Set a new PIN';
        pinLockModal.show();
    }

    pinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const pin = pinInput.value;

        if (user.pin) {
            if (login(pin)) {
                pinLockModal.hide();
                console.log('pin.js: PIN login successful.');
            } else {
                alert('Incorrect PIN');
                console.warn('pin.js: Incorrect PIN entered.');
            }
        } else {
            setPin(pin);
            pinLockModal.hide();
            console.log('pin.js: New PIN set successfully.');
        }
    });
});
console.log('pin.js: Script end');
