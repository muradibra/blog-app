import React from 'react'
import { Spinner } from 'reactstrap'

function Loader() {
    return (
        <div className="text-center">
            <Spinner>
                Loading...
            </Spinner>
        </div>
    )
}

export default Loader