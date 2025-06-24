
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Bot, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao AdvSmart AI.",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-dark-bg relative overflow-hidden flex items-center justify-center">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark-bg to-black" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-full bg-primary/10 blur-[80px] animate-pulse" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[80vh] rounded-t-full bg-primary/15 blur-[60px] opacity-60" 
           style={{ animation: 'float 8s ease-in-out infinite' }} />
      
      {/* Floating light spots */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse opacity-40" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] opacity-40" 
           style={{ animation: 'float 6s ease-in-out infinite reverse' }} />

      {/* Main login card */}
      <div className="w-full max-w-md relative z-10 transform transition-all duration-700 hover:scale-105"
           style={{ perspective: '1000px' }}>
        <div className="relative group">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Traveling light borders */}
          <div className="absolute -inset-0.5 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-pulse"
                 style={{ animation: 'travel-horizontal 3s ease-in-out infinite' }} />
            <div className="absolute top-0 right-0 w-0.5 h-1/2 bg-gradient-to-b from-transparent via-primary/60 to-transparent"
                 style={{ animation: 'travel-vertical 3s ease-in-out infinite 0.75s' }} />
            <div className="absolute bottom-0 right-0 h-0.5 w-1/2 bg-gradient-to-l from-transparent via-primary/60 to-transparent"
                 style={{ animation: 'travel-horizontal 3s ease-in-out infinite 1.5s' }} />
            <div className="absolute bottom-0 left-0 w-0.5 h-1/2 bg-gradient-to-t from-transparent via-primary/60 to-transparent"
                 style={{ animation: 'travel-vertical 3s ease-in-out infinite 2.25s' }} />
          </div>

          {/* Glass card */}
          <Card className="relative bg-dark-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl overflow-hidden">
            {/* Inner pattern overlay */}
            <div className="absolute inset-0 opacity-5" 
                 style={{
                   backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                   backgroundSize: '20px 20px'
                 }} />

            <CardHeader className="text-center relative z-10 space-y-4">
              {/* Logo */}
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 border border-primary/30 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <Bot size={24} className="text-primary" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>

              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                  AdvSmart AI
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Faça login para acessar sua conta
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
                  <div className={`relative group transition-all duration-300 ${focusedInput === 'email' ? 'scale-105' : ''}`}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <Mail size={16} className={`absolute left-3 transition-colors duration-300 ${
                        focusedInput === 'email' ? 'text-primary' : 'text-gray-400'
                      }`} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 bg-white/5 border-primary/20 text-white placeholder:text-gray-400 focus:border-primary focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 text-sm">Senha</Label>
                  <div className={`relative group transition-all duration-300 ${focusedInput === 'password' ? 'scale-105' : ''}`}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <Lock size={16} className={`absolute left-3 transition-colors duration-300 ${
                        focusedInput === 'password' ? 'text-primary' : 'text-gray-400'
                      }`} />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 pr-10 bg-white/5 border-primary/20 text-white placeholder:text-gray-400 focus:border-primary focus:bg-white/10 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-400 hover:text-primary transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center space-x-2 pt-2">
                  <div className="relative">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="appearance-none h-4 w-4 rounded border border-primary/30 bg-white/5 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
                    />
                    {rememberMe && (
                      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                  <Label htmlFor="remember-me" className="text-sm text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
                    Lembrar de mim
                  </Label>
                </div>

                {/* Login button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={isLoading}
                  style={{ animation: isLoading ? 'pulse 2s infinite' : 'none' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Entrando...
                    </div>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
              
              {/* Test users info */}
              <div className="mt-8 p-4 bg-dark-surface/50 rounded-lg border border-primary/10 backdrop-blur-sm">
                <p className="text-gray-400 text-sm mb-2 font-medium">Usuários de teste:</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Admin:</span>
                    <span className="text-gray-400">ricardo@advsmart.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Advogado:</span>
                    <span className="text-gray-400">camila@advsmart.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estagiário:</span>
                    <span className="text-gray-400">joao@advsmart.com</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-primary/10 text-center">
                    <span className="font-medium text-primary">Senha para todos: 123456</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes travel-horizontal {
          0% { left: -50%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        @keyframes travel-vertical {
          0% { top: -50%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Login;
