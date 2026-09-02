import { Suspense } from 'react';
import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
