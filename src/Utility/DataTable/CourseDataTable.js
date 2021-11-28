import React, { useState ,useEffect} from 'react'
import { Table,Button, Modal, message} from 'antd';
import { InfoOutlined , ExclamationCircleOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {UserInfo} from '../../Redux/Slices/UserInfo'
import { StudentPostNumber, StudentID} from '../../Redux/Slices/StudentInfo'
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import {AdmissionCourseDataModel} from '../../Model/admissionCourse/AdmissionCourseDataModel'
import {TransferCourseDataModel} from '../../Model/transferCourse/TransferCourseDataModel'
import useFetchPostAdmissionCourseTableData from '../../Hooks/Fetch/admissionCourse/useFetchPostAdmissionCourseTableData';
export default function CourseDataTable(props) {
    const { confirm } = Modal;
    const curUserInfo = useSelector(UserInfo);
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    var {tableData, columns, type, tableDataLoading, mainPageShouldRefresh} = props;
   
    var DefaultChooseData = props.ChosedArray(tableData);
   
    var DefaultChooseDataKeys = DefaultChooseData.map(item => item.key);
    const [selectedRowKeys, setselectedRowKeys] = useState();
    const [selectedRows, setselectedRows] = useState();
    const [isHistoryModalVisible, setisHistoryModalVisible] = useState(false);
    const [currentcheckedHistoryArr, setcurrentcheckedHistoryArr] = useState([]);
    const [data,error,fetchDataFun] = useFetchPostAdmissionCourseTableData();
    useEffect(() => {
        setselectedRows(DefaultChooseData);
        setselectedRowKeys(DefaultChooseDataKeys);
        return () => {
            
        }
    }, [tableData])
    const clickHistoryBtn = (historyArr) => {
        setcurrentcheckedHistoryArr(historyArr);
        setisHistoryModalVisible(true);
    }
    const handleHistoryModalOk = () => {
        setisHistoryModalVisible(false);
    };
    const addHistoryColumn = () =>{
        columns = columns.map((item) => {
            let historyContent = {
                render: historyArr => {
                    if(historyArr.length > 1){
                        return (
                            <Button
                                key = {item}
                                onClick = {() => clickHistoryBtn(historyArr)}
                                shape="circle"
                                size = "small"
                                icon = {<InfoOutlined />}
                            >
                            </Button>
                        )
                    }
                }
            }
            if(item.dataIndex === "history"){
                return {...item,...historyContent};
            }
            else{
                return item;
            }
        })
    }
    const createHistoryContent = () =>{
        let res = [];
        for(let i = 0; i < currentcheckedHistoryArr.length; i++){
            let item = currentcheckedHistoryArr[i];
            let obj = (
                <div key = {item + i} className = {style.historyItem}>
                     {`Course ${item.course} was ${item.apply ? "applied":"unapplied"} by ${item.oper} on ${item.transactiondate}`}
                </div>
            )
            res.push(obj);
        }
        return res;
    }
    const handleOnChange = (selectedRowKeys, selectedRows) =>{
        setselectedRowKeys(selectedRowKeys);
        setselectedRows(selectedRows);
    }
    const selectAll = () =>{
        const legalData = props.CanBeChosedArray(tableData);
        if(legalData.length === selectedRowKeys.length){
            handleOnChange([],[]);
        }
        else{
            const keys = legalData.map((item) => item.key);
            handleOnChange(keys, legalData);
        }
    }
    const submitFun = () =>{
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        if(type === "AdmissionCourse"){
            let requestBody = AdmissionCourseDataModel.AdmissionCourseTableDataModelSubmitDataObj(selectedRows,studentInfoObj,curUserInfo.useroper);
            confirm({
                centered : true,
                title: 'Do you want to submit ?',
                icon: <ExclamationCircleOutlined />,
                content: `${selectedRows.length} course(s) will be applied.`,
                async onOk() {
                    await fetchDataFun(requestBody);
                    if(!!error){
                        message.error("Network is broken !")
                    }
                    else if(data.flag === false){
                        message.error(`Submit failed ! The reason is `);
                    }
                    else{
                        message.success("Submit success !");
                        mainPageShouldRefresh(state => !state);
                    }
                },
                onCancel() {

                },
            });
         
        }
        else if(type === "TransferCourse"){
            let b = TransferCourseDataModel.TransferCourseTableDataModelSubmitDataObj(selectedRows,studentInfoObj, curUserInfo.useroper);
            console.log(b);
        }
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: handleOnChange,
        getCheckboxProps: (record) => props.ChooseDisableOrAble(record)
    };
    addHistoryColumn();
    return (
            <div>
                <div className = {style.tableTitle}>{!!props.title ? props.title : null}</div>
                <Modal 
                    key = "historyCheck"
                    centered
                    visible={isHistoryModalVisible} 
                    closable={false}
                    title = {[
                        <div key = "checkHistoryTitle" className = {style.modalTitle} >APPLY HISTORY</div>
                    ]}
                    footer={[
                        <Button key="historyCheckOk" type="primary" onClick={handleHistoryModalOk}>
                            OK  
                        </Button>,]}
                    >
                       {createHistoryContent()}
                </Modal>
                <Table
                    className = {style.header}
                    rowSelection = {{
                        type: "Checkbox",
                        columnTitle: "APPLY",
                        ...rowSelection
                    }}
                    columns = {columns}
                    dataSource = {tableData}
                    loading = {tableDataLoading}
                >
                </Table>
                <div className = {style.buttonContainer}>
                    <Button onClick = {selectAll} className = {style.button}>SELECT ALL</Button>
                    <Button onClick = {submitFun} type="primary" className = {[style.button, style.Pbutton, ]}>SUBMIT</Button>
                </div>              
            </div>
            
    )
}



