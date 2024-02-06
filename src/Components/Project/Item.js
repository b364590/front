import {
  Card,
  Button,

} from "react-bootstrap";
import React, {useState} from "react";

const Item = ({ id, name, deleteData}) => {
  const [show, setShow] = useState(false);

  function deleteItem() {

    deleteData(function (prev) {
      alert("Delete Success!")
      return prev.filter(item => item.id !== id);
    })
  }
  if (!show) {
    return (
      <>
        <Card style={{ width: '10rem' ,margin:'15px'}}>
          <Card.Body>
            <Card.Title>
              {name}
            </Card.Title>
            <Card.Text>
              <Card.Link href="/Download2">
                Inform
              </Card.Link>
            </Card.Text>
            <Button variant="danger" onClick={deleteItem}>Delete</Button>
          </Card.Body>
        </Card>
      </>
    );
  }
};

export default Item;
