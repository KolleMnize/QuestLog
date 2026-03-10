import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type AppState = {
    status: string;
};

const initialState: AppState = {
    status: "nicht initialisiert"
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (
            store,
        ) => ({
            async init(): Promise<void> {
                console.log("AppStore erfolgreich initialisiert");
                patchState(store, { status: "initialisierung abgeschlossen" });
            },

        })
    )
);