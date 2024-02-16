import CheckDataItem from "./CheckDataItem";
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

const CheckDataList = ({ listData, deleteData}) => {
  //console.log("listData:", listData);
  return (
    <Row xs={1} md={2} lg={3} style={{ gap: "16px" , justifyContent: "space-evenly"}}>
      {listData.map((item) => { 
         const { photo_data, id } = item;
         return (
           <CheckDataItem
             id={id}
             photo_data={background}
             deleteData={deleteData}
           />
         )}
      )
    }
    </Row>
  );
};

export default CheckDataList;
