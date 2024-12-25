import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative overflow-hidden
        bg-white rounded-3xl p-10
        border-4 border-dashed border-[#2ECB46] 
        cursor-pointer transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        ${isDragActive ? 'border-opacity-100 bg-green-50' : 'border-opacity-50'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#2ECB46] opacity-10 rounded-full" />
          <Upload className={`
            w-16 h-16 text-[#2ECB46] animate-float
            ${isDragActive ? 'scale-110' : 'scale-100'}
            transition-transform duration-200
          `} />
        </div>
        {isDragActive ? (
          <div className="animate-scale-in">
            <p className="text-xl font-bold text-[#2ECB46] mb-2">Drop it right here!</p>
            <p className="text-gray-500">Let's analyze your paper</p>
          </div>
        ) : (
          <div className="text-center animate-scale-in">
            <p className="text-xl font-bold text-gray-700 mb-2">Upload Your Paper</p>
            <p className="text-gray-500 mb-4">Drag & drop or click to select</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <ImageIcon size={16} />
              <span>JPEG, PNG supported</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}