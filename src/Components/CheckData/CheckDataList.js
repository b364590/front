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

  // const imageFiles = listData.filter(
  //   (item) =>
  //     item.project_name &&
  //     (item.project_name.endsWith(".jpg") ||
  //       item.project_name.endsWith(".jpeg") ||
  //       item.project_name.endsWith(".png"))
  // );

  return (
    <Row xs={1} md={2} lg={3} style={{ gap: "16px" , justifyContent: "space-evenly"}}>
      {listData.map((item) => { 
        // const {fileName, path} =item
         console.log("filePath:",item)
         return (
           <CheckDataItem
            //  fileName={fileName}
             filePath={item}
             deleteData={deleteData}
           />
         )}
      )
    }
    </Row>
  );
};

export default CheckDataList;
