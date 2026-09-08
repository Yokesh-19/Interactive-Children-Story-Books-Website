import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { useRegisterMutation } from '@/features/auth/authApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    const { confirmPassword, ...payload } = data;
    try {
      await registerUser(payload).unwrap();
      toast.success('Account created! Welcome aboard 🚀');
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || 'Could not create account');
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-card">
      <Typography variant="h2" className="mb-1">
        Join StoryLand! 🌟
      </Typography>
      <Typography variant="body" className="mb-6">
        Create an account and start the adventure.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          placeholder="Your name"
          leftIcon={<Icon name="User" size={18} />}
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Icon name="Mail" size={18} />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email',
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Icon name="Lock" size={18} />}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
          })}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Icon name="Lock" size={18} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === password || 'Passwords do not match',
          })}
        />

        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>

      <p className="mt-6 text-center font-body text-ink/60">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}