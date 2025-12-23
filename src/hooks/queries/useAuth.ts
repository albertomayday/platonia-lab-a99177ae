/**
 * Authentication React Query Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, type SignUpRequest, type SignInRequest, type PasswordResetRequest, type UpdatePasswordRequest, type UpdateProfileRequest } from '@/services/api/auth.service';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

/**
 * Query keys for auth
 */
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Hook to get current session
 */
export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const response = await authService.getSession();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const response = await authService.getCurrentUser();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

/**
 * Hook to sign up a new user
 */
export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (request: SignUpRequest) => {
      const response = await authService.signUp(request);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      // Update cache with new session and user
      queryClient.setQueryData(authKeys.session(), data.session);
      queryClient.setQueryData(authKeys.user(), data.user);
      
      toast({
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada exitosamente. Bienvenido a Platonia Lab.',
      });
      
      navigate('/laboratorio');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error al crear cuenta',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to sign in an existing user
 */
export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (request: SignInRequest) => {
      const response = await authService.signIn(request);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      // Update cache with new session and user
      queryClient.setQueryData(authKeys.session(), data.session);
      queryClient.setQueryData(authKeys.user(), data.user);
      
      toast({
        title: '¡Bienvenido!',
        description: 'Sesión iniciada correctamente.',
      });
      
      navigate('/laboratorio');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to sign out the current user
 */
export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await authService.signOut();
      if (response.error) {
        throw new Error(response.error);
      }
    },
    onSuccess: () => {
      // Clear all auth cache
      queryClient.removeQueries({ queryKey: authKeys.all });
      
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente.',
      });
      
      navigate('/auth');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error al cerrar sesión',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to request password reset
 */
export function usePasswordReset() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (request: PasswordResetRequest) => {
      const response = await authService.requestPasswordReset(request);
      if (response.error) {
        throw new Error(response.error);
      }
    },
    onSuccess: () => {
      toast({
        title: 'Email enviado',
        description: 'Revisa tu email para restablecer tu contraseña.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to update password
 */
export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (request: UpdatePasswordRequest) => {
      const response = await authService.updatePassword(request);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user(), data);
      
      toast({
        title: 'Contraseña actualizada',
        description: 'Tu contraseña ha sido actualizada correctamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (request: UpdateProfileRequest) => {
      const response = await authService.updateProfile(request);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user(), data);
      
      toast({
        title: 'Perfil actualizado',
        description: 'Tu perfil ha sido actualizado correctamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook to refresh session
 */
export function useRefreshSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await authService.refreshSession();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.session(), data);
    },
  });
}
