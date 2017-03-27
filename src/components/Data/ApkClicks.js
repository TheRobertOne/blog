import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import { 
  Form, 
  Input, Button, Icon, 
  Select, DatePicker, 
  Table, Tooltip,
  Badge, 

} from 'antd';

import "../../less/tableBug.less";
import {
  action_data_apkClick_list,
  action_data_apkClick_onSelect,
  action_data_apkClick_updateparams,
  action_data_apkClick_search,
  action_data_apkClick_export
} from "../../actions/data/apkClicksAction";


import { renderDatetime,renderDateTime } from "../../utils/RenderUtil";

import moment from 'moment';

//import {isNumber,} from "../../utils/ValidUtil";
// import enUS from 'antd/lib/date-picker/locale/en_US';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class ApkClicks extends React.Component {
  /**
   * 分页、排序、筛选变化时触发
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange(pagination, filters, sorter) {
      // console.log("pagination",pagination);
      // console.log("filters",filters);
      // console.log("sorter",sorter);
      this.props.updateparams(pagination, filters, sorter);
  }
  /**
   * 查询触发action
   */
  searchForm(e){
    const {getFieldsValue,} = this.props.form;
    const {onSearch,} = this.props;
    console.log("searchForm 里的 取值为：",getFieldsValue());
    let value = getFieldsValue();
    console.log(value);
    if(value.CreateTime && value.CreateTime.length > 0){// 
      value.createdAtStart = moment(value.CreateTime[0]).format("YYYY-MM-DD");
      value.createdAtEnd = moment(value.CreateTime[1]).format("YYYY-MM-DD");
      onSearch(value);
    }else{
      value = {}
      onSearch(value)
    }
  }
  /**
   * 获取导出标题栏
   * @param rowIndex
   * @return {*}
   */
  getExportTitles() {
    //this.getColumns()
    const titles = this.getColumns().filter(item => item.title != null && item.dataIndex != null).map(item => {
        return {
            title: item.title,
            index: item.dataIndex,
            filters: item.filters,
            type: item.type
        }
    });
    return titles;
  }


    /**
     * 导出数据
     */
    handleExport(page, pageSize) {
        const titles = this.getExportTitles();
        //const {requestExportList, onSearch} = this.props;
        const {requestExportList, } = this.props;
        //const {getFieldsValue,} = this.props.form;
        //this.searchForm();
        //const values = this.inputHelper.getValues();

        //onSearch(values);

        if (requestExportList != null) {
            requestExportList(titles);
        }
    }

  /**
   * 获取行序号
   * @param rowIndex
   * @return {*}
   */
  getRowSort(index) {
    let sort = index + 1;
    const {galleryData} = this.props;

    if (galleryData != null) {
        const pager = galleryData.pager;
        sort += pager.pageSize * (pager.current - 1);
    }

    return sort;
  }
  /**
   * 获取表结构
   */
  getColumns() {
    const { sorter } = this.props.listData;
    
    return [{
        title: 'No',
        render: (value, record, index) => this.getRowSort(index),
        //width: '40px'
    },{
        title: 'APK',
        dataIndex: 'name',
    },{
        title: 'Clicks',
        dataIndex: 'clicks',
        key:"clicks",
        //type: 'date',//datetime 是时分秒
        //render: (value,record,index) => renderDatetime(value),
        sorter: true,
        sortField:"clicks",
        sortOrder:sorter.sortField === "clicks" ? sorter.sortOrder : null ,
    },{
        title: 'Total Clicks',
        dataIndex: 'totalClicks',
        key:"total_clicks",
        sorter: true,
        sortField:"total_clicks",
        sortOrder:sorter.sortField === "total_clicks" ? sorter.sortOrder : null ,       
    },{
        title: 'Upload Time',
        type: 'datetime',
        dataIndex: 'uploadTime',
        render: (value,record,index) => renderDateTime(value),        
    },{
        title: 'Time',
        dataIndex: 'day',
        key:"day",
        type: 'date',//datetime 是时分秒
        render: (value,record,index) => renderDatetime(value),
        sorter: true,
        sortField:"day",
        sortOrder:sorter.sortField === "day" ? sorter.sortOrder : null ,
     },
    //  {
    //     //title: 'Total Clicks',
    //     render: (value,record,index) => <Link to="/ContentMenu/ContentAdd">编辑</Link>,
    // }
    ];
  }
  componentDidMount(){
    console.log("进入到 ContentList 组件",this.props);
    this.props.getList();
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const { listData,onSelect } = this.props;

    return(
    <Form style={{padding:"0 15px 0 15px"}} >
        <div style={{display:"flex", flexDirection:"column",width:"30%"}} >
          <FormItem label="日期" >
            {getFieldDecorator('CreateTime', {
              rules: [{ required: false, message: 'Required' }],
            })(
              <RangePicker 
                //showTime
                //format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD"
              />
            )}
          </FormItem>
          <div style={{display:"flex"}} >  
            <div style={{flexGrow:"1",display:"flex",justifyContent:"space-between"}}>
            <Button 
              type="primary" 
              icon="search"
              onClick={this.searchForm.bind(this)}
            > 
              查询
            </Button>
            <Button 
              icon="download"
              onClick={this.handleExport.bind(this)}
            > 导出 </Button>
            </div>
            <div style={{flexGrow:"1"}}></div>
          </div>
        </div>
        <Badge count={listData.onSelect.selectedRowKeys.length} ></Badge>
        <Table className="tableBug"
          columns={this.getColumns()}
          dataSource={listData.data}        
          loading={listData.loading}
          pagination={{
            total:listData.total,
            showSizeChanger:true,             
            pageSizeOptions:["10","20","50","100"],
            showQuickJumper:true,
            showTotal:(total,range) => {
              return `Total: ${total} items`
            },
          }}
          onChange={this.handleTableChange.bind(this)}
          rowSelection={{
            selectedRowKeys:listData.onSelect.selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows) => {
              onSelect(selectedRowKeys, selectedRows);
            }
          }}  
        />
    </Form>)
  }
}



//把antd的Form绑定到redux中，仅限于这张页面
ApkClicks = Form.create()(ApkClicks);

const mapStateToProps = state => {
  return {
    //galleryData:state.content.contentGallery
    listData:state.data.apkClicks
  }
}

  // ,
  // ,
  // ,
  // ,

const mapDispatchToProps = dispatch => {
  return {
    getList:(...args) => dispatch(action_data_apkClick_list(...args)),
    // (page, pageSize, titles);
    updateparams:(...args) => dispatch(action_data_apkClick_updateparams(...args)),
    onSelect:(...args) => dispatch(action_data_apkClick_onSelect(...args)),
    onSearch:(...args) => dispatch(action_data_apkClick_search(...args)),
    requestExportList:(...args) => dispatch(action_data_apkClick_export(...args)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApkClicks);

