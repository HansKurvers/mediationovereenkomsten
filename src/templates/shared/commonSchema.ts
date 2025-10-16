// ============================================
// FILE: src/templates/shared/commonSchema.ts
// Shared Zod validation schemas
// ============================================

import { z } from 'zod';

export const commonSchemas = {
  naam: z.string().min(2, 'Naam moet minimaal 2 karakters bevatten'),
  adres: z.string().min(5, 'Adres moet minimaal 5 karakters bevatten'),
  datum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ongeldige datum'),
  getal: z.string().regex(/^\d+$/, 'Moet een getal zijn'),
  percentage: z.string().regex(/^\d+$/, 'Moet een getal zijn').refine(
    val => parseInt(val) >= 0 && parseInt(val) <= 100,
    'Moet tussen 0 en 100 zijn'
  ),
  bedrag: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Moet een geldig bedrag zijn'),
};
