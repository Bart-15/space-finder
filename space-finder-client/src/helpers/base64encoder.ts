export const base64encode = (file: File) =>
  new Promise((resolve) => {
    let baseUrl;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      baseUrl = reader.result;
      resolve(baseUrl);
    };
  });
