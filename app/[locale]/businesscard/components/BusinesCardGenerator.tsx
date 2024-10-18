'use client';

import React from 'react';
import { Grid2, Paper, Typography, Box, Divider } from '@mui/material';
import { Button } from '@/components/ui/button';
import BusinessCard from '@/app/[locale]/businesscard/components/BusinessCard';
import { useBusinessCardPreview } from '@/app/[locale]/businesscard/useBusinessCard';
import BusinessCardForm from '@/app/[locale]/businesscard/components/BusinessCardForm';
import { useBusinessCardActions } from '@/app/[locale]/businesscard/useBusinessCardActions';
import { BlueTemplate, GreenTemplate, PurpleTemplate } from '@/app/[locale]/businesscard/components/CardTemplates';

export default function BusinessCardGenerator() {
  const { cardData, shortlink, handleSubmit } = useBusinessCardPreview();
  const { handleSave, handleDownloadPDF } = useBusinessCardActions(cardData);

  return (
    <Grid2 container spacing={4} padding={4}>
      {/* Left side - Form */}
      <Grid2 item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Generate Your Business Card
          </Typography>
          <BusinessCardForm onSubmit={handleSubmit} />
        </Paper>
      </Grid2>

      {/* Right side - Preview */}
      <Grid2 item xs={12} md={6}>
        <div className="space-y-6">
          {/* Live Preview Section */}
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              Live Preview
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {cardData ? (
              <Box className="mx-auto max-w-md">
                {cardData.template === '1' && <BlueTemplate data={cardData} />}
                {cardData.template === '2' && <GreenTemplate data={cardData} />}
                {cardData.template === '3' && <PurpleTemplate data={cardData} />}
              </Box>
            ) : (
              <Typography variant="body1">
                Fill out the form to see a live preview.
              </Typography>
            )}
          </Paper>

          {/* Final Preview Section */}
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              Final Preview
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {cardData && (
              <div className="rounded-lg bg-white p-4 shadow-md">
                <BusinessCard data={cardData} />
              </div>
            )}

            {shortlink && (
              <Box className="rounded-lg bg-blue-50 p-4" sx={{ marginTop: 2 }}>
                <Typography variant="body2">
                  Shortlink:{' '}
                  <a href={shortlink} className="text-blue-600 hover:underline">
                    {shortlink}
                  </a>
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
              <Button onClick={handleSave} disabled={!cardData}>
                Save Card
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={!cardData}
                variant="outline"
              >
                Download PDF
              </Button>
            </Box>
          </Paper>
        </div>
      </Grid2>
    </Grid2>
  );
}
