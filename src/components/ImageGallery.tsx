import { type FC, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-16 shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selected === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 rounded-xl overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={images[selected]}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelected(selected === 0 ? images.length - 1 : selected - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 flex items-center justify-center text-foreground/60 hover:bg-card hover:text-foreground transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setSelected(selected === images.length - 1 ? 0 : selected + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
