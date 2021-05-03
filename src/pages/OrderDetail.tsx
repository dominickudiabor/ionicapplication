import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './OrderDetail.scss';

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp } from 'ionicons/icons';

import { connect } from '../data/connect';
import * as selectors from '../data/selectors';

import { Order } from '../models/Order';


interface OwnProps extends RouteComponentProps {
  order?: Order;
};

interface StateProps {};

interface DispatchProps {};

interface OrderDetailProps extends OwnProps, StateProps, DispatchProps {};

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');

  function openOrderShare(order: Order) {
    setActionSheetButtons([
      {
        text: 'Copy Link',
        handler: () => {
          console.log('Copy Link clicked');
        }
      },
      {
        text: 'Share via ...',
        handler: () => {
          console.log('Share via clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]);
    setActionSheetHeader(`Share ${order.name}`);
    setShowActionSheet(true);
  }

  function openContact(order: Order) {
    setActionSheetButtons([
      {
        text: `Email ( ${order.email} )`,
        handler: () => {
          window.open('mailto:' + order.email);
        }
      },
      {
        text: `Call ( ${order.phone} )`,
        handler: () => {
          window.open('tel:' + order.phone);
        }
      }
    ]);
    setActionSheetHeader(`Share ${order.name}`);
    setShowActionSheet(true);
  }

  function openExternalUrl(url: string) {
    window.open(url, '_blank');
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <IonPage id="order-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar color="medium">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/orders" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => openContact(order)}>
                <IonIcon slot="icon-only" ios={callOutline} md={callSharp}></IonIcon>
              </IonButton>
              <IonButton onClick={() => openOrderShare(order)}>
                <IonIcon slot="icon-only" ios={shareOutline} md={shareSharp}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="order-background">
          <img src={order.profilePic} alt={order.name}/>
          <h2>{order.name}</h2>
        </div>

        <div className="ion-padding order-detail">
          <p>{order.about} Say hello on social media!</p>

          <hr/>

          <IonChip color="twitter" onClick={() => openExternalUrl(`https://twitter.com/${order.twitter}`)}>
            <IonIcon icon={logoTwitter}></IonIcon>
            <IonLabel>Twitter</IonLabel>
          </IonChip>

          <IonChip color="dark" onClick={() => openExternalUrl('https://github.com/ionic-team/ionic')}>
            <IonIcon icon={logoGithub}></IonIcon>
            <IonLabel>GitHub</IonLabel>
          </IonChip>

          <IonChip color="instagram" onClick={() => openExternalUrl('https://instagram.com/ionicframework')}>
            <IonIcon icon={logoInstagram}></IonIcon>
            <IonLabel>Instagram</IonLabel>
          </IonChip>
        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    order: selectors.getOrder(state, ownProps)
  }),
  component: OrderDetail
});
