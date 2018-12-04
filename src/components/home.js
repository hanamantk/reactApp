import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../actions/postActions';

import store from '../store';


class Home extends Component {
    constructor(props) {
        super(props)
          this.state={
                      products:[],
                      itemsSeleted:[],
                      checkedItems: new Map(),
                      packages:[]                 
          }

      this.render_products=this.render_products.bind(this);
      this.getCourierprice=this.getCourierprice.bind(this);
      }
    
      componentWillReceiveProps(nextProps){
       
        let data=store.getState().prod.items;
               this.setState({products:data});
               
       
        }
  
    componentDidMount(){
      this.props.fetchData();
    } 


    getCourierprice(totalPrice){

      if(totalPrice<200){
        return 5;
      }else if(totalPrice>200 && totalPrice<500 ){
        return 10;
      }else if(totalPrice>500 && totalPrice<1000 ){
        return 15;
      }else if(totalPrice>100 && totalPrice<5000 ){
        return 20;
      }else{
        return null;
      }
    }

    getSelectedItems=(checkedItem,e)=>{
      
          const item = e.target.name,
                itemId=checkedItem.ID,
                isChecked = e.target.checked;

      if(isChecked){

        this.state.itemsSeleted.push(checkedItem);
      }else{

        var newItems=JSON.parse(JSON.stringify(this.state.itemsSeleted));
         newItems = newItems.filter(( itm )=>{
            return itm.ID !== itemId;
           });

        this.setState({
                        itemsSeleted: newItems
        });

      }
     

    this.setState(prevState => ({ 
      checkedItems: prevState.checkedItems.set(item, isChecked) 
    }));
    

    }

   
  onSubmit = (e) => {

    e.preventDefault();

    var items    = this.state.itemsSeleted,
      totalPrice = 0,     packageList = {},
      totalWt    = 0,     tempArray   = [],pkgCount=1,pkDetails;
    
    for(let i=0;i<items.length;i++){
      
      totalPrice+=parseInt(items[i].price);
      totalWt+= parseInt(items[i].weight);

      if(totalPrice>250){
        
       packageList[pkgCount] = this.buildPackage(totalPrice-items[i].price,totalWt-items[i].weight,tempArray);

        pkgCount++;
        tempArray   = [];
        totalPrice  = 0;
        totalWt     = 0;
       
        tempArray.push(items[i]);
        totalPrice+=parseInt(items[i].price);
        totalWt+= parseInt(items[i].weight);

          if(totalPrice>250){ 
          
          packageList[pkgCount] = this.buildPackage(totalPrice,totalWt,tempArray);
          
          }else{
              if(i===items.length-1){

              packageList[pkgCount] = this.buildPackage(totalPrice,totalWt,tempArray);
            }
        }
      
        if(i===items.length-1){
          break;
        }
        
      }else{
        tempArray.push(items[i]);
        if(i===items.length-1){
         packageList[pkgCount] = this.buildPackage(totalPrice,totalWt,tempArray);
        }
      }
    }

     this.finalPackage(packageList);
    
  }

  buildPackage(totalPrice,totalWt,tempArray){
      var pkDetails         = this.getPackageDetials(totalPrice,totalWt);
          tempArray.push(pkDetails);
          return tempArray;
    }


   finalPackage(packageList){

      var mainarr=[];
    for(var pckg in packageList){
       
        var itemstr='';
        packageList[pckg].forEach((pk,i)=>{
          
          if(pk.totalPrice){
             pk["pkg"]=itemstr;
            mainarr.push(pk);
          }else{
            itemstr=itemstr+' '+pk.name;
          }

        })
       
    }
    this.setState({packages:mainarr});
    }

  getPackageDetials(price,totalWt){

        var pkgDetails              = {};
        var cCharge                 = this.getCourierprice(totalWt);
        pkgDetails['totalPrice']    = price;
        pkgDetails['totalWeight']   = totalWt;;
        
        pkgDetails['courierCharge'] = cCharge;
        
    return pkgDetails;
  }

  render_packages=(packages)=>{

    return packages.map((pk,i)=>{

       return <li key={i}>
                  <h4>package-{i+1}:  {pk["pkg"]}</h4><br/>
                  <i>Total Price:  ${pk["totalPrice"]}</i><br/>
                  <i>Total Weight:  {pk["totalWeight"]}g</i><br/>
                  <i>Courier Charge:  ${pk["courierCharge"]}</i>
          </li>;
         
          
         
    });

  }

   render_products(products){
      var self=this;
      return products.map((el,i)=>{
         return (<tr key={i}><td>{el.name}</td><td>{el.price}</td>
                  <td>{el.weight}</td>
                  <td><input className="checkbx" type="checkbox" name="products"
                  checked={self.state.checkedItems.get(el.checked)} 
                  onChange={self.getSelectedItems.bind(self,el)}/>
                  </td>
               </tr>)
      })
    }


   render() { 
         return (
                <div className="product-form">
                 <form onSubmit = {this.onSubmit}>
                   <table>
                      <tbody>
                      <tr><th>Product Name </th><th>Price </th><th>Weight </th><th>select</th></tr>
                        {this.render_products(this.state.products)}
                        </tbody>

                   </table>
                    <button className="submit-btn">
                        Submit
                    </button>
                   </form>
                   <div className="package">
                   <h2>Package Detiales</h2>
                   <ul>
                        {this.render_packages(this.state.packages)}
                       </ul>
                   </div>
                </div>
        
             );
    }
  }

  const mapStateToProps=state=>({
    products:state.prod.items
  })


 export default connect(mapStateToProps,{fetchData})(Home)
 