import React from "react";
import axios from "axios";
import { useRef } from "react";

const Currentbucket = ({data,  currBucket, currObjects, setFlag, handleFetchBucket, fetchBuckets, setCurrObject ,setSpinner}) => {
    const picRef = useRef();
    const handleDeleteObject = (item) => {
        console.log(item)
        axios.post('https://aws-s3-sample-1.onrender.com/Object/delete', { obj_id: item?._id, bucketId: item?.bucketId }).then((res) => {
            console.log(res);
            setSpinner(false);
        }).finally(() => handleFetchBucket(currBucket));
        setSpinner(true);
    }
    console.log(data)
    const handleFileUpload = (e) => {
        if (e.target?.files[0]?.type) {
            const formData = new FormData()
            formData.set('photo', e.target.files[0])
            formData.set('bucket', currBucket);
            axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
            axios.post('https://aws-s3-sample-1.onrender.com/Object', formData).then(res => {
                console.log(res);
            }).finally(() =>  {handleFetchBucket(currBucket);
                setSpinner(false);});
            setSpinner(true);
        } else {
            alert('sorry something went wrong!');
        }
    }

    const handleDeleteBucket = (currBucket) => {
        axios.post('https://aws-s3-sample-1.onrender.com/Object/deleteBucket', {bucketId : currBucket}).then(res => console.log(res)).finally(() => fetchBuckets()).finally(() => {
            handleFetchBucket(currBucket);
            setSpinner(false);
        });
        setSpinner(true);
    }

    return (
        <>  
            { data?.buckets?.length > 0 && (<div className="row">
                
                <button className="col btn btn-success" onClick={() => {
                    picRef.current.click();
                }} >
                   click here to Upload in {currBucket}
                </button>
                <button onClick={() => handleDeleteBucket(currBucket)} className="btn btn-danger col"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
                </svg> Delete {currBucket}</button>
            </div>)}

            <div className='row'>
                {
                    currObjects?.map((item, index) => {
                        return (
                            <div className='col-3'>
                                <h5>{index + 1} - </h5>
                                {
                                    item?.photo.endsWith('pdf') ? <a href={`https://aws-s3-sample-1.onrender.com/public/images/${item?.photo}`} target="_blank">View File</a> : <img src={`https://aws-s3-sample-1.onrender.com/public/images/${item?.photo}`} alt='photo' height={100} width={100} />
                                }
                                
                                <button className='delete btn btn-danger' onClick={() => handleDeleteObject(item)}>Delete {item?.name}</button>
                            </div>

                        )
                    })
                }

                <input style={{ display: "none" }} ref={picRef} onChange={handleFileUpload} type='file' id='photo'></input>
                
            </div>
         
        </>

    )
}

export default Currentbucket;