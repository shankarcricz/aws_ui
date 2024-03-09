import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import Bucketlist from './Bucketlist';
import React from 'react';
import Currentbucket from './Currentbucket';

const App = () => {
  const [data, setData] = useState();
  const [create, setCreate] = useState();
  const [currObjects, setCurrObject] = useState([]);
  const [currBucket, setCurrBucket] = useState('b-1');
  const [flag, setFlag] = useState(true);

  const fetchBuckets = () => {
    axios.get('http://localhost:3000/putObject/fetchBuckets').then((data) => setData(data.data));
  }
  useEffect(() => {
    fetchBuckets();
  }, [])

  const handleCreate = () => {
    axios.post('http://localhost:3000/putObject/create').then((data) => setCreate(data)).finally(() => fetchBuckets());
  }
  const handleFetchBucket = (name) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.post('http://localhost:3000/putObject/fetch', { b_id: name }).then((res) => setCurrObject(res?.data?.objects));
    setCurrBucket(name);
  }
  
  console.log(data);
  return (
    <div className="App">
      <h2>Welcome to our Object storage!!</h2>
      <div className='row'>
        <div className='col-2'>
        <button className='btn btn-dark' onClick={handleCreate}>Create New Bucket</button>
          <Bucketlist data={data} handleFetchBucket={handleFetchBucket} currBucket={currBucket} setFlag={setFlag}/>
        </div>
        <div className='col-10'>
        <Currentbucket data={data} currBucket={currBucket} currObjects={currObjects} setFlag = {setFlag} handleFetchBucket={handleFetchBucket} fetchBuckets={fetchBuckets} setCurrObject={setCurrObject}/>
        </div>
      </div>

    </div>
  );
}

export default App;
