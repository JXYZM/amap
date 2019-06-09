import { Map, MouseTool } from 'react-amap';
import { Component } from 'react';
import { Button, Card } from 'antd';

// const layerStyle = {
//   padding: '10px',
//   background: '#fff',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
//   position: 'absolute',
//   top: '10px',
//   left: '10px'
// };

class Amap extends Component{
  constructor(){
    super();
    const self =this;
    this.state = {
      what: '点击下方按钮开始绘制'
    };
    this.toolEvents = {
      created: (tool) => {
        console.log(tool)
        self.tool = tool;
      },
      draw({obj}) {
        self.drawWhat(obj);
      }
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 120, latitude: 35};
  }

  drawWhat(obj) {
    let text = '';
    switch(obj.CLASS_NAME) {
      case 'AMap.Marker':
       text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
       break;
      case 'AMap.Polygon':
        text = `你绘制了一个多边形，有${obj.getPath().length}个端点`;
        break;
      case 'AMap.Circle':
        text = `你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`;
        break;
      default:
        text = '';
    }
    this.setState({
      what: text
    });
  }
  
  drawCircle(){
    if(this.tool){
      this.tool.circle();
      this.setState({
        what: '准备绘制圆形'
      });
    }
  }
  
  drawRectangle(){
    if(this.tool){
      this.tool.rectangle();
      this.setState({
        what: '准备绘制多边形（矩形）'
      });
    }
  }
  
  drawMarker(){
    if (this.tool){
      this.tool.marker();
      this.setState({
        what: '准备绘制坐标点'
      });
    }
  }

  drawPolygon() {
    if (this.tool) {
      this.tool.polygon();
      this.setState({
        what: '准备绘制多边形'
      });
    }
  }
  
  close(){
    if (this.tool){
      this.tool.close();
    }
    this.setState({
      what: '关闭了鼠标工具'
    });
  }
  
  render(){
    return (
    <Card
      title="高德地图Demo"
      style={{ left: '10%',marginTop: '50px', padding: '30px', width: '80%'}}
    >
      <div style={{ width: '100%', height: '500px', padding: '20px'}}>
        <Map 
          plugins={this.mapPlugins}
          center={this.mapCenter}
          style={{left: '10%', width: '80%'}}
        >
          <MouseTool events={this.toolEvents}/>
          <div style={{left: '10%', width: '80%'}}>{this.state.what}</div>
        </Map>
       </div>
       <Button onClick={()=>{this.drawMarker()}}>Draw Marker</Button>
       <Button onClick={()=>{this.drawRectangle()}}>Draw Rectangle</Button>
       <Button onClick={()=>{this.drawCircle()}}>Draw Circle</Button>
       <Button onClick={()=>{this.drawPolygon()}}>Draw Polygon</Button>
       <Button onClick={()=>{this.close()}}>Close</Button>
     </Card>
    )
  }
}

export default Amap