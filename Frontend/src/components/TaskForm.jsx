import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { taskSchema } from '../schemas/taskSchema.js';

const initialValues = { title: '', description: '', priority: 'Medium', dueDate: '' };

function TaskForm({ onClose, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined, form: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = taskSchema.safeParse(values);
    if (!result.success) {
      const nextErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string' && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }
    onSubmit(result.data);
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">MAKE IT HAPPEN</p>
            <h2 id="task-modal-title">Create a new task</h2>
            <p className="modal-description">A clear next step makes all the difference.</p>
          </div>
          <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close dialog">
            <Icon name="close" size={19} />
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <label className="form-field" htmlFor="task-title">
            <span>Task name <span className="required-mark">*</span></span>
            <input
              autoFocus
              aria-describedby={errors.title ? 'task-title-error' : undefined}
              aria-invalid={Boolean(errors.title)}
              id="task-title"
              maxLength={80}
              name="title"
              onChange={updateField}
              placeholder="e.g. Plan the next team offsite"
              value={values.title}
            />
            {errors.title && <span className="field-error" id="task-title-error">{errors.title}</span>}
          </label>

          <label className="form-field" htmlFor="task-description">
            <span>Description <span className="optional-label">Optional</span></span>
            <textarea
              aria-describedby={errors.description ? 'task-description-error' : undefined}
              aria-invalid={Boolean(errors.description)}
              id="task-description"
              maxLength={280}
              name="description"
              onChange={updateField}
              placeholder="Add a little more context..."
              rows={3}
              value={values.description}
            />
            {errors.description && <span className="field-error" id="task-description-error">{errors.description}</span>}
          </label>

          <div className="form-row">
            <label className="form-field" htmlFor="task-priority">
              <span>Priority</span>
              <select id="task-priority" name="priority" onChange={updateField} value={values.priority}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label className="form-field" htmlFor="task-due-date">
              <span>Due date <span className="optional-label">Optional</span></span>
              <input
                aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
                aria-invalid={Boolean(errors.dueDate)}
                id="task-due-date"
                name="dueDate"
                onChange={updateField}
                type="date"
                value={values.dueDate}
              />
              {errors.dueDate && <span className="field-error" id="task-due-date-error">{errors.dueDate}</span>}
            </label>
          </div>
          <div className="form-footer">
            <span className="form-hint"><span className="required-mark">*</span> Required</span>
            <div className="form-actions">
              <button className="button button-quiet" onClick={onClose} type="button">Cancel</button>
              <button className="button button-primary" type="submit"><Icon name="plus" size={16} />Create task</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskForm;
