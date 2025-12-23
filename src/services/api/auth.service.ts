/**
 * Authentication Service
 * Handles user authentication operations
 */

import { BaseApiClient, ApiResponse } from './base';
import type { User, Session } from '@supabase/supabase-js';

export interface SignUpRequest {
  email: string;
  password: string;
  metadata?: {
    name?: string;
    role?: string;
  };
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

export interface PasswordResetRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  password: string;
}

export interface UpdateProfileRequest {
  email?: string;
  data?: {
    name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
}

class AuthService extends BaseApiClient {
  /**
   * Sign up a new user
   */
  async signUp(request: SignUpRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const supabase = this.getSupabaseClient();
      const redirectUrl = `${window.location.origin}/platonia-lab/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: request.email,
        password: request.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: request.metadata,
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error: error.message };
      }

      if (!data.user || !data.session) {
        return { error: 'No se pudo crear la cuenta. Por favor verifica tu email.' };
      }

      return {
        data: {
          user: data.user,
          session: data.session,
        },
      };
    } catch (e: any) {
      console.error('Sign up exception:', e);
      return { error: e?.message || 'Error al crear cuenta' };
    }
  }

  /**
   * Sign in an existing user
   */
  async signIn(request: SignInRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const supabase = this.getSupabaseClient();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: request.email,
        password: request.password,
      });

      if (error) {
        console.error('Sign in error:', error);
        
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Email o contraseña incorrectos' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: 'Por favor confirma tu email antes de iniciar sesión' };
        }
        
        return { error: error.message };
      }

      if (!data.user || !data.session) {
        return { error: 'No se pudo iniciar sesión' };
      }

      return {
        data: {
          user: data.user,
          session: data.session,
        },
      };
    } catch (e: any) {
      console.error('Sign in exception:', e);
      return { error: e?.message || 'Error al iniciar sesión' };
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<ApiResponse<void>> {
    try {
      const supabase = this.getSupabaseClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Sign out error:', error);
        return { error: error.message };
      }

      return { data: undefined };
    } catch (e: any) {
      console.error('Sign out exception:', e);
      return { error: e?.message || 'Error al cerrar sesión' };
    }
  }

  /**
   * Get the current session
   */
  async getSession(): Promise<ApiResponse<Session>> {
    try {
      const supabase = this.getSupabaseClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Get session error:', error);
        return { error: error.message };
      }

      if (!data.session) {
        return { error: 'No hay sesión activa' };
      }

      return { data: data.session };
    } catch (e: any) {
      console.error('Get session exception:', e);
      return { error: e?.message || 'Error al obtener sesión' };
    }
  }

  /**
   * Get the current user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const supabase = this.getSupabaseClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Get user error:', error);
        return { error: error.message };
      }

      if (!data.user) {
        return { error: 'No hay usuario autenticado' };
      }

      return { data: data.user };
    } catch (e: any) {
      console.error('Get user exception:', e);
      return { error: e?.message || 'Error al obtener usuario' };
    }
  }

  /**
   * Request a password reset email
   */
  async requestPasswordReset(request: PasswordResetRequest): Promise<ApiResponse<void>> {
    try {
      const supabase = this.getSupabaseClient();
      const redirectUrl = `${window.location.origin}/platonia-lab/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(request.email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        console.error('Password reset error:', error);
        return { error: error.message };
      }

      return { data: undefined };
    } catch (e: any) {
      console.error('Password reset exception:', e);
      return { error: e?.message || 'Error al solicitar reset de contraseña' };
    }
  }

  /**
   * Update user password
   */
  async updatePassword(request: UpdatePasswordRequest): Promise<ApiResponse<User>> {
    try {
      const supabase = this.getSupabaseClient();
      
      const { data, error } = await supabase.auth.updateUser({
        password: request.password,
      });

      if (error) {
        console.error('Update password error:', error);
        return { error: error.message };
      }

      if (!data.user) {
        return { error: 'No se pudo actualizar la contraseña' };
      }

      return { data: data.user };
    } catch (e: any) {
      console.error('Update password exception:', e);
      return { error: e?.message || 'Error al actualizar contraseña' };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(request: UpdateProfileRequest): Promise<ApiResponse<User>> {
    try {
      const supabase = this.getSupabaseClient();
      
      const { data, error } = await supabase.auth.updateUser({
        email: request.email,
        data: request.data,
      });

      if (error) {
        console.error('Update profile error:', error);
        return { error: error.message };
      }

      if (!data.user) {
        return { error: 'No se pudo actualizar el perfil' };
      }

      return { data: data.user };
    } catch (e: any) {
      console.error('Update profile exception:', e);
      return { error: e?.message || 'Error al actualizar perfil' };
    }
  }

  /**
   * Refresh the current session
   */
  async refreshSession(): Promise<ApiResponse<Session>> {
    try {
      const supabase = this.getSupabaseClient();
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error('Refresh session error:', error);
        return { error: error.message };
      }

      if (!data.session) {
        return { error: 'No se pudo refrescar la sesión' };
      }

      return { data: data.session };
    } catch (e: any) {
      console.error('Refresh session exception:', e);
      return { error: e?.message || 'Error al refrescar sesión' };
    }
  }
}

export const authService = new AuthService();
