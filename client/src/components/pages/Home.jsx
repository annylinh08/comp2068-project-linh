import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
function Home () {
    return (
        <Fragment>
           
                <div className="banner">
                    <div className="container">
                        <div className="banner-content">
                            <h1 className="header">
                                Welcome to Connex'nShare Website!
                            </h1>
                            <h4>A place to connex local people and local services with freedom </h4>
                            <div className="btn-section" >
                                <Link to="./about" className="btn-style">What We Do</Link>
                                <Link to="./connections" className="btn-style">Explore Our New Feed Now</Link>
                            </div>  
                        </div>
                    </div>
                </div>
        </Fragment>
    );
};

export default Home;