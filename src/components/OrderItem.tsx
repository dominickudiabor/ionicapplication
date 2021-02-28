import React from 'react';
import { Delivery } from '../models/Schedule';
import { Order } from '../models/Order';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';


interface OrderItemProps {
  order: Order;
  deliveries: Delivery[];
}

const OrderItem: React.FC<OrderItemProps> = ({ order, deliveries }) => {
  return (
    <>
      <IonCard className="order-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="order-item" routerLink={`/tabs/orders/${order.id}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + order.profilePic} alt="Order profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{order.name}</h2>
              <p>{order.title}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {deliveries.map(delivery => (
              <IonItem detail={false} routerLink={`/tabs/orders/deliveries/${delivery.id}`} key={delivery.name}>
                <IonLabel>
                  <h3>{delivery.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/orders/${order.id}`}>
              <IonLabel>
                <h3>About {order.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default OrderItem;
