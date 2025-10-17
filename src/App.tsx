// ============================================
// FILE: src/App.tsx
// Main application component with Tailwind CSS
// ============================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TemplateSelector } from './components/TemplateSelector';
import { FormField } from './components/FormField';
import { PreviewPanel } from './components/PreviewPanel';
import { ExportButton } from './components/ExportButton';
import { Footer } from './components/Footer';
import { getTemplate } from './templates/registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';

function App() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('mfn');

  const template = getTemplate(selectedTemplateId);

  const {
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: template?.config.schema ? zodResolver(template.config.schema) : undefined,
    defaultValues: template?.config.defaultValues || {},
    mode: 'onChange',
  });

  // Watch all form values for live preview
  const formData = watch();

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const newTemplate = getTemplate(templateId);
    if (newTemplate) {
      reset(newTemplate.config.defaultValues);
    }
  };

  if (!template) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Template niet gevonden</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-gray-900">
            📋 Mediation Overeenkomst Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Professionele mediationovereenkomsten in enkele minuten
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto p-6 flex-grow">
        <TemplateSelector
          selectedTemplateId={selectedTemplateId}
          onSelectTemplate={handleTemplateChange}
        />

        <div className="grid grid-cols-[400px_1fr] gap-6">
          {/* Left Panel - Form */}
          <Card className="max-h-[calc(100vh-240px)] overflow-y-auto">
            <CardHeader>
              <CardTitle>Formulier</CardTitle>
              <CardDescription>
                Vul de gegevens in. De preview wordt live bijgewerkt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                {template.config.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <div key={section.id} className="mb-8">
                      <h3
                        className="text-base font-bold mb-4 pb-2 border-b-2"
                        style={{
                          color: template.config.metadata.color,
                          borderColor: template.config.metadata.color,
                        }}
                      >
                        {section.title}
                      </h3>
                      {section.fields.map((field) => (
                        <FormField
                          key={field.id}
                          field={field}
                          control={control}
                          errors={errors}
                          watch={watch}
                        />
                      ))}
                    </div>
                  ))}
              </form>

              <Separator className="my-6" />

              <ExportButton
                templateId={selectedTemplateId}
                formData={formData}
                templateName={template.config.metadata.name}
              />
            </CardContent>
          </Card>

          {/* Right Panel - Preview */}
          <div className="preview-container bg-gray-200 rounded-lg p-6 shadow max-h-[calc(100vh-240px)] overflow-y-auto scroll-smooth">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Preview</h2>
              <p className="text-sm text-gray-600">
                Live voorbeeld van je document
              </p>
            </div>

            <PreviewPanel templateId={selectedTemplateId} formData={formData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
