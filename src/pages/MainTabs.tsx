import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton,} from '@ionic/react';
import { Route, Redirect } from 'react-router';
import SchedulePage from './SchedulePage';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import DeliveryDetail from './DeliveryDetail';
import MapView from './MapView';
import About from './About';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faCoffee, faShoppingBasket, faUser } from '@fortawesome/free-solid-svg-icons';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/schedule" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/orders" render={() => <OrderList />} exact={true} />
        <Route path="/tabs/orders/:id" component={OrderDetail} exact={true} />
        <Route path="/tabs/schedule/:id" component={DeliveryDetail} />
        <Route path="/tabs/orders/deliveries/:id" component={DeliveryDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
        <FontAwesomeIcon icon={faShoppingBasket}  size='2x'/>
        </IonTabButton>
        <IonTabButton tab="orders" href="/tabs/orders">
        <FontAwesomeIcon icon={faClipboardList}  size='2x'/>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
        <FontAwesomeIcon icon={faUser}  size='2x'/>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
