import { Routes } from '@angular/router';
import { App } from './app';
import { SignalResources } from './signal-resources/signal-resources';
import { Overview } from './overview/overview';
import { CountdownTimer } from './countdown-timer/countdown-timer';
import { LinkedSignals } from './linked-signals/linked-signals';
import { SignalForms } from './signal-forms/signal-forms';

export const routes: Routes = [
    {
        path: '',
        component: Overview,
    },
    {
        path: 'resources',
        component: SignalResources,
    },
    {
        path: 'timer',
        component: CountdownTimer,
    },
    {
        path: 'linked',
        component: LinkedSignals,
    },
    {
        path: 'forms',
        component: SignalForms,
    },
    {
        path: '**',
        redirectTo: '',
    },
];
