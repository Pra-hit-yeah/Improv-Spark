import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Maximize2, AlertCircle, UploadCloud } from "lucide-react";
import { useStore } from "@/lib/store";

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

interface ScreenshotGalleryProps {
  images?: Screenshot[];
  testId?: string;
}

export function ScreenshotGallery({ images = [], testId = "screenshot-gallery" }: ScreenshotGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<Screenshot | null>(null);
  const { testerBypassEnabled } = useStore();

  const hasImages = images.length > 0;

  if (!hasImages) {
    return (
      <Card className="border-dashed border-2 border-muted bg-muted/10 shadow-none" data-testid={`${testId}-empty`}>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Image className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Screenshots coming soon</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Visuals for this section are being prepared. Check back later for high-fidelity mockups.
            </p>
          </div>

          {/* Dev/Tester Only Hint */}
          {testerBypassEnabled && (
            <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 max-w-sm text-left flex gap-3">
              <UploadCloud className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Dev / Tester Hint</p>
                <p className="text-xs text-yellow-700/80">
                  To add screenshots: Upload images to <code>/client/public/case-study/</code> and update the page config to pass them into this <code>ScreenshotGallery</code> component.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid={testId}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative cursor-zoom-in rounded-xl border border-border bg-muted/10 overflow-hidden aspect-[4/3] hover:border-primary/50 transition-colors"
            onClick={() => setSelectedImage(img)}
            data-testid={`${testId}-item-${idx}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm">
                <Maximize2 className="w-3 h-3" />
                View
              </div>
            </div>
            {/* Caption Strip */}
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-white/10 p-3">
                <p className="text-xs font-medium text-foreground truncate">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-1 bg-transparent border-none shadow-none sm:rounded-none">
          <DialogHeader className="sr-only">
             <DialogTitle>Screenshot View</DialogTitle>
             <DialogDescription>{selectedImage?.alt}</DialogDescription>
          </DialogHeader>
          
          {selectedImage && (
            <div className="relative rounded-lg overflow-hidden bg-background shadow-2xl ring-1 ring-border">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[85vh] object-contain bg-muted/20"
              />
              {selectedImage.caption && (
                <div className="p-4 bg-background border-t border-border">
                  <p className="text-sm font-medium text-center text-muted-foreground">{selectedImage.caption}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
