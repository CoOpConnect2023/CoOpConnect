import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export const usePrompt = (message, isDirty) => {
  useEffect(() => {
    // If no unsaved changes, don't add the listener
    if (!isDirty) return;

    // Add the event listener
    const removeListener = Inertia.on("before", (event) => {
      if (!window.confirm(message)) {
        event.preventDefault(); // Prevent navigation if the user cancels
      }
    });

    // Cleanup the event listener
    return () => {
      removeListener(); // Remove the listener when the component unmounts
    };
  }, [isDirty, message]);
};
