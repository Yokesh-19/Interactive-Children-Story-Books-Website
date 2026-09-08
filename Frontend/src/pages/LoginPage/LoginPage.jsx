import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { useLoginMutation } from '@/features/auth/authApi';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      toast.success('Welcome back! 🎉');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-card">
      <Typography variant="h2" className="mb-1">
        Welcome back! 👋
      </Typography>
      <Typography variant="body" className="mb-6">
        Log in to continue your story adventures.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <p className="mt-6 text-center font-body text-ink/60">
        New to StoryLand?{' '}
        <Link to="/register" className="font-semibold text-primary-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}