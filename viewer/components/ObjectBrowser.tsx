import * as React from "react";
import * as ReactDOM from "react-dom";
import { Table, Input } from 'semantic-ui-react'
import { Object } from "../types"

interface ObjectBrowserContainerProps { objectMap: {[key: number]: Object } }
interface ObjectBrowserContainerState { filterKey: string }

export class ObjectBrowserContainer extends React.Component<ObjectBrowserContainerProps, ObjectBrowserContainerState>{
    constructor(props){
        super(props)
        this.state = { filterKey: "" }
    }
    
    inputOnChange(e, data) {
        this.setState({ filterKey: data.value})
    }
    
    render(){
        let keys = Object.keys(this.props.objectMap)
        let objs = keys
            .filter(k => this.state.filterKey == "" || this.props.objectMap[k].name.includes(this.state.filterKey))
            .map((k)=> this.props.objectMap[k])
        if(this.state.filterKey){
            objs = objs
        }
        return (
            <span>
                <Input
                    size={"big"}
                    placeholder='Example: Knife'
                    onChange={(e,d) => this.inputOnChange(e,d) }
                />
                <ObjectBrowserTable objects={objs}/>
            </span>
        )
    }
}


interface ObjectBrowserTableProps{ objects: Object[] } 


interface ColumnRenderer { key: string, name: string, renderer: Function }
const Identity = (e) => <span>{e}</span>;
const Image = (e) => <img src={"dist/"+e}/>

const ObjectBrowserTable = (props: ObjectBrowserTableProps) => {
    let columns: ColumnRenderer[] = [
        { key: "id", name: "Object Id", renderer: Identity },
        { key: "sprite", name: "Sprite", renderer: Image },
        { key: "name", name: "Name", renderer: Identity },
        { key: "heatValue", name: "Heat Output", renderer: Identity },
        { key: "rValue", name: "Insulation", renderer: Identity }
    ];

    
    let theaders = columns.map(e=> e.name)
        .map(e=> <Table.HeaderCell key={`th-${e}`}>{e}</Table.HeaderCell>);

    let listItems = props.objects.map((e,i) =>
        <ObjectBrowserListItem
            key={`li-${i}`}
            object={e}
            dataKeys={columns}       
        />)
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    {theaders}
                </Table.Row>
            </Table.Header>

            <Table.Body>{listItems}</Table.Body>
        </Table>)
}


interface ListItemProps { object: Object, dataKeys: ColumnRenderer[] }
const ObjectBrowserListItem = (props: ListItemProps) => {
    let dataCells = props.dataKeys.map((e,i)=>
        <Table.Cell key={`td-${props.object.id}-${e.key}`}>
            {e.renderer(props.object[e.key])}
        </Table.Cell>);
    return (
        <Table.Row>
            {dataCells}
        </Table.Row>
    )
}

