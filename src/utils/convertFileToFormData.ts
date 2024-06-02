/* Type Guard */
function validateFile(value: unknown): value is File {
  return value instanceof File;
}

/* Convert File to FormData || convert File[] to FormData[] */
function convertFileToFormData(value: File): FormData;
function convertFileToFormData(value: File[]): FormData[];
function convertFileToFormData(value: File | File[]): FormData | FormData[] {
  const isFile = validateFile(value);
  const isFileList = Array.isArray(value) && value.every(validateFile);

  if (isFile) {
    const formData = new FormData();
    formData.append("file", value);

    return formData;
  }

  if (isFileList) {
    return value.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return formData;
    });
  }

  throw new Error("Invalid input: expected File or File[]");
}

export default convertFileToFormData;
