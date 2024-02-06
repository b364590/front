import Item from "./Item";
import {
  Card,
  Button,
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Form,
  Alert,

} from "react-bootstrap";

const List = ({ listData, deleteData}) => {
  // listData = listData?listData:[]
  return (
    <Row xs={1} md={2} lg={3} style={{ gap: "16px" , justifyContent: "space-evenly"}}>
      {listData.map((item) => { 
         const { name, id } = item;
         return (
           <Item
             id={id}
             name={name}
             deleteData={deleteData}
           />
         )}
      )
    }
    </Row>
  );
};

export default List;
