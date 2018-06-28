import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchData,getEmpDetail} from '../actions/postActions';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Image } from 'office-ui-fabric-react/lib/Image';
import {HRID,EMPID,DEPT} from './datasource';
import store from '../store';


class Home extends Component {
    constructor(props) {
        super(props)
          this.state={
                    btnDesabled:true,
                    initialSelect:"",
                    ID:[],
                    empId:'',
                    imageLoad:'',
                    img :'hidden',
                    avatar:"",
                    id:'',
                    fname:'',
                    dept:DEPT
          }

          this.getDetails=this.getDetails.bind(this);
          this.clearDetails=this.clearDetails.bind(this);
          this.changeDept=this.changeDept.bind(this);
          this.changeEmpId=this.changeEmpId.bind(this);
      }
    
      componentWillReceiveProps(nextProps){
       
       let data=store.getState().empDetails.items && 
                store.getState().empDetails.items.data||{};
                
       let {id,first_name,avatar}=data;
       this.setState({
                        imageLoad:"",
                        img:"",
                        id:id,
                        fname:first_name,
                        avatar:avatar
                })
        }
  
      getDetails(){
       this.setState({
                    img:'hidden',
                    imageLoad:"Loading..."
        })   
       this.props.getEmpDetail(this.state.empId,);
       
      }

      clearDetails(){
       this.setState({
                    btnDesabled:true,
                    initialSelect:"",
                    ID:[],
                    empId:'',
                    imageLoad:'',
                    img :'hidden',
                    avatar:"",
                    id:'',
                    fname:'',
            })
     }

      changeDept(val){
        (val.key==="HR")? this.setState({
               btnDesabled:false,
               initialSelect:val.key,
               ID:HRID
           }):this.setState({
            btnDesabled:false,
            initialSelect:val.key,
            ID:EMPID
        })
       
      }

      changeEmpId(val){
        let emId=val.text;
        this.setState({empId:emId});
      }

    render() { 
       
         return (
                <div className="ms-Grid container">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-md3 ms-lg3">
                                <Dropdown
                                    label="Departments:"
                                    selectedKey={this.state.initialSelect}
                                    onChanged={(val)=>
                                this.changeDept(val)}
                                options={this.state.dept}
                                />
              </div>
                <div className="ms-Grid-col ms-md3 ms-lg3">
                                <Dropdown
                                        label="Employee Id:"
                                        onChanged={(val)=>
                                    this.changeEmpId(val)}
                                    options={this.state.ID}
                                    disabled={this.state.btnDesabled}
                                    />
                  </div>
                <Btn text="GetDetails" handleClick={this.getDetails}/>
                <Btn text="Clear" handleClick={this.clearDetails}/>
                   </div>
                        <br/><br/>
             <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-md3 ms-lg3"></div>
                        {this.state.imageLoad}
                        <Image
                            className={this.state.img}
                            src={this.state.avatar}
                            alt="Default Image can be anything"
                            width={300}
                            />
             </div><br/>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md3 ms-lg3"></div>
                        <div className="ms-Grid-col ms-md2 ms-lg2">ID:{this.state.id}</div>
                        <div className="ms-Grid-col ms-md2 ms-lg2">Name:{this.state.fname}</div>
                    </div>
                </div>
        
    );
    }
  }

  const mapStateToProps=state=>({
    emp:state.empDetails.items,
    post:state.empDetails.item
  })

  const Btn=(props)=>{
    return <div> <div className="ms-Grid-col ms-md2 ms-lg2" style={{marginTop:28}}>
        <DefaultButton
            data-automation-id="test"
            allowDisabledFocus={true}
            text={props.text}
            onClick={props.handleClick}
        />
    </div></div>
 };

 export default connect(mapStateToProps,{fetchData,getEmpDetail})(Home)
 