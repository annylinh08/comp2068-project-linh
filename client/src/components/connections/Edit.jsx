import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    category: 'Offer Services',
    location: 'Barrie',
    price: ''
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const connectionResp = await Axios.get(`/api/connections/${id}`);
      if (connectionResp.status === 200) setInputs(connectionResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/connections/update', inputs);

      if (resp.status === 200)  {
        toast("The post was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the post", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the post", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/connections"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Post</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={handleInputChange}
              value={inputs.category}
            >
              <option value="Offer Services">Offer Services</option>
              <option value="Selling Homemade Food">Selling Homemade Food</option>
              <option value="Lost and Found">Lost and Found</option>
              <option value="Tips Sharing">Tips Sharing</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control
              as="select"
              name="location"
              onChange={handleInputChange}
              value={inputs.location}
            >
              <option value="Barrie">Barrie</option>
              <option value="Innisfil">Innisfil</option>
              <option value="Midhurst">Midhurt</option>
              <option value="Edgar">Edgar</option>
              <option value="springWater">Spring Water</option>
              <option value="Angus">Angus</option>
              <option value="Churchill">Churchill</option>
              <option value="Wasaga Beach">Wasaga Beach</option>
              <option value="Alliston">Alliston</option>
              <option value="Borden">Borden</option>
              <option value="Orillia">Orillia</option>
              <option value="Keswick">Keswick</option>
              <option value="Cookstown">Cookstown</option>
              <option value="Elmvale">Elmvale</option>
              <option value="Sutton">Sutton</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              name="price"
              onChange={handleInputChange}
              value={inputs.price}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;