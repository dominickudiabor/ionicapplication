import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import OrderItem from '../components/OrderItem';
import { Order } from '../models/Order';
import { Delivery } from '../models/Schedule';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import './OrderList.scss';

interface OwnProps { };

interface StateProps {
  orders: Order[];
  orderDeliveries: { [key: string]: Delivery[] };
};

interface DispatchProps { };

interface OrderListProps extends OwnProps, StateProps, DispatchProps { };

const OrderList: React.FC<OrderListProps> = ({ orders, orderDeliveries }) => {

  return (
    <IonPage id="order-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Orders</IonTitle>
          </IonToolbar>
        </IonHeader>

          <IonGrid fixed>
            <IonRow>
              {orders.map(order => (
                <IonCol size="12" size-md="6" key={order.id}>
                  <OrderItem
                    key={order.id}
                    order={order}
                    deliveries={orderDeliveries[order.name]}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    orders: selectors.getOrders(state),
    orderDeliveries: selectors.getOrderDeliveries(state)
  }),
  component: React.memo(OrderList)
});
