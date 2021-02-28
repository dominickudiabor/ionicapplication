import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, addCircleOutline, location, cart, informationCircle, people } from 'ionicons/icons';
import SchedulePage from './SchedulePage';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import DeliveryDetail from './DeliveryDetail';
import MapView from './MapView';
import About from './About';

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
          <IonIcon icon={calendar} />
          <IonLabel>Deliveries</IonLabel>
        </IonTabButton>
        <IonTabButton tab="orders" href="/tabs/orders">
          <IonIcon icon={cart} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={addCircleOutline} />
          <IonLabel>Create Order</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={people} />
          <IonLabel>People and Sizes</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
