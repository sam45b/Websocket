import './App.css';
import {useEffect,useState} from "react"
function App() {
  const [socket,setSocket] = useState(null);
  const [latestedMessage,setLatestedMessage] = useState("");
  const [message,setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080")
    socket.onopen = () =>{
      console.log("Connected");
      setSocket(socket);
    }

    socket.onmessage = (message) =>{
      console.log("Received message:",message.data);
      setLatestedMessage(message.data)
    }
    
    return () => {
      socket.close()
    }
  }, [])

  if(!socket){
    return <div>
      Connecting to socket server....
    </div>
  }
  
  return (
    <div className="App">

      <input 
      type="text"
      onChange={(e)=>{setMessage(e.target.value)}}

      ></input>

      <button onClick={()=>{
        socket.send(message)
      }}>send</button>

      {latestedMessage}
      
    </div>
  );
}

export default App;
