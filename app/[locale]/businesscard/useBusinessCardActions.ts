import { useCallback } from 'react';
import { FormValuesBC } from './schema';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function useBusinessCardActions(cardData: FormValuesBC | null) {
  const handleSave = useCallback(async () => {
    if (!cardData) return;

    try {
      const response = await fetch('/api/save-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error('Failed to save business card');
      }

      alert('Business card saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save business card. Please try again.');
    }
  }, [cardData]);

  const handleDownloadPDF = useCallback(async () => {
    if (!cardData) return;

    try {
      const cardElement = document.getElementById('business-card-preview');
      if (!cardElement) throw new Error('Business card preview not found');

      // Capture the business card as a canvas, with proper scaling.
      const canvas = await html2canvas(cardElement, { scale: 2 }); // Higher scale for better quality.
      const imgData = canvas.toDataURL('image/png');

      // Create PDF with the same size as the canvas.
      const pdfWidth = canvas.width;
      const pdfHeight = canvas.height;
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight], // Match PDF size to canvas size.
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('business-card.pdf');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to download PDF. Please try again.');
    }
  }, [cardData]);

  return { handleSave, handleDownloadPDF };
}