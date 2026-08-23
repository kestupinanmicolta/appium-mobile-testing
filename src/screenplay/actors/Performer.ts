import { Actor } from '@serenity-js/core';
import { UseTheApp } from '../interactions/UseTheApp';

export class Performer {
    static async whoCanBrowseTheApp(): Promise<Actor> {
        const actor = Actor.named('Karen');
        await actor.whoCan(UseTheApp.usingAppium());
        return actor;
    }
}
