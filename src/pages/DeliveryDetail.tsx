import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel } from '@ionic/react';
import { connect } from '../data/connect';
import { withRouter, RouteComponentProps } from 'react-router';
import * as selectors from '../data/selectors';
import { starOutline, star, share, cloudDownload } from 'ionicons/icons';
import './DeliveryDetail.scss';
import { addFavorite, removeFavorite } from '../data/deliveries/deliveries.actions';
import { Delivery } from '../models/Schedule';

interface OwnProps extends RouteComponentProps { };

interface StateProps {
  delivery?: Delivery;
  favoriteDeliveries: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type DeliveryDetailProps = OwnProps & StateProps & DispatchProps;

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ delivery, addFavorite, removeFavorite, favoriteDeliveries }) => {

  if (!delivery) {
    return <div>Delivery not found</div>
  }

  const isFavorite = favoriteDeliveries.indexOf(delivery.id) > -1;

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(delivery.id) : addFavorite(delivery.id);
  };
  const shareDelivery = () => { };
  const deliveryClick = (text: string) => {
    console.log(`Clicked ${text}`);
  };

  return (
    <IonPage id="delivery-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/schedule"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => toggleFavorite()}>
              {isFavorite ?
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
                <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
              }
            </IonButton>
            <IonButton onClick={() => shareDelivery}>
              <IonIcon slot="icon-only" icon={share}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1>{delivery.name}</h1>
          {delivery.tracks.map(track => (
            <span key={track} className={`delivery-track-${track.toLowerCase()}`}>{track}</span>
          ))}
          <p>{delivery.description}</p>
          <IonText color="medium">
            {delivery.timeStart} &ndash; {delivery.timeEnd}
            <br />
            {delivery.location}
          </IonText>
        </div>
        <IonList>
          <IonItem onClick={() => deliveryClick('watch')} button>
            <IonLabel color="primary">Watch</IonLabel>
          </IonItem>
          <IonItem onClick={() => deliveryClick('add to calendar')} button>
            <IonLabel color="primary">Add to Calendar</IonLabel>
          </IonItem>
          <IonItem onClick={() => deliveryClick('mark as unwatched')} button>
            <IonLabel color="primary">Mark as Unwatched</IonLabel>
          </IonItem>
          <IonItem onClick={() => deliveryClick('download video')} button>
            <IonLabel color="primary">Download Video</IonLabel>
            <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
          </IonItem>
          <IonItem onClick={() => deliveryClick('leave feedback')} button>
            <IonLabel color="primary">Leave Feedback</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    delivery: selectors.getDelivery(state, OwnProps),
    favoriteDeliveries: state.data.favorites
  }),
  mapDispatchToProps: {
    addFavorite,
    removeFavorite
  },
  component: withRouter(DeliveryDetail)
})
