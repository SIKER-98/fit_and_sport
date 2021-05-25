import './styles/defaultStyle.css';
import FooterComponent from "./components/FooterComponent";
import NavigationComponent from "./components/NavigationComponent";
import DashboardComponent from "./components/trainingPlan/DashboardComponent";
import HomeComponent from "./components/HomeComponent";
import CreatePlanComponent from "./components/createPlan/CreatePlanComponent";
import LoginComponent from "./components/login/LoginComponent";
import RegisterComponent from "./components/register/RegisterComponent";
import AuthenticatedRoute from "./authorisation/AuthenticatedRoute";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import TrainingPlanComponent from "./components/trainingPlan/trainingPlanExcercise/TrainingPlanComponent";




function App() {
    return (
        <div className={'wrapper'}>
            <BrowserRouter>
                <NavigationComponent/>

                <div className={'content'}>
                    <Switch>
                        <Route path={'/'} exact component={HomeComponent}/>
                        <Route path={'/home'} component={HomeComponent}/>
                        <AuthenticatedRoute path={'/dashboard'} component={DashboardComponent}/>
                        <AuthenticatedRoute path={'/create'} component={CreatePlanComponent}/>
                        <Route path={'/plan'} component={TrainingPlanComponent}/>
                        {/*<Route path={'/calendar'} component={CalendarComponent}/>*/}
                        <Route path={'/login'} component={LoginComponent}/>
                        <Route path={'/register'} component={RegisterComponent}/>
                    </Switch>
                </div>

                <FooterComponent/>
            </BrowserRouter>
        </div>
    );
}

export default App;
