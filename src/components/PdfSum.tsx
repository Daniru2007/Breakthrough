import React, { useState } from 'react';
import { FileUpload } from './PdfSummary/components/FileUpload';
import { Analysis } from './PdfSummary/components/Analysis';
import { analyzePaper } from './PdfSummary/lib/gemini';
import { Header } from './PdfSummary/components/Header';
import { ErrorMessage } from './PdfSummary/components/ErrorMessage';
import { useFileAnalysis } from './PdfSummary/hooks/useFileAnalysis';
import "./PdfSum.css"

export function PdfSum() {
  const {
    loading,
    analysis,
    error,
    handleFileSelect
  } = useFileAnalysis();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Header />
        {error && <ErrorMessage message={error} />}
        <div className="mb-12">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>
        <Analysis loading={loading} analysis={analysis} />
      </div>
    </div>
  );
}