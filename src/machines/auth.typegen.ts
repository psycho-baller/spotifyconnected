
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.authenticationService": { type: "done.invoke.authenticationService"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.authenticationService": { type: "error.platform.authenticationService"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "authenticate": "done.invoke.authenticationService";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "authenticate";
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "authenticate": "LOGIN";
        };
        matchesStates: "authenticated" | "loading" | "login";
        tags: never;
      }
  