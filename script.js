document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('country-form');
  const selectDrop = document.getElementById('country');
  const confirmationBox = document.getElementById('confirmation-box');
  const submitButton = form.querySelector('button[type="submit"]');

  // Disable submit button initially
  submitButton.disabled = true;

  // Function to check if all fields are filled
  const checkFormCompletion = () => {
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const country = document.getElementById('country').value;

      submitButton.disabled = !(firstName && lastName && phone && email && country);
  };

  form.addEventListener('input', checkFormCompletion);
  form.addEventListener('change', checkFormCompletion);

  // Fetch countries and populate the dropdown
  const populateCountries = async () => {
      selectDrop.innerHTML = '<option>Loading countries...</option>';
      const spinner = document.createElement('div');
      spinner.className = 'spinner';
      selectDrop.parentNode.insertBefore(spinner, selectDrop);

      try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
          }
          const countries = await response.json();
          const sortedCountries = countries.sort((a, b) =>
              a.name.common.localeCompare(b.name.common)
          );

          let options = '<option value="" disabled selected>Select a country</option>';
          sortedCountries.forEach(country => {
              options += `<option value="${country.name.common}">${country.name.common}</option>`;
          });
          selectDrop.innerHTML = options;
      } catch (error) {
          selectDrop.innerHTML = '<option disabled>Error loading countries</option>';
          alert('Failed to load countries. Please refresh the page.');
      } finally {
          spinner.remove();
          selectDrop.disabled = false;
      }
  };

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;

      setTimeout(() => {
          const firstName = document.getElementById('first-name').value.trim();
          const email = document.getElementById('email').value.trim();
          const country = document.getElementById('country').value;

          document.getElementById('confirm-name').textContent = firstName;
          document.getElementById('confirm-email').textContent = email;
          document.getElementById('confirm-country').textContent = country;

          confirmationBox.classList.remove('hidden');
          form.reset();
          submitButton.textContent = 'Submit';
          submitButton.disabled = true;
      }, 2000);
  });

  populateCountries();
});
