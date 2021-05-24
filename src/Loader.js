import React, { useEffect } from 'react';

function Loader(props) {
    const isLoading = props.isLoading;
    return (
            <div className={`${isLoading ? "clearfix" : "invisible"}`}>
                <div
                    className="spinner-border text-light float-right"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
    )
}

export default Loader;