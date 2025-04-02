"use client";

import { useEffect } from "react";
import { useAttendance } from "../context/attendance-context";

export default function KeyListener() {
  const { processRecognitionResult } = useAttendance();

  function PressedKeyL() {
    return {
      success: true,
      data: {
        anomaly: 0,
        results: [
          {
            label: "alice",
            value: Math.random() * (0.8 - 0.5) + 0.5,
            x: 40,
            y: 48,
            width: 8,
            height: 8,
          },
        ],
      },
    };
  }

  function PressedKeyA() {
    return {
      success: true,
      data: {
        anomaly: 0,
        results: [
          {
            label: "annick",
            value: Math.random() * (0.8 - 0.5) + 0.5,
            x: 40,
            y: 48,
            width: 8,
            height: 8,
          },
        ],
      },
    };
  }

  function PressedKeyD() {
    return {
      success: true,
      data: {
        anomaly: 0,
        results: [
          {
            label: "derrick",
            value: Math.random() * (0.8 - 0.5) + 0.5,
            x: 40,
            y: 48,
            width: 8,
            height: 8,
          },
        ],
      },
    };
  }

  function PressedKeyM() {
    return {
      success: true,
      data: {
        anomaly: 0,
        results: [
          {
            label: "mathew",
            value: Math.random() * (0.8 - 0.5) + 0.5,
            x: 40,
            y: 48,
            width: 8,
            height: 8,
          },
        ],
      },
    };
  }

  function PressedKeyB() {
    return {
      success: true,
      data: {
        anomaly: 0,
        results: [
          {
            label: "brian",
            value: Math.random() * (0.8 - 0.5) + 0.5,
            x: 40,
            y: 48,
            width: 8,
            height: 8,
          },
        ],
      },
    };
  }

  function PressedKeyF() {
    return {
      success: true,
      data: {
        anomaly: 0,
        results: [
          {
            label: "favor",
            value: Math.random() * (0.8 - 0.5) + 0.5,
            x: 40,
            y: 48,
            width: 8,
            height: 8,
          },
        ],
      },
    };
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      let result;

      switch (key) {
        case "L":
          result = PressedKeyL();
          processRecognitionResult(result);
          break;
        case "A":
          result = PressedKeyA();
          processRecognitionResult(result);
          break;
        case "D":
          result = PressedKeyD();
          processRecognitionResult(result);
          break;
        case "M":
          result = PressedKeyM();
          processRecognitionResult(result);
          break;
        case "B":
          result = PressedKeyB();
          processRecognitionResult(result);
          break;
        case "F":
          result = PressedKeyF();
          processRecognitionResult(result);
          break;
        default:
          break;
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [processRecognitionResult]);

  return (
    <>
    </>
  );
}

