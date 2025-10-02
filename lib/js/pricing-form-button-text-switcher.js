document.addEventListener('DOMContentLoaded', function () {
  const signupRadio = document.querySelector('input[type=radio][value="I\'m ready to sign up."]');
  const button = document.querySelector('.gform_wrapper .gform_button');

  if (signupRadio && button) {
    signupRadio.addEventListener('change', function () {
      if (signupRadio.checked) {
        button.value = 'Sign Up';
      }
    });

    // Reset back if "Discuss my quote" is selected
    const discussRadio = document.querySelector('input[type=radio][value="I\'d like to discuss my quote."]');
    if (discussRadio) {
      discussRadio.addEventListener('change', function () {
        if (discussRadio.checked) {
          button.value = 'Discuss My Quote';
        }
      });
    }
  }
});