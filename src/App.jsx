import { useState, useEffect } from 'react'
import useSWR from 'swr'
import './App.css'

function App() {
  const fetchJSON = (url) => fetch(url).then((res) => res.json())
  const fetchText = (url) => fetch(url).then((res) => res.text())

  const { data: ip } = useSWR('https://api.ipify.org', fetchText)

  const { data: latlong } = useSWR( ip ? 'https://ipapi.co/' + ip + '/latlong/' : null, fetchText)

  const [lat, long] = latlong ? latlong.split(',') : [null, null]

  const { data: today } = useSWR(lat ? 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long + '&date=today' : null, fetchJSON)
  const { data: tomorrow } = useSWR(lat ? 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + long + '&date=tomorrow' : null, fetchJSON)
  

  //time fetching
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])


  if (!today || !tomorrow) return <p>Loading...</p>

  const sunset = new Date(new Date().toDateString() + ' ' + today.results.sunset + ' UTC')
  const sunrise = new Date(new Date().toDateString() + ' ' + tomorrow.results.sunrise + ' UTC')

  //day/night calculation
  const now = time.getHours() * 60 + time.getMinutes()
  const isDay = now < (sunset.getHours() * 60 + sunset.getMinutes()) && now > (sunrise.getHours() * 60 + sunrise.getMinutes())

  return (
    <div className={isDay ? 'day' : 'night'}>
      <h1>{isDay ?  sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
    </div>
  )
}

export default App
