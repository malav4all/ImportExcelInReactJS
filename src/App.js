// import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import * as XLSX from 'xlsx'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory from 'react-bootstrap-table2-editor';
const App =  () =>{
  const [data,setData] = useState([])
  const readExcel = (xlFile) =>{
      const promise = new Promise((resolve,reject)=>{
        const fileReader  = new FileReader()
        fileReader.readAsArrayBuffer(xlFile);
        
        fileReader.onload = (e) =>{
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray,{type:"buffer"});
          const wsname = wb.SheetNames[0]
          // console.log(wsname)
          const ws = wb.Sheets[wsname]
          // console.log(ws)
          const data = XLSX.utils.sheet_to_json(ws)
          // console.log(data)
          resolve(data)
        }
        fileReader.onerror = (err) =>{
          reject(err)
        }
      })
      promise.then((d)=>{
        console.log(d)
        setData(d)
      }).catch((e)=>{
        console.log(e.message)
      })
  }
  const columns = [
    {
        dataField: "id",
        text: "Id",
        hidden: true,
        csvExport: false,
    },
    {
        dataField:"Contact Name",
        text:"FieldName",
        headerStyle: { minWidth: "200px" },
    },
    {
        dataField:" phone no",
        text:"Contact no"
    },
    // {
    //   dataField:"Descriptions",
    //   text:"Description"
    // },
    // {
    //     dataField: "operation",
    //     text: "Action",
    //     // formatter:(id)=>formatterButton(id)
    // },
]
  return(
    <>
    {/* {console.log(data)} */}
      <input type='file' onChange={(e)=>{
        const file = e.target.files[0]
        readExcel(file)
      }}/>
      <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              pagination={paginationFactory()}
              noDataIndication="Table is Empty"
              cellEdit={ cellEditFactory({ mode: 'dbclick',blurToSave: true }) }
            />
      
    </>
  )
}

export default App;
