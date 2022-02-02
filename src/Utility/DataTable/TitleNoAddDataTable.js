import React from 'react';
import { Table} from 'antd';
import style from './DataTable.module.less'
import 'antd/dist/antd.less';
function TitleNoAddDataTable(props) {
    var {tableData, columns, title} = props;
    return (
        <div>
                <div className = {style.tableTitle}>{title}</div>
                <Table
                    className = {style.header}
                    columns = {columns}
                    dataSource = {tableData}
                >
                </Table>     
        </div>
    )
}

export default React.memo(TitleNoAddDataTable)