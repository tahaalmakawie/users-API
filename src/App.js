import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import { clear } from '@testing-library/user-event/dist/clear';

const App = () => {

  const [term, setTerm] = useState('')
  const [result, setResult] = useState([])

  useEffect( () => {
    const searsh = async () =>{
      // 'https://en.wikipedia.org/w/api.php'
      const rspond = await axios.get('https://jsonplaceholder.typicode.com/users', {
        params: {
          action: 'query',
          list: 'searsh',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      })
      console.log(rspond.data)
      setResult(rspond.data)
    }
     const clearSET  = setTimeout(() => {
      if(term){
        searsh()
      }
    }, 1500)

    return(
      () => clearTimeout(clearSET)
    )

  },[term]
  );

  const fechResalt = result.map( (el) => {
    return(
      <tr key={el.id}>
        <th scope="row">{el.id}</th>
        <td>{el.name}</td>
        <td>{el.username}</td>
        <td>{el.email}</td>
        <td>{el.phone}</td>
        <td>{el.address.city}</td>
        <td>{el.company.name}</td>
        <td>{el.website}</td>
    </tr>
    )
  } )

  return ( 
    <div className = 'container'>
    
      <div className="">
        <label forhtml="floatingTextarea">Searsh</label>

        <input type="text" 
        className="form-control" 
          placeholder="Leave a comment here" 
          id="floatingTextarea"
          onChange={(e) => setTerm(e.target.value)}
          value = {term}
       />
        </div>
      <table className="table">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">UserName</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Company Name</th>
        <th scope="col">Web Site</th>
      </tr>
    </thead>
        <tbody>
          {fechResalt}

        </tbody>
      </table>
    </div>
   );
}
 
export default App;
