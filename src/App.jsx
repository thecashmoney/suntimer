import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const hour = time.getHours()
  const isDay = hour >= 6 && hour < 18

  return (
    <div className={isDay ? 'day' : 'night'}>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  )
}

export default App
