import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [sunrise, setSunrise] = useState(new Date())
  const [sunset, setSunset] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const latlong = fetch('https://api.ipify.org')
      .then((response) => response.text())
      .then((ip) => fetch('https://ipapi.co/' + ip + '/latlong/'))
      .then((response) => response.text())
      .then((latlong) => latlong.split(','))

      latlong.then(([lat, long]) => fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long + '&date=today'))
      .then((response) => response.json())
      .then((data) => setSunset(new Date(new Date().toDateString() + ' ' + data.results.sunset + ' UTC')))

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      latlong.then(([lat, long]) => fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long + '&date=tomorrow'))
      .then((response) => response.json())
      .then((data) => setSunrise(new Date(tomorrow.toDateString() + ' ' + data.results.sunrise + ' UTC')))

      .catch((error) => console.error('Error fetching IP:', error))
  }, [])

  const now = time.getHours() * 60 + time.getMinutes()
  const isDay = now < (sunset.getHours() * 60 + sunset.getMinutes()) && now > (sunrise.getHours() * 60 + sunrise.getMinutes())

  return (
    <div className={isDay ? 'day' : 'night'}>
      <h1>{isDay ?  sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
    </div>
  )
}

export default App
