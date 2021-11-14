var validate = require("validate.js");
function CoursesTableDataModelArray(tableData){
    return tableData.map((item) =>{
        if(!!item.history){
            item.history = `The course ${item.course} was applied by operator(${item.oper}) on ${item.transactiondate}.`;
        }
        item.units = item.units.toFixed(1);
        item.gpts = item.gpts.toFixed(2);
        return item;
    })
}

function CoursesTableDataModelChooseDisableOrAble(record){
    if(record.apply === "apply"){
        return {
            key: record.key,
        }
    }
    else if(record.apply === "applied"){
        return {
            key: record.key,
        }
    }
    else if(record.apply === "disable"){
        return {
            disabled: true,
            key: record.key,
        }
    }
}
function CoursesTableDataModelItemCanApplyArray(tableData){
    const tableDataCanApply = tableData.filter((item) => {
        return item.apply !== "disable";
    })
    return tableDataCanApply;
}
function CoursesTableDataModelDefaultChooseData(tableData){
    const tableDataCanApply = tableData.filter((item) => {
        return item.apply === "applied";
    })
    return tableDataCanApply;
}
export const CoursesTableDataModel = {
    CoursesTableDataModelArray : CoursesTableDataModelArray,
    CoursesTableDataModelChooseDisableOrAble : CoursesTableDataModelChooseDisableOrAble,
    CoursesTableDataModelItemCanApplyArray : CoursesTableDataModelItemCanApplyArray,
    CoursesTableDataModelDefaultChooseData : CoursesTableDataModelDefaultChooseData
}