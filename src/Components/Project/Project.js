import React, { useEffect, useState, Fragment } from "react";
import basestyle from "../Base.module.css";
import Projectstyle from "./Project.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate, NavLink, Link } from "react-router-dom";
import background from "../../image/instai_icon.png"
import background2 from "../../image/iconnew.png"
import CreateProject from "../CreateProject/CreateProject.js";
import List from "./List";
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


const Project = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    // const [alldata, setAllData] = useState([]);
    const [issubmit, setIssubmit] = useState(true);
    localStorage.setItem('Upload', false);
    localStorage.setItem('Fill out the form', false);
    localStorage.setItem('Check your data', false);
    localStorage.setItem('Check your Requirement', false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch("your_backend_endpoint");
    //         if (!response.ok) {
    //           throw new Error("Network response was not ok");
    //         }
    //         const result = await response.json();
    //         setData(result);
    //         setFilteredData(result);
    //       } catch (error) {
    //         console.error("Error fetching data:", error);
    //       }
    //     };

    //     fetchData();
    //   }, []);//抓取後端資料

    // useEffect(() => {
    //     // setData(prevData => [
    //     //     ...prevData,
    //     //     {
    //     //         id: v4(),
    //     //         name,
    //     //     },
    //     // ]);
    //      axios.get('/WCreateFolder')
    //         .then((response) => console.log(response))
    //          .catch((error) => console.log(error))
    // }, []);//存data值

    useEffect(() => {
        axios.get('/WCreateFolder')
            .then(response => {
                console.log("response:", response.data);
                // 使用 set 方法更新 state
                if (Array.isArray(response.data)) {
                    // 使用 set 方法更新 state
                    setData(prevData => [...prevData, ...response.data]);
                } else {
                    // 如果不是数组，可以考虑将其包装成数组再更新 state
                    setData(prevData => [...prevData, response.data]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // 第二个参数为空数组，表示只在组件挂载时执行一次



    console.log("data:", data);
    console.log("filteredData:", filteredData);

    useEffect(() => {
        if (issubmit)
            setFilteredData(data);
    }, [data]);

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };//查詢功能

    const handleSearchClick = () => {
        const updatedFilteredData = data.filter((item) =>
            item.folder_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setIssubmit(false);
        setFilteredData(updatedFilteredData);
    };//顯示查詢結果

    const showall = () => {
        setIssubmit(true);
        setFilteredData(data);
    }//顯示所有結果

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
                <Nav.Item>
                    <Nav.Link href="#">
                        <img
                            alt=""
                            src={background2}
                            height="70"
                            className="d-inline-block align-top"
                        />{' '}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link href="/login">
                        <Button variant="outline-danger"  >Log out</Button>{' '}
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* 查詢專案&新增專案 */}
            <div className={Projectstyle.body}>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search..."
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
                    <Button onClick={handleSearchClick} variant="outline-success">Search</Button>
                </Form>
                <Nav.Link href="/CreateProject">
                    <Button variant="primary" size="lg" >Add Project</Button>{' '}
                </Nav.Link>
            </div>

            {/* 專案 */}
            <p className={Projectstyle.title}>Projects:</p>
            <Button onClick={showall} variant="primary" size="lg" >Show all</Button>{' '}
            <Row className="justify-content-start flex-direction-column">
                <Col>
                    <List listData={filteredData} deleteData={setData} />
                </Col>
            </Row>

        </div>
    );
};

export default Project;
