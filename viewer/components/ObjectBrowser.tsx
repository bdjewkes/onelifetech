import * as React from "react";
import * as ReactDOM from "react-dom";
import { Table, Input, Pagination } from 'semantic-ui-react'
import { Object } from "../types"

interface ObjectBrowserContainerProps { objectMap: {[key: number]: Object } }
interface ObjectBrowserContainerState { filterKey: string, pageIndex: number }

export class ObjectBrowserContainer extends React.Component<ObjectBrowserContainerProps, ObjectBrowserContainerState>{
    constructor(props){
        super(props)
        this.state = { filterKey: "", pageIndex: 1 }
    }
    
    // accepts a 1 indexed page number
    paginate(objs: Object[], per_page: number, index: number): Object[] {
        // pages are 1 index, correct for 0-indexing
        index-=1;
        return objs.slice(index * per_page, (index + 1) * per_page)
    }

    objectsPerPage = 20;
    
    render(){
        let keys = Object.keys(this.props.objectMap)
        let objs = keys
            .filter((k) =>
                this.state.filterKey == ""
                || this.props.objectMap[k].name.toUpperCase().includes(this.state.filterKey.toUpperCase())
            )
            .map((k)=> this.props.objectMap[k])
            .sort((a,b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0
            });

        let paged_objs = this.paginate(objs, this.objectsPerPage, this.state.pageIndex);

        return (
            <span>
                <Input
                    size={"big"}
                    placeholder='Example: Knife'
                    onChange={(e,d) => this.setState({ filterKey: d.value, pageIndex:0 })
}
                />
                <Pagination
                    totalPages={Math.floor(objs.length/this.objectsPerPage)}
                    onPageChange={(e,{ activePage })=> this.setState({ pageIndex: Number(activePage) }) }
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                />
                <ObjectBrowserTable
                    getObjectById={(id) => this.props.objectMap[id] }
                    objects={paged_objs}/>
            </span>
        )
    }
}


interface ObjectBrowserTableProps{
    objects: Object[];
    getObjectById: (id: number) => Object;
} 
interface ColumnRenderer { key: string, name: string, renderer: Function }

const ObjectBrowserTable = (props: ObjectBrowserTableProps) => {
    let Identity = (e: any) => <span>{e}</span>;
    let Image = (e: any) => <img src={e}/>
    let ObjectIdArray = (ids: number[]) => {
        if(!ids) return <span/>
        return ids.map(e=>
            <span key={`cat-${e}`}>
                {props.getObjectById(e).name}<br/>
            </span>)
    }
    let columns: ColumnRenderer[] = [
        { key: "id", name: "Object Id", renderer: Identity },
        { key: "sprite", name: "Sprite", renderer: Image },
        { key: "name", name: "Name", renderer: Identity },
        { key: "heatValue", name: "Heat Output", renderer: Identity },
        { key: "rValue", name: "Insulation", renderer: Identity },
        { key: "category_members", name: "Category", renderer: ObjectIdArray }
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

