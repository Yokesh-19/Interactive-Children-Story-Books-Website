import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Avatar from '@/components/atoms/Avatar';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import Badge from '@/components/atoms/Badge';
import { selectCurrentUser, updateUser } from '@/features/auth/authSlice';
import { useUpdateProfileMutation } from '@/features/auth/authApi';

export default function ProfilePage() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const onSubmit = async (data) => {
    try {
      const updated = await updateProfile(data).unwrap();
      dispatch(updateUser(updated));
      toast.success('Profile updated! ✨');
    } catch (err) {
      toast.error(err?.data?.message || 'Could not update profile');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Typography variant="h2" className="mb-6">
        My Profile 👤
      </Typography>

      {/* Profile card */}
      <div className="mb-6 flex items-center gap-5 rounded-3xl bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white shadow-card">
        <Avatar name={user?.name} src={user?.avatar} size="xl" />
        <div>
          <Typography variant="h3" className="!text-white">
            {user?.name}
          </Typography>
          <p className="font-body text-white/80">{user?.email}</p>
          <Badge variant="secondary" className="mt-2">
            <Icon name="Sparkles" size={14} /> Story Explorer
          </Badge>
        </div>
      </div>

      {/* Edit form */}
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <Typography variant="h4" className="mb-4">
          Edit Details
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            leftIcon={<Icon name="User" size={18} />}
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input
            label="Email"
            type="email"
            leftIcon={<Icon name="Mail" size={18} />}
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Button type="submit" disabled={isLoading || !isDirty}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  );
}