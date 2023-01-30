import { createMachine, assign, DoneInvokeEvent } from 'xstate'

interface Context {
    username: string;
    password: string;
  }
  
  type Event =
    | { type: 'LOGIN'; username: string; password: string }
    | { type: 'LOGOUT' }
    | { type: 'AUTHENTICATE' }
    | { type: 'RESOLVE' }
    | { type: 'REJECT' };
  
export const authenticationMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAdADalT44DEAMgPIDiAkgHIDaADAF1EoAA6lY+MjmEgAHogCMAFgBsFVXwCcAZhV8ArAr59t2gDQgAnogBMSzRQDs+48s2OlfFZpVKAvn4WaFi4BMRS1KTIEPRQDBDkYBT0AG6kANZJwdh4RCT45ADKYABOKURg-EJIIGISUjLyCPr62hR8jibKfAAc9i6OFtYINnoUPVqaCgo908YqCvoBQRg5YfnkkdGxDKUlpCUUIlQkAGYHALYU2aF5UsVlFVUydZIF0jVNymoaOnqGxlMQ1sfBsFBsLj4010uj0o2WIBuuXC72uq1u4UgzHYLAAqgAVZ41V4NT6IFSddTdXxKbSOTo9GzAhCzCiQ4w9fT00E2TQBQIgHCkCBwGRI9ak0TiN7kRqIAC0KmZ8v0FE06o1mo1PRUCPFd1RNDoHyl9XecoQSiZVlsCwoRkWPW0dhUPT6Cj16ORG0oNG2OCgL2lkrkiG0PQcxkcsxsM00Wk5SptI10FG0k1jek0+m8dk9IW9EX1mIgQbNsrJCEcPjVrQUNgh3j4Sn0PWZEKU4NGrf0Nk52bsjn5fiAA */
createMachine<Context, Event >({
    id: 'authentication',
    initial: 'login',
    schema: {
        events: {} as Event,
    },
    // tsTypes: {} as import("./auth.typegen").Typegen0,
    context: {
      username: '',
      password: '',
    },
    states: {
      login: {
        on: {
          LOGIN: {
            target: 'loading',
            actions: assign({
              username: (context, event) => event.username,
              password: (context, event) => event.password,
            }),
            // actions: send('AUTHENTICATE', { to: 'authenticationService' }),
          },
        },
      },
      loading: {
        invoke: {
          id: 'authenticationService',
          src: "authenticate",
          onDone: {
            target: 'authenticated',
          },
          onError: {
            target: 'login',
          },
        },
      },
      authenticated: {
        on: {
          LOGOUT: {
            target: 'login',
          },
        },
      },
    },
  });
  