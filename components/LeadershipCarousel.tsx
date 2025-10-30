'use client';

import useEmblaCarousel from 'embla-carousel-react';

const leadershipData = [
  {
    id: 1,
      name: "Nike Oye, MBA",
      role: "Director of Global Health Partnerships",
      image: "/m1.png",
      bio: "Coordinates strategic alliances with regional and international stakeholders to accelerate innovation in equitable health delivery. Her work focuses on sustaining multilateral partnerships, facilitating technical cooperation, and expanding the Foundation’s reach across emerging and established health ecosystems."
  },
  {
    id: 2,
    name: "Anthony Abraham, MSC",
    role: "Director of Global Affairs",
    image: "/m2.png",
    bio: "Leads the Foundation’s cross-border policy and institutional relations, building collaborative pathways between public-health entities, academic networks, and development partners. Anthony structures global alignment for SozoRock’s equity initiatives, ensuring that pilot models transition into scalable frameworks adaptable across international health systems."
  },
  {
    id: 3,
    name: "Jordan Hare, BSN, RN",
    role: "Director of Health Education",
    image: "/m3.png",
    bio: "Guides the Foundation’s education and community strategies that advance literacy, prevention, and trust within rural populations. Jordan’s work centers on creating evidence-based engagement models that empower communities to adopt healthier behaviors and strengthen continuity of care. She plays a central role in developing Access Day as a participatory model for community learning and workforce mentorship."
  },
  {
    id: 4,
    name: "Oluwabiyi Adeyemo, MBA",
    role: "Director of Strategic Initiatives",
    image: "/m4.png",
    bio: "Designs and leads the Foundations strategic architecture for measurable rural-equity impact. His work integrates research, policy, and technology through initiatives such as the Rural Equity Blueprint Series (REBS), Access Day, and the Library Health Equity Hub. Olus approach aligns data governance, workforce renewal, and policy readiness to strengthen the evidence base for sustainable health access across underserved regions."
  }
];

export default function LeadershipCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 4 }
    }
  });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {leadershipData.map((member) => (
            <div
              key={member.id}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(25%-12px)]"
            >
              <div className="h-full border-none">
                  <div className="aspect-square bg-gray-200 rounded-[20px] mb-4 overflow-hidden">
                      <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ETeam%3C/text%3E%3C/svg%3E';
                          }}
                      />
                  </div>
                <div className="px-4">
                    <p className="text-xs mb-2">{member.role}</p>
                    <h3 className="text-base font-medium mb-4">{member.name}</h3>
                  <span className="text-sm">{member.bio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
