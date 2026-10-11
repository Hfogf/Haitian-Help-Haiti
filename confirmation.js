const confirmationForm = document.getElementById('confirmationForm');
const formStatus = document.getElementById('formStatus');
const paymentSuccess = document.getElementById('paymentSuccess');

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

if (getQueryParam('success') === 'true') {
  if (paymentSuccess) {
    paymentSuccess.style.display = 'block';
  }
  if (formStatus) {
    formStatus.textContent = 'Paiement reçu avec succès ! Vous pouvez maintenant envoyer votre preuve de don.';
    formStatus.className = 'form-status success';
  }
}

if (confirmationForm) {
  confirmationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const submitButton = confirmationForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    try {
      const formData = new FormData(confirmationForm);
      const response = await fetch('/confirm', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Échec de l\'envoi. Vérifiez vos informations.');
      }

      formStatus.textContent = data.message;
      formStatus.classList.add('success');
      confirmationForm.reset();
    } catch (error) {
      formStatus.textContent = `Erreur : ${error.message}`;
      formStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Envoyer la preuve';
    }
  });
}
