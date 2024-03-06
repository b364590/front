import CheckDataItem from "./TrainingItem";
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"
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

const TrainingList = () => {
  return (
    <Row xs={1} md={2} lg={3} style={{ gap: "16px" , justifyContent: "space-evenly"}}>
      <CheckDataItem/>
    </Row>
  );
};

export default TrainingList;
