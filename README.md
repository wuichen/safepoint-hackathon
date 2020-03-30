# Safepoint working prototype

Safepoint is a platform that allow users to report their sickness, share essential information with the public including privacy and clinical report protocols, and connect with medical professionals for a video chat consulting session.

demo at https://safepoint-d221c.firebaseapp.com/

## Tech stack

- react
- hasura
- stripe
- mapbox
- fortmatic
- node.js
- firebase

## Dev Setup

1. `npm install`
2. copy `.env.example` to `.env` and provide your own credentials
3. install firebase cli
4. change `.firebaserc` to your own firebase project
5. setup the credentials in firebase functions by using the command line like this `firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"` credentials that need to be set up are `stripe.token,stripe.endpoint_secret,stripe.currency, sg.apikey`
6. `npm run start`

## Limitations

many of the features are still currently (wip). email sending only works on localhost:3000 currently.

Using https://github.com/roll-your-own/subscriptions as base template currently 
