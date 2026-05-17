export default () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (import.meta.dev) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
    return;
  }

  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service worker registered"))
    .catch((err) => console.error("Error registering SW:", err));
};
