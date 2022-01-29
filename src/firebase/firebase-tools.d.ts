declare module 'firebase-tools' {
  type Client = {
    emulators: Emulators;
  };

  type Emulators = {
    start: (options: { only?: string; config?: string }) => Promise<void>;
  };

  const client: Client;
  export default client;
}

declare module 'firebase-tools/lib/emulator/controller' {
  function cleanShutdown(): Promise<void>;
}
