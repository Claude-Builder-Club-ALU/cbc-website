import Slider from "react-slick";
import { Quote } from "lucide-react";

export function TestimonialCarousel() {
  const testimonials = [
    {
      name: "Amara Okafor",
      role: "Computer Science, Class of 2026",
      content: "CBC has transformed how I think about AI. The hands-on workshops and supportive community helped me build projects I never thought possible.",
      avatar: "https://images.unsplash.com/photo-1742934029147-6f83f681daa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBlbmdpbmVlciUyMHRlY2hub2xvZ3klMjBzbWlsaW5nfGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      name: "Kwame Mensah",
      role: "Entrepreneurship, Class of 2025",
      content: "The Claude Builder Club isn't just a tech club—it's a launchpad. I've connected with amazing people and learned skills that directly apply to my startup.",
      avatar: "https://images.unsplash.com/photo-1596580817363-a4a8f67d4bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      name: "Zara Kimathi",
      role: "Global Challenges, Class of 2027",
      content: "From zero coding experience to building my first AI app in just three months. The CBC community makes technology accessible and exciting for everyone.",
      avatar: "https://images.unsplash.com/photo-1760433403526-47f671997ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudCUyMGxlYWRlciUyMGNvbmZpZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=400",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-4">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 md:p-12">
              <Quote className="text-[#D97757] mb-6" size={40} />
              <p className="text-lg md:text-xl text-[#F5F5F5] mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D97757]"
                />
                <div>
                  <div className="font-semibold text-[#F5F5F5]">{testimonial.name}</div>
                  <div className="text-[#9CA3AF]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom styling for slick dots */}
      <style>{`
        .slick-dots {
          bottom: -40px;
        }
        .slick-dots li button:before {
          color: #D97757;
          opacity: 0.3;
          font-size: 10px;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #D97757;
        }
      `}</style>
    </div>
  );
}
