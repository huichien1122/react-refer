import React from "react";
import PrivateRoute from "./PrivateRoute";
// import { Layout } from "antd";
import LoggedInLayout from "../Layout/LoggedInLayout";
import history from "./history";
import { Router as RouterDom, Route, Switch } from "react-router-dom";
import Error404Page from '../Error/Error404Page';

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import SignUpPayment from '../SignUp/SignUpPayment';

import Dashboard from "../Dashboard/Dashboard";
import Admin from "../Project/Admin/AdminList";
import Resident from "../Project/Resident/ResidentList";
import Org from "../Organization/Org";
import Info from "../Info/Info";
import CommunitiesProfile from "../CommunitiesProfile/CommunitiesProfile";
import WorkforceJobList from "../Project/WorkforceJob/WorkforceJobList";
import ReportDashboard from "../Project/Report/ReportDashboard"
import WorforceServiceList from "../Project/WorkforceService/WorkforceServiceList"
import WasteSharingList from "../Project/WasteSharing/WasteSharingList"
import MutualAssistanceList from "../Project/MutualAssistance/MutualAssistanceList";
import NeighborhoodEventDashboard from "../Project/NeighborhoodEvent/NeighborhoodEventDashboard";

let pageRoutes = () => (
  <LoggedInLayout>
    <Switch>
      <PrivateRoute path="/m/404" component={Error404Page} />

      <PrivateRoute path="/m/dashboard" component={Dashboard} />
      <PrivateRoute path="/m/admin" component={Admin} />
      <PrivateRoute path="/m/resident" component={Resident} />
      <PrivateRoute path="/m/orgchart" component={Org} />
      <PrivateRoute path="/m/messaging" component={Info} />
      <PrivateRoute path="/m/communities" component={CommunitiesProfile} />
      <PrivateRoute path="/m/workforcejob" component={WorkforceJobList} />
      <PrivateRoute path="/m/report" component={ReportDashboard} />
      <PrivateRoute path="/m/workforceservice" component={WorforceServiceList} />
      <PrivateRoute path="/m/waste/sharing" component={WasteSharingList} />
      <PrivateRoute path="/m/mutual/assistance" component={MutualAssistanceList} />
      <PrivateRoute path="/m/neighborhood/event" component={NeighborhoodEventDashboard} />


      <PrivateRoute component={Error404Page} />
    </Switch>
  </LoggedInLayout>
);

let Router = () => (
  <div>
      <main>
      <RouterDom history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={SignUp}/>
          <Route path="/signuppayment" component={SignUpPayment}/>              
          
          <Route path="/" component={pageRoutes} />
          <Route path="*" component={Error404Page} />
        </Switch>
      </RouterDom>
      </main>
  </div>
);

export default Router;
