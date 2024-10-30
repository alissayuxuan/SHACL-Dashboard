import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/members").then(    //warum funtioniert der proxy im package.json nicht??? also wenn ich nur fetch "/members" habe -> sollte eig auch fnktionieren...
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default App
