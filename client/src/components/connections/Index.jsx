import React, { useEffect, useState, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {
    
    function Toggle() {
        let btnLove = document.getElementById("button-heart");
          btnLove.classList.toggle("checked")
      }

    const [connections, setConnections] = useState([]);

    useEffect(() => {
      (async () => {
        await getConnections();
      })();
    }, []);
  
    const getConnections = async () => {
      const connectionsResp = await Axios.get('/api/connections');
      if (connectionsResp.status === 200) setConnections(connectionsResp.data);
    };
  
    const deleteConnection = async connection => {
      try {
        const resp = await Axios.post('/api/connections/delete', {
          id: connection._id
        });
  
        if (resp.status === 200) toast("The post was deleted successfully", {type: toast.TYPE.SUCCESS});
  
        await getConnections();
      } catch (error) {
        toast("There was an error deleting the post", {type: toast.TYPE.ERROR});
      }
    };
    return (
        <Container className="container my-5">
            <header>
                <h1>Connex'nShare Post</h1>
            </header>
            <hr/>
            <div className="content">
                {connections && connections.map((connection, i) => (
                <div key={i} className="card my-3">
                    <div className="card-header clearfix">
                        <div className="float-left">
                            <h5 className="card-title">
                            {connection.title}
                            </h5>

                            {connection.user ? (
                                <Fragment>
                                    <small className="author">{connection.user.fullname}</small>
                                    <br></br>
                                    <small className="time">{connection.updatedAt}</small>
                                </Fragment>
                            ) : null}
                        </div>
                            
                        <div className="info-love-index">
                            {connection.user ? (
                                <Fragment>
                                    <div className="post-info">
                                        <small className="category">{connection.category}</small>
                                        <small className="location">{connection.location}</small>
                                        </div>
                                        <p className="price-index"><strong>${connection.price}</strong></p>
                                        {user ? (<div className="love-btn">
                                        <label className="love-button"><i className="fa fa-heart" id="button-heart"  onClick={() => Toggle(this)}></i></label>
                                    </div>) : null}
                                </Fragment>
                            ) : null}    
                        </div>
                    </div>

                    <div className="card-body">
                        <p className="card-text">
                            {connection.synopsis}
                        </p>
                    </div>

                    {user && connection.user  ?  (
                        <div className="custom-footer card-footer">
                            <Link to={{
                            pathname: "/connections/edit",
                            state: {
                                    id: connection._id
                            }
                            }}>
                            <i className="fa fa-edit">/ </i>
                            </Link>

                            <button type="button" className="delete" onClick={() => deleteConnection(connection)}>
                            <i className="fa fa-trash "></i>
                            </button>
                        </div>
                    ) : null}
                </div>
              ))}
            </div>
        </Container>
    );
};

export default Index;