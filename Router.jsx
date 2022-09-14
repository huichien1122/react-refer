import React from "react";
import PrivateRoute from "./PrivateRoute";
// import { Layout } from "antd";
import LoggedInLayout from "../Layout/LoggedInLayout";
import history from "./history";
import { Router as RouterDom, Route, Switch } from "react-router-dom";
import Error404Page from '../Error/Error404Page';

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import Dashboard from "../Dashboard/Dashboard";
import Org from "../Organization/Org";
import FamilyList from "../Project/Family/FamilyList";
import Info from "../Info/Info";
import CommunitiesProfile from "../CommunitiesProfile/CommunitiesProfile";
import WorkforceJobDashboard from "../Project/WorkforceJob/WorkforceJobDashboard";
import ReportDashboard from "../Project/Report/ReportDashboard";
import WorkforceServiceDashboard from "../Project/WorkforceService/WorkforceServiceDashboard";
import WasteSharingDashboard from "../Project/WasteSharing/WasteSharingDashboard";
import MutualAssistanceDashboard from "../Project/MutualAssistance/MutualAssistanceDashboard";
import AdminList from "../Project/Admin/AdminList";
import NeighborhoodEventDashboard from "../Project/NeighborhoodEvent/NeighborhoodEventDashboard";

let pageRoutes = () => (
  <LoggedInLayout>
    <Switch>
      <PrivateRoute path="/m/404" component={Error404Page} />

      <PrivateRoute path="/m/dashboard" component={Dashboard} />
      <PrivateRoute path="/m/family" component={FamilyList} />
      <PrivateRoute path="/m/admin" component={AdminList} />
      <PrivateRoute path="/m/orgchart" component={Org} />
      <PrivateRoute path="/m/messaging" component={Info} />
      <PrivateRoute path="/m/communities" component={CommunitiesProfile} />
      <PrivateRoute path="/m/workforce_service/job" component={WorkforceJobDashboard} />
      <PrivateRoute path="/m/report" component={ReportDashboard} />
      <PrivateRoute path="/m/workforce_service/service" component={WorkforceServiceDashboard} />
      <PrivateRoute path="/m/waste/sharing" component={WasteSharingDashboard} />
      <PrivateRoute path="/m/mutual/assistance" component={MutualAssistanceDashboard} />
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
          
          <Route path="/" component={pageRoutes} />
          <Route path="*" component={Error404Page} />
        </Switch>
      </RouterDom>
      </main>
  </div>
);

export default Router;
