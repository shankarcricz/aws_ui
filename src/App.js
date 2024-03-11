import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import Bucketlist from './Bucketlist';
import React from 'react';
import Currentbucket from './Currentbucket';
import { RotatingLines } from 'react-loader-spinner';

const App = () => {
  const [data, setData] = useState();
  const [create, setCreate] = useState();
  const [currObjects, setCurrObject] = useState([]);
  const [currBucket, setCurrBucket] = useState('b-1');
  const [flag, setFlag] = useState(true);
  const [spinner, setSpinner] = useState(false)

  const fetchBuckets = () => {
    axios.get('http://localhost:3000/Object/fetchBuckets').then((data) => {
      setData(data.data);
    }).finally(() => setSpinner(false));
    setSpinner(true);

  }
  useEffect(() => {
    fetchBuckets();
  }, [])

  const handleCreate = () => {
    axios.post('http://localhost:3000/Object/create').then((data) => {
      setCreate(data);
    }).finally(() => {
      fetchBuckets();
      setSpinner(false);
    });
    setSpinner(true);
  }
  const handleFetchBucket = (name) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.post('http://localhost:3000/Object/fetch', { b_id: name }).then((res) => {
      setCurrObject(res?.data?.objects);

    }).finally(() => setSpinner(false));
    setSpinner(true);
    setCurrBucket(name);
  }

  console.log(data);
  console.log(currObjects);
  return (
    <div className="App">

      <h2>Welcome to our Object storage!!</h2>
      <div className='row'>
        <div className='col-2'>
          <button className='btn btn-dark mb-2' onClick={handleCreate}>Create New Bucket</button>
          <Bucketlist data={data} handleFetchBucket={handleFetchBucket} currBucket={currBucket} setFlag={setFlag} setSpinner={setSpinner} />
        </div>
        {!spinner && <div className='col-10'>
          <Currentbucket data={data} currBucket={currBucket} currObjects={currObjects} setFlag={setFlag} handleFetchBucket={handleFetchBucket} fetchBuckets={fetchBuckets} setCurrObject={setCurrObject} setSpinner={setSpinner} />
        </div>}
        <div className='col-10'>
        {
          spinner && <RotatingLines
            visible={true}
            height="20"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
        </div>
      </div>


    </div>
  );
}

export default App;
