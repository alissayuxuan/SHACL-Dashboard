import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/time").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
        console.log("hallo")
      }
    )
  }, [])
  
  return (
    <div>
      HALLO
    </div>
  )
}

export default App
