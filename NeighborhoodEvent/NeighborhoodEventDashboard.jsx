import React, { Component } from 'react';
import NeighborhoodEventList from './allpost/NeighborhoodEventList';
import DashboardHeader from './components/DashboardHeader';
import AdminNeighborhoodEventList from './mypost/AdminNeighborhoodEventList';
import AdminNeighborhoodEventHistoryList from './myposthistory/AdminNeighborhoodEventHistoryList';

class NeighborhoodEventDashboard extends Component{
    constructor(){
        super();
        this.state = {
        curTab: "allpost",
        
        }
    }

    componentDidMount() {

    }

    
    onChangeTabs = (t) => {
        this.setState({
        curTab: t,
        })
    }


    render() {
        const {
        curTab
        } = this.state;
        return (
        <>
            <DashboardHeader
            curTab={curTab}
            onChangeTabs={this.onChangeTabs}
            />
            <br />

            {curTab === "allpost" ? 
                <>
                <NeighborhoodEventList/>
                </>
            : ''}

            {curTab === "mypost" ? 
                <>
                <AdminNeighborhoodEventList/>
                </>
            : ''}

            {curTab === "myposthistory" ? 
                <>
                <AdminNeighborhoodEventHistoryList/>
                </>
            : ''}



        </>
        )
    }
}

export default NeighborhoodEventDashboard;