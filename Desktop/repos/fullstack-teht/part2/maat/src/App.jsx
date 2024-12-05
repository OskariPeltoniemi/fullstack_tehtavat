import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (value.trim() !== '') {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
          )
          setCountries(filteredCountries)
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0])
          } else {
            setSelectedCountry(null)
          }
        })
        .catch(error => console.error('Error fetching countries:', error))
    } else {
      setCountries([])
      setSelectedCountry(null)
    }
  }, [value])

  useEffect(() => {
    if (selectedCountry && api_key) {
      const capital = selectedCountry.capital[0]
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.error('Error fetching weather data:', error))
    }
  }, [selectedCountry, api_key])

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleShowCountry = country => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <div>
        Search for a country: <input value={value} onChange={handleChange} />
      </div>
      <div>
        {countries.length > 10 && (
          <p>Too many matches, please specify</p>
        )}
        {countries.length <= 10 && countries.length > 1 && (
          <ul>
          {countries.map(country => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
        )}
        {selectedCountry && (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area}</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(selectedCountry.languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={selectedCountry.flags.svg}
              alt={`Flag of ${selectedCountry.name.common}`}
              style={{ width: '150px', height: 'auto' }}
            />
            {weather && (
              <div>
                <h3>Weather in {selectedCountry.capital[0]}</h3>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Wind: {weather.wind.speed} m/s</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App