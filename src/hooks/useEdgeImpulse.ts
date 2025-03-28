// hooks/useEdgeImpulse.ts
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Module: unknown;
  }
}

export function useEdgeImpulse() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [classifier, setClassifier] = useState<any>(null);

  useEffect(() => {
    const loadClassifier = async () => {
      const Module = await import("../../public/ei-model/edge-impulse-standalone.js");
      return new Promise<void>((resolve) => {
        Module.default({
          locateFile: (path: string) => `/ei-model/${path}`,
          onRuntimeInitialized() {
            const classifierInstance = new Module.EdgeImpulseClassifier();
            classifierInstance.init().then(() => {
              setClassifier(classifierInstance);
              resolve();
            });
          },
        });
      });
    };

    loadClassifier();
  }, []);

  return classifier;
}
