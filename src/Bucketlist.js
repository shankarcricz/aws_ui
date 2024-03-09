import React from "react"

const Bucketlist = (props) => {
    return (
        <div className="col">
                    {
                      props?.data?.buckets?.map(bucket => {
                        return(
                        <div className="row">

                         <button type="button" className={`${props?.currBucket === bucket.name ? 'cell btn btn-primary' : 'cell btn btn-outlined-primary'}`} onClick={() => props?.handleFetchBucket(bucket.name)}>{bucket.name}</button>
                            <hr></hr>
                        </div>
                        
                        )
                      })  
                    }
        </div>
    )
}

export default Bucketlist;