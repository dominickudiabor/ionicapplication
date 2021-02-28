import { IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonAlert, AlertButton } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Schedule, Delivery } from '../models/Schedule';
import DeliveryListItem from './DeliveryListItem';
import { connect } from '../data/connect';
import { addFavorite, removeFavorite } from '../data/deliveries/deliveries.actions';

interface OwnProps {
  schedule: Schedule;
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteDeliveries: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface DeliveryListProps extends OwnProps, StateProps, DispatchProps { };

const DeliveryList: React.FC<DeliveryListProps> = ({ addFavorite, removeFavorite, favoriteDeliveries, hide, schedule, listType }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  if (schedule.groups.length === 0 && !hide) {
    return (
      <IonList>
        <IonListHeader>
          No Deliveries Found
        </IonListHeader>
      </IonList>
    );
  }

  return (
    <>
      <IonList style={hide ? { display: 'none' } : {}}>
        {schedule.groups.map((group, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {group.time}
              </IonLabel>
            </IonItemDivider>
            {group.deliveries.map((Delivery: Delivery, DeliveryIndex: number) => (
              <DeliveryListItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteDeliveries.indexOf(Delivery.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${DeliveryIndex}`}
                delivery={Delivery}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteDeliveries: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: DeliveryList
});
