import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function PhotoCarousel() {
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1562910859-be83f1df7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwdGVjaCUyMHdvcmtzaG9wJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM4NjY3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Workshop: Introduction to AI",
    },
    {
      url: "https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN0dWRlbnRzJTIwY29kaW5nJTIwaGFja2F0aG9uJTIwZ3JvdXB8ZW58MXx8fHwxNzczODY2NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Annual Hackathon 2025",
    },
    {
      url: "https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGFpJTIwd29ya3Nob3AlMjBsYXB0b3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Building with Claude API",
    },
    {
      url: "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2x1YiUyMHRlYW0lMjBwaG90byUyMGRpdmVyc2UlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4NjY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "CBC Team Meetup",
    },
    {
      url: "https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMHNjcmVlbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc3Mzg2Njc1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Tech Talk: AI in Education",
    },
    {
      url: "https://images.unsplash.com/photo-1560651921-19590b2b7ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwdG9nZXRoZXIlMjBuaWdodHxlbnwxfHx8fDE3NzM4NjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Late Night Coding Session",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings} className="overflow-hidden">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <div className="relative h-[500px] md:h-[600px] w-full">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-10"></div>
              
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
                <div className="max-w-7xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {photo.caption}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom styling for slick dots */}
      <style>{`
        .slick-dots {
          bottom: 25px;
        }
        .slick-dots li button:before {
          color: #D97757;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #D97757;
        }
      `}</style>
    </div>
  );
}
