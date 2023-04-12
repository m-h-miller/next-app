import React, { useState, useCallback, createContext } from 'react';

type NotificationStatus = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';

type UINotification = {
    message: String,
    status?: NotificationStatus
}

type NotificationContext = {
    notification?: UINotification | null,
    addNotification: (uiNotification: UINotification) => void,
    removeNotification: () => void,
}

export const NotificationContext = createContext<NotificationContext>({
    notification: null,
    addNotification: () => {},
    removeNotification: () => {}
});

type NotificationProviderProps = {
    children?: React.ReactNode,
    value: NotificationContext
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
    const [notification, setNotification] = useState<UINotification | null>(null)

    function removeNotification(): void {
        setNotification(null);
    }

    function addNotification(uiNotification: UINotification): void {
        setNotification(uiNotification)
        window.setTimeout(() => {
            removeNotification()
        }, 2000)
    }

    const contextValue: NotificationContext = {
        notification,
        addNotification: useCallback(addNotification, []),
        removeNotification: useCallback(removeNotification, [])
    }

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
}
