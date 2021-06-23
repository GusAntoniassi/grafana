import { AlertmanagerGroup } from 'app/plugins/datasource/alertmanager/types';
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { AlertingPageWrapper } from './components/AlertingPageWrapper';
import { AlertManagerPicker } from './components/AlertManagerPicker';
import { useAlertManagerSourceName } from './hooks/useAlertManagerSourceName';
import { useUnifiedAlertingSelector } from './hooks/useUnifiedAlertingSelector';
import { fetchAlertGroupsAction } from './state/actions';
import { initialAsyncRequestState } from './utils/redux';

import { AmNotificationsGroup } from './components/amnotifications/AmNotificationsGroup';

const AlertManagerNotifications = () => {
  const [alertManagerSourceName, setAlertManagerSourceName] = useAlertManagerSourceName();
  const dispatch = useDispatch();

  const alertGroups = useUnifiedAlertingSelector((state) => state.amAlertGroups) || initialAsyncRequestState;
  const results: AlertmanagerGroup[] = alertGroups[alertManagerSourceName || '']?.result || [];

  useEffect(() => {
    if (alertManagerSourceName) {
      dispatch(fetchAlertGroupsAction(alertManagerSourceName));
    }
  }, [dispatch, alertManagerSourceName]);

  return (
    <AlertingPageWrapper pageId="alertmanager">
      <AlertManagerPicker current={alertManagerSourceName} onChange={setAlertManagerSourceName} />
      {results &&
        results.map((group) => {
          return (
            <AmNotificationsGroup alertManagerSourceName={alertManagerSourceName || ''} key={group.id} group={group} />
          );
        })}
    </AlertingPageWrapper>
  );
};

export default AlertManagerNotifications;
