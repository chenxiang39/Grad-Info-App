import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, Select} from 'antd';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
export default function StarExceptionDataTable(props) {
    var {tableData, columns} = props;
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [curExceptionType, setcurExceptionType] = useState("RA");
    const [curRname, setcurRname] = useState(null);
    const [curPSname, setcurPSname] = useState(null);
    const [curCourse, setcurCourse] = useState(null);
    const [curRcourse, setcurRcourse] = useState(null);
    const [curReqct, setcurReqct] = useState(null);
    const [curReqhrs, setcurReqhrs] = useState(null);
    const [curRep, setcurRep] = useState(null);
    const [curDept, setcurDept] = useState(null);
    const cleanState = () => {
        setcurExceptionType("RA");
        setcurRname(null);
        setcurPSname(null);
        setcurCourse(null);
        setcurRcourse(null);
        setcurReqct(null);
        setcurReqhrs(null);
        setcurRep(null);
        setcurDept(null);
    }
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    const handleAddModalOk = () =>{
        let obj = {
           
        }
        cleanState();
        setisAddModalVisible(false);
    }
    const handleAddModalCancel = () =>{
        cleanState();
        setisAddModalVisible(false);
    }

    const AddExceptionModal = () =>{
        let char = ["RA","RE","UW","CW"];
        const selectCharOption = char.map((item) => {
            return (
                <Select.Option key = {item + "char"} value = {item}>{item}</Select.Option>
            )
        });
        return (
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
            <Form.Item label= "Exception type: ">
                <Select
                    style={{ width: 100 }}
                    value = {curExceptionType}
                    onChange = {(value)=>setcurExceptionType(value)}
                >
                    {selectCharOption}
                </Select>
            </Form.Item>
            <Form.Item label= "Rname: ">
                <Input
                    value = {curRname}
                    onChange = {(e) => setcurRname(e.target.value)}
                ></Input>
            </Form.Item>
            <Form.Item label= "PsName: ">
                <Input
                    value = {curPSname}
                    onChange = {(e) => setcurPSname(e.target.value)}
                ></Input>
            </Form.Item>
            {
                curExceptionType === "UW" ? 
                <Form.Item label= "Reqhrs: ">
                    <Input
                        value = {curReqhrs}
                        onChange = {(e) => setcurReqhrs(e.target.value)}
                    ></Input>
                </Form.Item> : null 
            }
            {
                curExceptionType === "CW" ? 
                <Form.Item label= "Reqct: ">
                    <Input
                        value = {curReqct}
                        onChange = {(e) => setcurReqct(e.target.value)}
                    ></Input>
                </Form.Item> : null
            }
            {
                curExceptionType === "RA" || curExceptionType === "RE" || curExceptionType === "CW" ? 
                <Form.Item label= "Course: ">
                    <Input
                        value = {curCourse}
                        onChange = {(e) => setcurCourse(e.target.value)}
                    ></Input>
                </Form.Item> : null
            }
            {
                curExceptionType === "RE" ? 
                <Form.Item label= "Rcourse: ">
                    <Input
                        value = {curRcourse}
                        onChange = {(e) => setcurRcourse(e.target.value)}
                    ></Input>
                </Form.Item> : null
            }
            <Form.Item label= "Dept/Rep: ">
                <Input
                    value = {curRep}
                    onChange = {(e) => setcurRep(e.target.value)}
                ></Input>
            </Form.Item>
            <Form.Item label= "Dept: ">
                <Input
                    value = {curDept}
                    onChange = {(e) => setcurDept(e.target.value)}
                ></Input>
            </Form.Item>
            </Form>
        )
    }
    return (
            <div>
                <Button
                    onClick={() => handleAdd()}
                    className={[style.button, style.topButton]}
                    >
                    ADD EXCEPTION
                </Button>
                <Modal 
                    key = "addCommittee"
                    centered
                    visible={isAddModalVisible} 
                    onCancel = {handleAddModalCancel}
                    onOk = {handleAddModalOk}
                    maskClosable = {false}
                    title = {[
                        <div key = "addException" className = {style.modalTitle} >ADD EXCEPTION</div>
                    ]}
                    footer={[
                        <Button  key = "addExceptionCancel" onClick = {handleAddModalCancel}>
                            Cancel
                        </Button>,
                        <Button key="addExceptionOk" type="primary" onClick={handleAddModalOk}>
                            Submit  
                        </Button>,]}
                    >
                    {AddExceptionModal()}
                </Modal>
                <Table
                    className = {style.header}
                    columns = {columns}
                    dataSource = {tableData}
                >
                </Table>                         
            </div>
            
    )
}