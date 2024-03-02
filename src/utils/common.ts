export function capitalizeFirstLetter(data: string) {
  return data.charAt(0).toUpperCase() + data.slice(1);
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result;
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file as string"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};
