import { useState } from "react";
import { ProjectData } from "./interface";

export const useDataUtils = () => {
  const [error, setError] = useState<string | null>(null);
  
  const saveFile = async (data: ProjectData[] | null, error: string | null): Promise<void> => {
  if (error) {
    setError(error);
  } else {
    setError(error);
    try {
      const response = await fetch('/api/savedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects: data }),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {}
  }
};

  const readFile = async () => {
    try {
      const response = await fetch('/api/readdata');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ProjectData[] = await response.json();
      return { data, error };
    } catch (error) {}
  };
  return { saveFile, readFile };
}
