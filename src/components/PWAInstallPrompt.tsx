
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Download } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        toast.success('You are back online!');
      } else {
        toast.warning('You are offline. Some features may be limited.');
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    const beforeInstallPromptHandler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    await installPrompt.prompt();
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
      toast.success('Thank you for installing Book Buddy!');
    } else {
      console.log('User dismissed the PWA install prompt');
    }
    
    setInstallPrompt(null);
  };

  // Don't show if already installed (detected by display-mode: standalone)
  const isInStandaloneMode = () => 
    window.matchMedia('(display-mode: standalone)').matches || 
    (window.navigator as any).standalone === true;

  if (!installPrompt || isInStandaloneMode()) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={handleInstallClick}
        className="bg-gold hover:bg-gold/90 text-white shadow-lg"
      >
        <Download className="mr-2 h-4 w-4" />
        Install App
      </Button>
    </div>
  );
};

export default PWAInstallPrompt;
