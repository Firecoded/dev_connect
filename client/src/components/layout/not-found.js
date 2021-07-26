import React from "react";

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column mt-4">
            <h4 className="">
                <i className="fas fa-exclamation-triangle" /> Page Not Found
            </h4>
            <p className="">Sorry, this page does not exist</p>
        </div>
    );
};

export default NotFound;
