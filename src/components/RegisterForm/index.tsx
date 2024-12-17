import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser, mailRegex } from '../../services/Registration';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    banner: '',
    venueManager: false,
  });

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    avatarError: '',
    bannerError: '',
  });

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      nameError: '',
      emailError: '',
      passwordError: '',
      avatarError: '',
      bannerError: '',
    });

    let isFormValid = true;

    if (!formData.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError: 'Name is required',
      }));
      isFormValid = false;
    }

    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Email is required',
      }));
      isFormValid = false;
    } else if (!mailRegex.test(formData.email.trim().toLocaleLowerCase())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Email must be a valid stud.noroff.no email',
      }));
      isFormValid = false;
    }

    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Password is required',
      }));
      isFormValid = false;
    } else if (formData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Password must be at least 8 characters',
      }));
      isFormValid = false;
    }

    if (!formData.avatar) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatarError: 'Avatar is required',
      }));
      isFormValid = false;
    }

    if (!formData.banner) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        bannerError: 'Banner is required',
      }));
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        const registerData = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          bio: '',
          avatar: { url: formData.avatar, alt: '' },
          banner: { url: formData.banner, alt: '' },
          venueManager: formData.venueManager,
        };

        const result = await RegisterUser(registerData);

        if (result) {
          console.log('Register response:', result);

          alert('Registration successful');
          navigate('/login');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed');
      }
    }
  };

  return (
    <form
      className="mx-auto mt-12 flex w-11/12 max-w-xs flex-col"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleInput}
        name="name"
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {errors.nameError && (
        <p className="text-xs text-red-500">{errors.nameError}</p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInput}
        name="email"
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {errors.emailError && (
        <p className="text-xs text-red-500">{errors.emailError}</p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInput}
        name="password"
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {errors.passwordError && (
        <p className="text-xs text-red-500">{errors.passwordError}</p>
      )}
      <input
        type="text"
        placeholder="Avatar"
        value={formData.avatar}
        onChange={handleInput}
        name="avatar"
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {errors.avatarError && (
        <p className="text-xs text-red-500">{errors.avatarError}</p>
      )}
      <input
        type="text"
        placeholder="Banner"
        value={formData.banner}
        onChange={handleInput}
        name="banner"
        className="mb-2 rounded border border-gray-300 p-2"
      />
      {errors.bannerError && (
        <p className="text-xs text-red-500">{errors.bannerError}</p>
      )}

      <label className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleInput}
          className="mr-2"
        />
        <span>Register as Venue Manager</span>
      </label>
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
