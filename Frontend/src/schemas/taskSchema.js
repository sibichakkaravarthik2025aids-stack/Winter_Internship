import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(3, 'Add a title with at least 3 characters.').max(80, 'Keep the title under 80 characters.'),
  description: z.string().trim().max(280, 'Keep the description under 280 characters.'),
  priority: z.enum(['Low', 'Medium', 'High']),
  dueDate: z.string().refine((value) => {
    if (value === '') return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Choose a valid date.'),
}).strict();
