import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ShareButton({ 
  title, 
  text, 
  url,
  variant = "outline",
  size = "sm",
  className
}: ShareButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title || document.title,
      text: text || "Check out this update from Quick-Wit!",
      url: url || window.location.href,
    };

    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.warn("Share failed or canceled:", err);
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast({
          description: "Link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
       console.error("Failed to copy:", err);
       toast({
        variant: "destructive",
        description: "Failed to copy link",
       });
    }
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleShare}>
      {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
      {copied ? "Copied" : "Share"}
    </Button>
  );
}
