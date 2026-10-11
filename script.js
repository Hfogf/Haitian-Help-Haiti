// const navbar = document.getElementById('navbar');
// const mobileMenuBtn = document.getElementById('mobileMenuBtn');
// const mobileNav = document.getElementById('mobileNav');
// const amountButtonsContainer = document.getElementById('amountButtons');
// const customAmountInput = document.getElementById('customAmount');
// const paymentInfoDiv = document.getElementById('paymentInfo');
// const paymentGuideDiv = document.getElementById('paymentGuide');
// const donateBtn = document.getElementById('donateBtn');

// const state = {
//     currency: 'HTG',
//     amount: 500,
//     method: 'moncash'
// };


// function initDonationForm() {
//     if (!amountButtonsContainer || !customAmountInput || !paymentInfoDiv || !paymentGuideDiv || !donateBtn) {
//         return;
//     }

//     document.querySelectorAll('.currency-btn').forEach(btn => {
//         btn.addEventListener('click', () => setCurrency(btn.dataset.currency));
//     });

//     customAmountInput.addEventListener('input', event => {
//         const value = parseInt(event.target.value, 10);
//         state.amount = Number.isInteger(value) && value > 0 ? value : 0;
//         renderAmountButtons();
//         updateDonateButton();
//     });

//     document.querySelectorAll('.payment-btn').forEach(btn => {
//         btn.addEventListener('click', () => setMethod(btn.dataset.method));
//     });

//     donateBtn.addEventListener('click', async () => {
//         if (state.amount <= 0) {
//             alert('Erreur : Veuillez sélectionner un montant valide supérieur à 0.');
//             return;
//         }
//         donateBtn.disabled = true;
//         donateBtn.textContent = 'Création du paiement...';
//         try {
//             const response = await fetch('/create-checkout-session', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     amount: state.amount,
//                     currency: state.currency,
//                     method: state.method
//                 })
//             });
//             const data = await response.json();
//             if (!data.url) {
//                 throw new Error(data.error || 'Impossible de créer la session de paiement.');
//             }
//             window.location.href = data.url;
//         } catch (error) {
//             alert(`Erreur : ${error.message || 'Problème réseau. Vérifiez votre connexion.'}`);
//         } finally {
//             donateBtn.disabled = false;
//             donateBtn.textContent = ` Donner ${state.amount} ${state.currency}`;
//         }
//     });

//    setCurrency(state.currency);
//     setMethod(state.method);
//     updateDonateButton();
// }

// const amounts = {
//     HTG: [200, 500, 1000, 2500],
//     USD: [5, 10, 25, 50]
// };

// const paymentInfo = {
//     moncash: {
//         title: 'MonCash',
//         detail: '+509 3812 3456',
//         summary: 'Envoyez le montant via MonCash au numéro ci-dessus.',
//         note: 'Envoyez la preuve à info@hhhaiti.org pour confirmation.'
//     },
//     natcash: {
//         title: 'NatCash',
//         detail: '+509 4567 8900',
//         summary: 'Transférez via NatCash et confirmez ensuite votre don.',
//         note: 'Envoyez la preuve à info@hhhaiti.org pour confirmation.'
//     },
//     bank: {
//         title: 'Banque',
//         detail: 'BUH<br>HTG: 0012-3456-7890-11<br>USD: 0012-3456-7890-22',
//         summary: 'Faites un virement vers BUH puis envoyez le reçu.',
//         note: 'La confirmation se fera après réception de votre preuve.'
//     }
// };

// function updateDonateButton() {
//     const donateAmountEl = document.getElementById('donateAmount');
//     const donateCurrencyEl = document.getElementById('donateCurrency');
//     if (donateAmountEl) donateAmountEl.textContent = state.amount;
//     if (donateCurrencyEl) donateCurrencyEl.textContent = state.currency;
//     if (donateBtn) donateBtn.disabled = state.amount <= 0;
// }

// function updatePaymentInfo() {
//     const info = paymentInfo[state.method];
//     paymentInfoDiv.innerHTML = `
//         <p class="info-title">${info.title}</p>
//         <p class="info-detail">${info.detail}</p>
//     `;
//     paymentGuideDiv.innerHTML = `
//         <p class="guide-simple">${info.summary}</p>
//         <p class="guide-note">${info.note}</p>
//     `;
// }

// function renderAmountButtons() {
//     amountButtonsContainer.innerHTML = '';
//     amounts[state.currency].forEach(value => {
//         const button = document.createElement('button');
//         button.type = 'button';
//         button.className = 'amount-btn';
//         button.dataset.amount = value;
//         button.textContent = value;
//         if (state.amount === value) button.classList.add('active');
//         button.addEventListener('click', () => {
//             state.amount = value;
//             customAmountInput.value = value;
//             renderAmountButtons();
//             updateDonateButton();
//         });
//         amountButtonsContainer.appendChild(button);
//     });
// }

// function setCurrency(currency) {
//     state.currency = currency;
//     state.amount = currency === 'USD' ? 10 : 500;
//     document.querySelectorAll('.currency-btn').forEach(btn => {
//         btn.classList.toggle('active', btn.dataset.currency === currency);
//     });
//     customAmountInput.value = state.amount;
//     renderAmountButtons();
//     updateDonateButton();
// }

// function setMethod(method) {
//     state.method = method;
//     document.querySelectorAll('.payment-btn').forEach(btn => {
//         btn.classList.toggle('active', btn.dataset.method === method);
//     });
//     updatePaymentInfo();
// }

// if (mobileMenuBtn && mobileNav) {
//     mobileMenuBtn.addEventListener('click', () => {
//         mobileNav.classList.toggle('show');
//     });

//     mobileNav.addEventListener('click', event => {
//         if (event.target.closest('a')) {
//             mobileNav.classList.remove('show');
//         }
//     });
// }

// initDonationForm();

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', event => {
//         event.preventDefault();
//         const target = document.querySelector(anchor.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//     });
// });

// window.addEventListener('scroll', () => {
//     navbar.classList.toggle('scrolled', window.scrollY > 20);
// });


document.addEventListener("DOMContentLoaded", function () {
    const currencyButtons = document.querySelectorAll(".currency-btn");
    const paymentButtons = document.querySelectorAll(".payment-btn");
    const customAmount = document.getElementById("customAmount");
    const donateAmount = document.getElementById("donateAmount");
    const donateCurrency = document.getElementById("donateCurrency");
    const paymentInfo = document.getElementById("paymentInfo");
    const confirmLink = document.getElementById("confirmLink");

    const state = {
        currency: "HTG",
        amount: 500,
        method: "moncash",
        rate: 132
    };

    const formatAmount = (value, currency) => {
        return currency === "USD" ? parseFloat(value).toFixed(2) : Math.round(value);
    };

    const setActive = (buttons, activeButton) => {
        buttons.forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    };

    const updateSummary = () => {
        donateAmount.textContent = formatAmount(state.amount, state.currency);
        donateCurrency.textContent = state.currency;
        customAmount.value = state.amount;
        confirmLink.href = `confirmation.html?amount=${encodeURIComponent(state.amount)}&currency=${encodeURIComponent(state.currency)}&method=${encodeURIComponent(state.method)}`;
    };

    const updatePaymentInfo = () => {
        const activeBtn = document.querySelector(".payment-btn.active");
        if (!activeBtn) return;

        paymentInfo.innerHTML = `
            <p class="info-title">${activeBtn.dataset.title}</p>
            <p class="info-detail">${activeBtn.dataset.detail}</p>
            <p class="info-note">${activeBtn.dataset.note}</p>
        `;
    };

    currencyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.currency === state.currency) return;
            setActive(currencyButtons, btn);

            const previousCurrency = state.currency;
            state.currency = btn.dataset.currency;

            if (previousCurrency === "HTG" && state.currency === "USD") {
                state.amount = parseFloat((state.amount / state.rate).toFixed(2));
            } else if (previousCurrency === "USD" && state.currency === "HTG") {
                state.amount = Math.round(state.amount * state.rate);
            }

            updateSummary();
        });
    });

    paymentButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.method === state.method) return;
            setActive(paymentButtons, btn);
            state.method = btn.dataset.method;
            updatePaymentInfo();
            updateSummary();
        });
    });

    customAmount.addEventListener("input", () => {
        const value = parseFloat(customAmount.value);
        if (isNaN(value) || value <= 0) return;
        state.amount = state.currency === "USD" ? parseFloat(value.toFixed(2)) : Math.round(value);
        updateSummary();
    });

    updatePaymentInfo();
    updateSummary();
});

// const amounts = {
//     HTG: [200, 500, 1000, 2500],
//     USD: [5, 10, 25, 50]
// };

//  const paymentInfo = {
//     moncash: {
//         title: 'MonCash',
//         detail: '+509 3812 3456',
//         summary: 'Envoyez le montant via MonCash au numéro ci-dessus.',
//         note: 'Envoyez la preuve à info@hhhaiti.org pour confirmation.'
//     },
//     natcash: {
//         title: 'NatCash',
//         detail: '+509 4567 8900',
//         summary: 'Transférez via NatCash et confirmez ensuite votre don.',
//         note: 'Envoyez la preuve à info@hhhaiti.org pour confirmation.'
//     },
//     bank: {
//         title: 'Banque',
//         detail: 'BUH<br>HTG: 0012-3456-7890-11<br>USD: 0012-3456-7890-22',
//         summary: 'Faites un virement vers BUH puis envoyez le reçu.',
//         note: 'La confirmation se fera après réception de votre preuve.'
//     }
// };

// function updateDonateButton() {
//     const donateAmountEl = document.getElementById('donateAmount');
//     const donateCurrencyEl = document.getElementById('donateCurrency');
//     if (donateAmountEl) donateAmountEl.textContent = state.amount;
//     if (donateCurrencyEl) donateCurrencyEl.textContent = state.currency;
//     if (donateBtn) donateBtn.disabled = state.amount <= 0;
// }

// function updatePaymentInfo() {
//     const info = paymentInfo[state.method];
//     paymentInfoDiv.innerHTML = `
//         <p class="info-title">${info.title}</p>
//         <p class="info-detail">${info.detail}</p>
//     `;
//     paymentGuideDiv.innerHTML = `
//         <p class="guide-simple">${info.summary}</p>
//         <p class="guide-note">${info.note}</p>
//     `;
// }

// function renderAmountButtons() {
//     amountButtonsContainer.innerHTML = '';
//     amounts[state.currency].forEach(value => {
//         const button = document.createElement('button');
//         button.type = 'button';
//         button.className = 'amount-btn';
//         button.dataset.amount = value;
//         button.textContent = value;
//         if (state.amount === value) button.classList.add('active');
//         button.addEventListener('click', () => {
//             state.amount = value;
//             customAmountInput.value = value;
//             renderAmountButtons();
//             updateDonateButton();
//         });
//         amountButtonsContainer.appendChild(button);
//     });
// }

// function setCurrency(currency) {
//     state.currency = currency;
//     state.amount = currency === 'USD' ? 10 : 500;
//     document.querySelectorAll('.currency-btn').forEach(btn => {
//         btn.classList.toggle('active', btn.dataset.currency === currency);
//     });
//     customAmountInput.value = state.amount;
//     renderAmountButtons();
//     updateDonateButton();
// }

// function setMethod(method) {
//     state.method = method;
//     document.querySelectorAll('.payment-btn').forEach(btn => {
//         btn.classList.toggle('active', btn.dataset.method === method);
//     });
//     updatePaymentInfo();
// }

// if (mobileMenuBtn && mobileNav) {
//     mobileMenuBtn.addEventListener('click', () => {
//         mobileNav.classList.toggle('show');
//     });

//     mobileNav.addEventListener('click', event => {
//         if (event.target.closest('a')) {
//             mobileNav.classList.remove('show');
//         }
//     });
// }
