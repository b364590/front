import React, { useEffect, useState, Fragment } from "react";
import basestyle from "../Base.module.css";
import Projectstyle from "./Project.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"
import CheckDataList from "./CheckDataList.js";
import { v4 } from "uuid";
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


const CheckData = () => {
    localStorage.setItem('Check your data', true);
    const [data, setData] = useState([]);
    const [dataname, setDataname] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    // const [alldata, setAllData] = useState([]);
    const [issubmit, setIssubmit] = useState(true);
    // 獲取整個查詢字串
    var queryString = window.location.search;
    // 解析查詢字串為鍵值對的物件
    var params = new URLSearchParams(queryString);
    var id = params.get('id');
    var folder_name = params.get('folder_name');
    // const fileName = filePath.split('\\').pop(); // 使用 split 和 pop

    useEffect(() => {
      axios.get(`/upload/${folder_name}`)//get &${folder_name}跟路徑值

            .then(response => {
                console.log("response:", response.data);
                // const imagePaths = allPaths.filter(path => (
                //     path.endsWith(".jpg") || path.endsWith(".jpeg") || path.endsWith(".png")
                // ));
                
                // 使用 set 方法更新 state
                // if (Array.isArray(response.data)) {
                //     // 使用 set 方法更新 state
                //     setData(prevData => [...prevData, ...response.data]);
                // } else {
                //     // 如果不是数组，可以考虑将其包装成数组再更新 state
                //     setData(prevData => [...prevData, response.data]);
                // }
                
                
                console.log("response:",response.data);
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className={Projectstyle.container}>
            {/* 登出介面 */}
            <Nav className="justify-content-between align-items-center" style={{ boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)' }} activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="#">
                        <img
                            alt=""
                            src={background}
                            width="70"
                            height="70"
                            className="d-inline-block align-top"
                        />{' '}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link href={`/Steppage?id=${id}&folder_name=${folder_name}`}>
                        <Button variant="outline-danger"  >Back to Steppage</Button>{' '}
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* 專案 */}
            <p className={Projectstyle.title}>Photos:</p>
            <Row className="justify-content-start flex-direction-column">
                <Col>
                    <CheckDataList listData={data} deleteData={setData} />
                </Col>
            </Row>
        </div>
    );
};

export default CheckData;