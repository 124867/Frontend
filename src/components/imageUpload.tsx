import React, { useState } from "react";

interface Props {
  onUpload: (file: File) => void;
}

const ImageUploader: React.FC<Props> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;