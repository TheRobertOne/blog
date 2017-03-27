import React from "react";
import {connect} from "react-redux";
import { 
  Form, Row, Col, message, Spin, Modal,
  Input, Button, Icon, Upload, Select,
} from 'antd';

import { 
  action_content_add_submit,
  action_content_add_parseApk,
  action_content_add_update_fileList,
  action_content_add_previewVisible,
  action_content_add_previewImage,
  action_content_add_clearAll
} from "../../actions/content/contentAddAction";


import { renderDateTime } from "../../utils/RenderUtil";
import moment from 'moment';

//import {isNumber,} from "../../utils/ValidUtil";
// import enUS from 'antd/lib/date-picker/locale/en_US';
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const Option = Select.Option;

class ContentAdd extends React.Component {
  //整个表单submit的函数
  handleToSubmit(){
    const {getFieldsValue,validateFields,resetFields} = this.props.form;
    validateFields((err,values) => {
      console.log("err",err);
      console.log("values",values);
      //return
      if(!err){
        this.props.onSubmit(values);
        //this.props.updateFileList([]);
      }
    })
  }
  //上传前的控制
  beforeUpload(file){
    console.log("进入 beforeUpload 函数",file);

    const {onParseAPK} = this.props;
    const {getFieldsValue,validateFields,resetFields} = this.props.form;


    //console.log(getFieldsValue(["APKorBanner"]).APKorBanner);


      //console.log("apk")
      if(file.name.toLocaleLowerCase().indexOf("apk") == -1){
        //console.log("apk_if")
        message.error("请传入apk文件");
        return false;
      }else{
        //console.log(file);
        onParseAPK(file);
        this.forceUpdate();
        return false ;
      }
    // if(getFieldsValue(["APKorBanner"]).APKorBanner == 1){
    // }else{
    //   if (file.fileName.toLocaleLowerCase().indexOf("jpg") == -1 && file.fileName.toLocaleLowerCase().indexOf("png") == -1) {
    //     //console.log("jpg_if")
    //     message.error("请传入 图片 文件");
    //     return false;
    //   }else{
    //     //console.log("jpg_else")
    //     onUploadAPK(file);
    //     return false ;
    //   }      
    // }

    // const isAPK = file.type === "apk" || "APK";
    // //控制图片格式
   

    //控制大小
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!',3);
    // }

    //这一步好屌，利用ES6的函数

    //file.url = URL.createObjectURL(file);

    //要给一个fileName

    //
  }
  handleUploadChange(info){
    console.log("handleUploadChange函数 Info",info);
    //这步好屌 
    this.forceUpdate();

    this.props.updateFileList(info.fileList);
  }

  onPreview(file){
    console.log("onPreview函数里的file:",file);
    const {onPreview,onImg} = this.props;
    onPreview(true);
    onImg(file.url);
  }

  //select
  handleSlectChange(value){
    console.log("进入 handleSlectChange 函数",value);
    //这步好屌 
    //this.forceUpdate();
    //const {nameDis} = this.props;
    //value == 1 ? nameDis(false) : nameDis(true);
  }  


  handlePreviewClick(id){
    console.log(id);
  }
  componentDidMount(){
    console.log("进入到 版本 ContentAdd 组件",this.props);
    //this.props.getList();
  }
  componentWillUnmount(){
    this.props.onClear();
  }
  render(){
    const {getFieldDecorator,resetFields} = this.props.form;
    const {listData,onUploadAPK,onImg,onPreview} = this.props;
    // const formItemLayout = {
    //   style:{width:"30%"}
    // };
    const modalItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      style:{
        width:"50%"
      }
    };
     const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <Spin spinning={listData.spinning} >
          <Form style={{display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"center",paddingTop:"50px"}}>
            <div style={{marginBottom:"24px"}}>

              <Button 
                size="large"
                type="primary"
                style={{marginRight:"15px"}}
                onClick={this.handleToSubmit.bind(this)} 
              >Submit</Button>

              {/*<Button 
                size="large"
                onClick={e => {
                  resetFields();
                  onUploadAPK([]);
                }}
              >清空</Button>*/}

          </div>
          {/*<FormItem 
              hasFeedback
              // validateStatus="success"
              label="Select"
              {...modalItemLayout}
          >           
              {getFieldDecorator('APKorBanner', {
                rules: [{ required: true, message: 'Required！' }],
                initialValue: "1"
              })(            
                  <Select
                    //allowClear
                    showSearch
                    placeholder="choose one"
                    onChange={this.handleSlectChange.bind(this)}
                  >
                    <Option value="1">上传APK</Option>
                    <Option value="2">上传Banner</Option>
                  </Select>
              )}
          </FormItem> */}
          {/*<FormItem 
              hasFeedback
              // validateStatus="success"
              label="NAME"
              {...modalItemLayout}
          >           
              {getFieldDecorator('versionName', {
                rules: [{ required: false, message: 'Required！' }],
                //initialValue: 0
              })(            
                <Input 
                  size="large" 
                  //disabled={listData.disable_name}
                />
              )}
          </FormItem>       */}
          <FormItem 
            hasFeedback
            validateStatus = {listData.fileList.length > 0 ? "success" : "error"}
            label="APK"
            {...modalItemLayout}
          >
            {getFieldDecorator('apk', {
              rules: [{ required: true, message: 'Required!' }],
            })(
            <div className="clearfix">         
              <Upload
                //name="file"
                listType="picture-card"
                //action="/action.do"//必选参数，上传的地址 qy-uriel-manage-indo
                fileList={listData.fileList}//已经上传的图片的列表
                //上传前触发 
                beforeUpload={
                  this.beforeUpload.bind(this)
                }

                //预览触发
                onPreview={this.onPreview.bind(this)}   

                onChange={
                  this.handleUploadChange.bind(this)
                }
              > 
                {/*当到达 XX 张照片的时候 隐藏上传空间 */}
                {listData.fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal 
                visible={listData.previewVisible} 

                onCancel={e => {
                  onPreview(false)
                }}

                onOk={e => {
                  onPreview(false)
                }}
              >
                <img 
                  //alt="example" 
                  style={{ width: '100%' }} 
                  src={listData.previewImage} 
                />    

              </Modal>              
            </div>
            )}
          </FormItem>
          
        </Form>
        
      </Spin>)
  }
}



//把antd的Form绑定到redux中，仅限于这张页面
ContentAdd = Form.create()(ContentAdd);

const mapStateToProps = state => {
  return {
    listData:state.content.contentAdd
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //gallerylist:(...args) => dispatch(action_content_gallery_list(...args)),
    // action_content_add_select 
    // ,
    // 
    onParseAPK:(...args) => dispatch(action_content_add_parseApk(...args)),
    onSubmit:(...args) => dispatch(action_content_add_submit(...args)),
    updateFileList:(...args) => dispatch(action_content_add_update_fileList(...args)),
    onPreview:(...args) => dispatch(action_content_add_previewVisible(...args)),
    onImg:(...args) => dispatch(action_content_add_previewImage(...args)),
    onClear:(...args) => dispatch(action_content_add_clearAll(...args))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentAdd);

