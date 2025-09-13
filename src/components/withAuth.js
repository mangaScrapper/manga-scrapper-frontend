import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Kullanıcı giriş yapmamışsa null döndür (yönlendirme useEffect'te yapılacak)
    if (!user) {
      return null;
    }

    // Kullanıcı giriş yapmışsa bileşeni render et
    return <Component {...props} />;
  };
}