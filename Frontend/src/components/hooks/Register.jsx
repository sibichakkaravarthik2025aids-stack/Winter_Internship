import { useState } from 'react';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
});

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value
        }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: undefined
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            const nextErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0];
                if (typeof field === 'string' && !nextErrors[field]) {
                    nextErrors[field] = issue.message;
                }
            }
            setErrors(nextErrors);
            return;
        }

        setErrors({});
    };

  return (
    <section className="register-section">
        <h1>Register form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="register-name">Name:</label>
          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'register-name-error' : undefined}
          />
          {errors.name && <span id="register-name-error" role="alert">{errors.name}</span>}
          <label htmlFor="register-email">Email:</label>
          <input
            id="register-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
          />
          {errors.email && <span id="register-email-error" role="alert">{errors.email}</span>}
          <label htmlFor="register-password">Password:</label>
          <input
            id="register-password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'register-password-error' : undefined}
          />
          {errors.password && <span id="register-password-error" role="alert">{errors.password}</span>}
          <button type="submit" className="button button-primary">Submit</button>
        </form>
    </section>
  );
};

export default Register;