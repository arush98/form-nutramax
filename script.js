document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('country-form');
    const selectDrop = document.getElementById('country');
    const confirmationBox = document.getElementById('confirmation-box');
    
    // Fetch countries and populate the dropdown
    const populateCountries = async () => {
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
        console.error('Error fetching countries:', error);
        alert('Failed to load countries. Please refresh the page.');
      }
    };
  
    // Form submission handler
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Validate form fields (HTML validation already handles most cases)
      const firstName = document.getElementById('first-name').value.trim();
      const email = document.getElementById('email').value.trim();
      const country = document.getElementById('country').value;
  
      if (!firstName || !email || !country) {
        alert('Please fill out all required fields.');
        return;
      }
  
      // Display confirmation in a separate box
      document.getElementById('confirm-name').textContent = firstName;
      document.getElementById('confirm-email').textContent = email;
      document.getElementById('confirm-country').textContent = country;
  
      confirmationBox.classList.remove('hidden');
    });
  
    // Populate the countries dropdown on page load
    populateCountries();
  });
  