import React from 'react';
import { Table} from 'antd';
import style from './DataTable.module.less'
import 'antd/dist/antd.less';
export default function TransferProgramOfStudyDataTable(props) {
    var {tableData, columns, tableDataLoading} = props;
    return (
        <div>
                <div className = {style.tableTitle}>Transfer Program of Study</div>
                <Table
                    className = {style.header}
                    columns = {columns}
                    dataSource = {tableData}
                    loading = {tableDataLoading}
                >
                </Table>     
        </div>
    )
}
