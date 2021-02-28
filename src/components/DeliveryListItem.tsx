import React, { useRef } from 'react';
import { IonItemSliding, IonItem, IonList, IonLabel, IonItemOptions, IonItemOption, AlertButton } from '@ionic/react';
import { Delivery } from '../models/Schedule';

interface DeliveryListItemProps {
  delivery: Delivery;
  listType: "all" | "favorites";
  onAddFavorite: (id: number) => void;
  onRemoveFavorite: (id: number) => void;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  isFavorite: boolean;
}

const DeliveryListItem: React.FC<DeliveryListItemProps> = ({ isFavorite, onAddFavorite, onRemoveFavorite, onShowAlert, delivery, listType }) => {
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const removeFavoriteDelivery = () => {
    onAddFavorite(delivery.id);
    onShowAlert('Favorite already added', [
      {
        text: 'Cancel',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFavorite(delivery.id);
          dismissAlert();
        }
      }
    ]);
  }

  const addFavoriteDelivery = () => {
    if (isFavorite) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      removeFavoriteDelivery();
    } else {
      // remember this delivery as a user favorite
      onAddFavorite(delivery.id);
      onShowAlert('Favorite Added', [
        {
          text: 'OK',
          handler: dismissAlert
        }
      ]);
    }
  };

  return (
    <IonItemSliding ref={ionItemSlidingRef} class={'track-' + delivery.tracks[0].toLowerCase()}>
      <IonItem routerLink={`/tabs/schedule/${delivery.id}`}>
        <IonLabel>
          <h3>{delivery.name}</h3>
          <p>
            {delivery.timeStart}&mdash;&nbsp;
            {delivery.timeStart}&mdash;&nbsp;
            {delivery.location}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        {listType === "favorites" ?
          <IonItemOption color="danger" onClick={() => removeFavoriteDelivery()}>
            Remove
          </IonItemOption>
          :
          <IonItemOption color="favorite" onClick={addFavoriteDelivery}>
            Favorite
          </IonItemOption>
        }
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default React.memo(DeliveryListItem);
