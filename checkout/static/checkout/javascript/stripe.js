var stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
var clientSecret = $('#id_client_secret').text().slice(1, -1);
var stripe = Stripe(stripePublicKey);
var elements = stripe.elements();
var card = elements.create('card', { style: style });

var style = {
  base: {
    iconColor: '#c4f0ff',
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE',
  },
};
card.mount('#card-element');

// Handle realtime validation errors on the card element
card.addEventListener('change', function (event) {
  var cardError = document.getElementById('card-errors');

  if (event.error) {
    var warningTxt = `<span class="icon" role="alert">
    <i class="fas fa-times"></i>
    </span>
    <span>${event.error.message}</span>`;
    $(cardError).html(warningTxt);
  } else {
    cardError.textContent = '';
  }
});

// Handle form submit
var form = document.getElementById('payment-form');

form.addEventListener('submit', function (ev) {
  ev.preventDefault();
  card.update({ 'disabled': true });
  $('#submit-button').attr('disabled', true);
  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
    }
  }).then(function (result) {
    if (result.error) {
      var cardError = document.getElementById('card-errors');
      var warningTxt = `
      <span class="icon" role="alert">
      <i class="fas fa-times"></i>
      </span>
      <span>${result.error.message}</span>`;

      $(cardError).html(warningTxt);
      card.update({ 'disabled': false });
      $('#submit-button').attr('disabled', false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        form.submit();
      }
    }
  });
});