async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        // 1. Get all the countries from Asia continent /region using Filter method
        const asianCountries = countries.filter(country => country.region === 'Asia');
        document.getElementById('asia-countries').innerHTML = `<u><h2>Asian Countries</h2></u><p>${asianCountries.map(c => c.name.common).join(', ')}</p>`;

        // 2. Get all the countries with a population of less than 2 lakhs using Filter method
        const smallPopulationCountries = countries.filter(country => country.population < 200000);
        document.getElementById('small-population-countries').innerHTML = `<u><h3>Countries with Population < 200,000</h3></u><p>${smallPopulationCountries.map(c => c.name.common).join(', ')}</p>`;

        // 3. Print the following details name, capital, flag, using forEach method
        const countryDetailsDiv = document.getElementById('country-details');
        countryDetailsDiv.innerHTML = '<u><h3>Country Details</h3></u>';
        countries.forEach(country => {
            const name = country.name.common;
            const capital = country.capital ? country.capital[0] : 'No Capital';
            const flag = country.flags.svg;
            countryDetailsDiv.innerHTML += `<p><strong>Name:</strong> ${name}, <strong>Capital:</strong> ${capital}, <img src="${flag}" alt="flag" width="20" /></p>`;
        });

        // 4. Print the total population of countries using reduce method
        const totalPopulation = countries.reduce((total, country) => total + country.population, 0);
        document.getElementById('total-population').innerHTML = `<u><h3>Total Population</h3></u><p>${totalPopulation.toLocaleString()}</p>`;

        // 5. Print the country that uses US dollars as currency
        const usdCountries = countries.filter(country => country.currencies && Object.values(country.currencies).some(currency => currency.name === 'United States dollar'));
        document.getElementById('usd-countries').innerHTML = `<u><h3>Countries Using US Dollar</h3></u><p>${usdCountries.map(c => c.name.common).join(', ')}</p>`;

    } catch (error) {
        console.error('Error fetching countries data:', error);
    }
}

fetchCountries();