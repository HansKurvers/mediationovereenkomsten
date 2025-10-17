// ============================================
// FILE: src/components/FormField.tsx
// Dynamic form field component with auto-scroll preview and focus tracking
// ============================================

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TemplateField } from '../types/template.types';
import { Button } from './ui/button';
import { usePreviewScroll } from '../hooks/usePreviewScroll';

interface FormFieldProps {
  field: TemplateField;
  control: any;
  errors: any;
  watch: any;
}

export const FormField: React.FC<FormFieldProps> = ({ field, control, errors, watch }) => {
  // Track focus state for preview scrolling
  const [isFocused, setIsFocused] = useState(false);

  // Get current field value and trigger scroll on change or focus
  const fieldValue = watch(field.id);
  usePreviewScroll(field.id, fieldValue, isFocused);

  // Focus handlers
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  // Check if field should be displayed based on conditional logic
  if (field.conditional) {
    const watchedValue = watch(field.conditional.field);

    // Special handling for array values (checkbox groups)
    if (Array.isArray(watchedValue)) {
      if (!watchedValue.includes(field.conditional.value)) {
        return null;
      }
    } else {
      if (watchedValue !== field.conditional.value) {
        return null;
      }
    }
  }

  const error = errors[field.id];

  const baseInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: error ? '2px solid #ef4444' : '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '14px' }}>
        {field.label}
        {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </label>

      {field.helpText && (
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px', fontStyle: 'italic' }}>
          {field.helpText}
        </p>
      )}

      <Controller
        name={field.id}
        control={control}
        defaultValue={field.defaultValue || ''}
        render={({ field: controllerField }) => {
          switch (field.type) {
            case 'multiselect':
              // Multi-select dropdown or checkbox group
              const currentMultiValues = Array.isArray(controllerField.value) ? controllerField.value : [];
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onFocus={handleFocus} onBlur={handleBlur} tabIndex={-1}>
                  {field.options?.map((option) => {
                    const isChecked = currentMultiValues.includes(option.value);
                    return (
                      <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              controllerField.onChange([...currentMultiValues, option.value]);
                            } else {
                              controllerField.onChange(currentMultiValues.filter((v: string) => v !== option.value));
                            }
                          }}
                          style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px' }}>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              );

            case 'text':
              return (
                <input
                  type="text"
                  {...controllerField}
                  placeholder={field.placeholder}
                  style={baseInputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              );

            case 'date':
              return (
                <input
                  type="date"
                  {...controllerField}
                  style={baseInputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              );

            case 'number':
              return (
                <input
                  type="number"
                  {...controllerField}
                  placeholder={field.placeholder}
                  style={baseInputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              );

            case 'textarea':
              return (
                <textarea
                  {...controllerField}
                  placeholder={field.placeholder}
                  rows={4}
                  style={{ ...baseInputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              );

            case 'select':
              return (
                <select
                  {...controllerField}
                  style={{ ...baseInputStyle, cursor: 'pointer' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option value="">-- Selecteer --</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );

            case 'checkbox':
              // Multi-checkbox group when options are provided
              if (field.options && field.options.length > 0) {
                const currentValues = Array.isArray(controllerField.value) ? controllerField.value : [];

                // Get all selectable options (exclude "anders" from the all-select logic)
                const selectableOptions = field.options.filter(opt => opt.value !== 'anders');
                const selectableValues = selectableOptions.map(opt => opt.value);

                // Check if all selectable items are selected
                const allSelected = selectableValues.every(val => currentValues.includes(val));

                const handleToggleAll = () => {
                  if (allSelected) {
                    // Deselect all
                    controllerField.onChange([]);
                  } else {
                    // Select all selectable items (excluding "anders")
                    controllerField.onChange(selectableValues);
                  }
                };

                return (
                  <div onFocus={handleFocus} onBlur={handleBlur} tabIndex={-1}>
                    <div style={{ marginBottom: '12px' }}>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleToggleAll}
                      >
                        {allSelected ? 'Alles deselecteren' : 'Alles selecteren'}
                      </Button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      {field.options.map((option) => {
                        const isChecked = currentValues.includes(option.value);
                        return (
                          <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  controllerField.onChange([...currentValues, option.value]);
                                } else {
                                  controllerField.onChange(currentValues.filter((v: string) => v !== option.value));
                                }
                              }}
                              style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '14px' }}>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Single checkbox when no options
              return (
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={controllerField.value || false}
                    onChange={(e) => controllerField.onChange(e.target.checked)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '14px' }}>{field.label}</span>
                </label>
              );

            case 'radio':
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onFocus={handleFocus} onBlur={handleBlur} tabIndex={-1}>
                  {field.options?.map((option) => (
                    <label key={option.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value={option.value}
                        checked={controllerField.value === option.value}
                        onChange={() => controllerField.onChange(option.value)}
                        style={{ width: '16px', height: '16px', marginRight: '8px', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '14px' }}>{option.label}</span>
                    </label>
                  ))}
                </div>
              );

            default:
              return <div>Unsupported field type: {field.type}</div>;
          }
        }}
      />

      {error && (
        <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
          {error.message}
        </p>
      )}
    </div>
  );
};
