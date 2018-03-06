import * as React from "react";
import * as ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react"
import { Object } from "../types";
import { ObjectBrowserContainer } from "./ObjectBrowser";

interface AppRootState
{
    objects: {[key: number]: Object }
}


export class AppRoot extends React.Component<{}, AppRootState>{
    componentDidMount(){
        var json = fetch("dist/ohol.json")
            .then(response => response.json())
            .then(json => {
                let state: AppRootState = {
                    objects: json["objects"]
                }
                this.setState(state);
            })
    }

    render(){
        if(this.state == null) return <h1>Loading...</h1>
        return(
            <Container>
                <Header size="huge" style={{ padding: 20 }}>One Hour One Life Object Browser</Header>
                <ObjectBrowserContainer objectMap={this.state.objects}/>
            </Container>
        )
    }
}

