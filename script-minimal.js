// Minimal JavaScript for essential functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired - script is running');

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Update copyright year dynamically
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
        
        // Close mobile menu when clicking links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
        
        // Close button in mobile menu
        const closeBtn = mobileMenu.querySelector('[data-close]');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        }
    }
    
    // Navigation background and color switch based on section visibility
    const navbar = document.getElementById('navbar');
    const navLogo = document.getElementById('navLogo');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactBtn = document.querySelector('.premium-button');
    const heroSection = document.getElementById('home'); // Hero section element
    
    if (navbar && heroSection) {
        // Create Intersection Observer to watch hero section
        const navbarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When hero section is NOT intersecting or less than 70% visible (scrolled past it)
                if (!entry.isIntersecting || entry.intersectionRatio < 0.7) {
                    // Apply white navbar styles
                    navbar.classList.add('bg-white', 'shadow-lg');
                    navbar.classList.remove('bg-transparent', 'bg-pspl-dark/95', 'backdrop-blur-lg');
                    
                    // Dark logo
                    if (navLogo) {
                        navLogo.src = 'logo.svg';
                    }
                    
                    // Dark text for nav links
                    navLinks.forEach(link => {
                        link.classList.remove('text-white', 'hover:text-pspl-gold');
                        link.classList.add('text-gray-800', 'hover:text-pspl-red');
                    });
                    
                    // Dark mobile menu button
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('text-white');
                        mobileMenuBtn.classList.add('text-gray-800');
                    }
                    
                    // Update contact button for white background
                    if (contactBtn) {
                        contactBtn.classList.add('shadow-md', 'hover:shadow-lg');
                    }
                } else {
                    // Apply transparent navbar styles (in hero section)
                    navbar.classList.remove('bg-white', 'shadow-lg');
                    navbar.classList.add('bg-transparent');
                    
                    // White logo
                    if (navLogo) {
                        navLogo.src = 'logo-white.svg';
                    }
                    
                    // White text for nav links
                    navLinks.forEach(link => {
                        link.classList.remove('text-gray-800', 'hover:text-pspl-red');
                        link.classList.add('text-white', 'hover:text-pspl-gold');
                    });
                    
                    // White mobile menu button
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('text-gray-800');
                        mobileMenuBtn.classList.add('text-white');
                    }
                    
                    // Remove extra shadow from contact button
                    if (contactBtn) {
                        contactBtn.classList.remove('shadow-md', 'hover:shadow-lg');
                    }
                }
            });
        }, {
            // Trigger when 70% of hero section is visible (more forgiving for 768px screens)
            threshold: [0.7],
            rootMargin: '-60px 0px 0px 0px' // Reduced offset for better responsiveness
        });
        
        // Start observing the hero section
        navbarObserver.observe(heroSection);
    }
    
    // Simple fade-in animation for elements on scroll with performance optimization
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Batch observer callbacks for better performance
    let pendingEntries = [];
    let rafId = null;

    const processEntries = () => {
        pendingEntries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use classes instead of inline styles to avoid overriding hover effects
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
        pendingEntries = [];
        rafId = null;
    };

    const observer = new IntersectionObserver((entries) => {
        pendingEntries.push(...entries);
        if (!rafId) {
            rafId = requestAnimationFrame(processEntries);
        }
    }, observerOptions);

    // Helper function to observe new reveal elements
    function observeRevealElements(elements) {
        elements.forEach(el => {
            if (el.classList.contains('reveal-on-scroll')) {
                // Add initial state class instead of inline styles
                el.classList.add('reveal-hidden');
                observer.observe(el);
            }
        });
    }

    // Observe reveal elements
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        // Add initial state class instead of inline styles
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // Timeline slide animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all slide elements within this timeline item
                const leftElements = entry.target.querySelectorAll('.timeline-slide-left');
                const rightElements = entry.target.querySelectorAll('.timeline-slide-right');

                // Animate left elements
                leftElements.forEach(el => {
                    el.classList.add('timeline-animated');
                });

                // Animate right elements
                rightElements.forEach(el => {
                    el.classList.add('timeline-animated');
                });

                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Simple counter animation with year countdown support
    const counters = document.querySelectorAll('.counter[data-target]');
    const yearCounters = document.querySelectorAll('.year-counter[data-target]');

    // Handle year counter (counts down from current year to 1989)
    const yearCounterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const currentYear = new Date().getFullYear() + 1; // Start from 2026
                const totalSteps = 100; // More steps for smoother animation
                let step = 0;

                counter.textContent = currentYear;

                // Quintic easing function (very slow start, very fast end)
                const easeInQuint = (t) => t * t * t * t * t;

                const timer = setInterval(() => {
                    step++;
                    const progress = step / totalSteps;
                    const easedProgress = easeInQuint(progress);

                    let current = currentYear - (currentYear - target) * easedProgress;

                    if (step >= totalSteps) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 25); // Shorter interval for smoother animation

                yearCounterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    yearCounters.forEach(counter => {
        const currentYear = new Date().getFullYear() + 1; // Start from 2026
        counter.textContent = currentYear;
        yearCounterObserver.observe(counter);
    });

    // Handle regular counters (count up)
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current).toLocaleString();
                }, 30);

                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.textContent = '0';
        counterObserver.observe(counter);
    });

    // Dynamic image discovery function
    function discoverProjectImages(basePath, maxImages = 50) {
        const images = [];

        // Try to discover images by attempting to load them sequentially
        for (let i = 1; i <= maxImages; i++) {
            const imagePath = `${basePath}${i}.webp`;
            images.push(imagePath);
        }

        return images;
    }

    // Function to get actual available images for a project (fallback to known counts)
    function getProjectImages(projectTitle) {
        const knownImageCounts = {
            // Commercial Projects
            'Singapore Land Tower': 4,
            'Capital Tower': 7,
            'An-Nahdhah Mosque Singapore': 10,
            'Marina Bay Financial Tower 3': 10,
            'Massimo Dutti Vivocity Store': 9,
            'Tee International Limited': 6,
            'St Joseph\'s Home Singapore': 4,
            'Healthway at OUE Downtown 2': 10,
            'One Devonshire Condominium': 4,
            'Welcia at Suntec City': 7,
            'Courtyard Singapore Novena': 7,
            'The Clearwater Condominium': 7,

            // Restaurant Projects
            'Odette': 9,
            'Altro Zafferano at Ocean Financial Centre': 10,
            'SPRUCE @ HillV2': 10,
            'Senso Ristorante & Bar': 4,
            'Fu Lin Men Cantonese Dining at Chinese Swimming Club': 3,
            'Marina Bay Sands': 5,

            // Heritage Projects
            'Mount Pleasant Drive': 9,
            'Everitt Road': 6,
            'Club Street': 6,
            'Swettenham Road': 10,

            // Consultation Projects
            'Bukit Timah': 6,
            'The Avenir': 10,
            'Sungei Kadut': 10,
            'Camborne Road': 10,
            'Treasure @ Tampines': 10,
            'Jadescape': 5
        };

        const imageCount = knownImageCounts[projectTitle] || 4;
        const portfolioPathMappings = {
            // Commercial Projects
            'Singapore Land Tower': 'images/portfolio/commercial/singapore-land-tower/',
            'Capital Tower': 'images/portfolio/commercial/capital-tower/',
            'An-Nahdhah Mosque Singapore': 'images/portfolio/commercial/an-nahdhah-mosque/',
            'Marina Bay Financial Tower 3': 'images/portfolio/commercial/mbfc-tower-3/',
            'Massimo Dutti Vivocity Store': 'images/portfolio/commercial/massimo-dutti-vivocity/',
            'Tee International Limited': 'images/portfolio/commercial/tee-international/',
            'St Joseph\'s Home Singapore': 'images/portfolio/commercial/st-josephs-home/',
            'Healthway at OUE Downtown 2': 'images/portfolio/commercial/healthway-oue-downtown/',
            'One Devonshire Condominium': 'images/portfolio/commercial/one-devonshire/',
            'Welcia at Suntec City': 'images/portfolio/commercial/welcia-suntec/',
            'Courtyard Singapore Novena': 'images/portfolio/commercial/courtyard-singapore-novena/',
            'The Clearwater Condominium': 'images/portfolio/commercial/clearwater-condominium/',

            // Restaurant Projects
            'Odette': 'images/portfolio/restaurant/odette/',
            'Altro Zafferano at Ocean Financial Centre': 'images/portfolio/restaurant/altro-zafferano/',
            'SPRUCE @ HillV2': 'images/portfolio/restaurant/spruce-hillv2/',
            'Senso Ristorante & Bar': 'images/portfolio/restaurant/senso-club-street/',
            'Fu Lin Men Cantonese Dining at Chinese Swimming Club': 'images/portfolio/restaurant/chinese-swimming-club/',
            'Marina Bay Sands': 'images/portfolio/restaurant/mbs-restaurant/',

            // Heritage Projects
            'Mount Pleasant Drive': 'images/portfolio/heritage/mount-pleasant-drive/',
            'Everitt Road': 'images/portfolio/heritage/everitt-road-shophouse/',
            'Club Street': 'images/portfolio/heritage/club-street-shophouse/',
            'Swettenham Road': 'images/portfolio/heritage/swettenham-road-bungalow/',

            // Consultation Projects
            'Bukit Timah': 'images/portfolio/consultation/bukit-timah/',
            'The Avenir': 'images/portfolio/consultation/the-avenir/',
            'Sungei Kadut': 'images/portfolio/consultation/sungei-kadut/',
            'Camborne Road': 'images/portfolio/consultation/camborne-road/',
            'Treasure @ Tampines': 'images/portfolio/consultation/treasure-at-tampines/',
            'Jadescape': 'images/portfolio/consultation/jadescape/'
        };

        const basePath = portfolioPathMappings[projectTitle];
        if (!basePath) {
            console.warn(`No path mapping found for project: ${projectTitle}`);
            return [];
        }

        const images = [];
        for (let i = 1; i <= imageCount; i++) {
            images.push(`${basePath}${i}.webp`);
        }

        return images;
    }

    // Updated Project data with new portfolio structure and content from pspl_website_content_3rd_edit.md
    const projectData = [
        // Commercial Projects
        {
            title: 'Singapore Land Tower',
            category: 'Commercial • Marble',
            images: getProjectImages('Singapore Land Tower'),
            description: 'An honor to be invited and took part in 2022 for SLT upgrading project. Re-polishing the ground lobby Thassos feature wall. One of the world most expensive marble. Managing harsh working condition like 7 levels scaffoldings with stringent safety requirements by the Japanese Main Contractor. A signature project setting the tallest standards and target for the company. Achievement!',
            service: 'Marble Wall Maintenance Re-polishing',
            client: 'Main Contractor',
            material: 'Thassos Marble',
            location: '50 Raffles Place, Singapore 048623',
            duration: '2 weeks (night)'
        },
        {
            title: 'Capital Tower',
            category: 'Commercial • Marble',
            images: getProjectImages('Capital Tower'),
            description: 'Complete restoration of all lobbies marble floor to top shine, including elevator floor to privacy satin finish. This prestigious project involved meticulous planning with the building management to segment and cordon various lobby areas, and timely coordination with lift technician to secure the elevator(s). Seamless, with little to no interruption to operations and functions.',
            service: 'Marble Floor Maintenance Re-polishing',
            client: 'Building Management',
            material: 'Mahkam Dark Brown Marble',
            location: '168 Robinson Road, Singapore 068912',
            duration: '4 weeks'
        },
        {
            title: 'An-Nahdhah Mosque Singapore',
            category: 'Commercial • Marble',
            images: getProjectImages('An-Nahdhah Mosque Singapore'),
            description: 'Sanding repolishing of the Qibla wall, black marble stone layered over 8 levels of scaffolding. A sacred moment and our crew took the utmost pride in reburnishing the stone back to its former glory.',
            service: 'Marble Wall Maintenance Re-polishing',
            client: 'Building Management',
            material: 'Pietra Grey Marble',
            location: '9A Bishan Street 14, Singapore 579786',
            duration: '2 weeks'
        },
        {
            title: 'Marina Bay Financial Tower 3',
            category: 'Commercial • Floor',
            images: getProjectImages('Marina Bay Financial Tower 3'),
            description: 'Electrostatic discharge raised steel floor\'s carpet adhesive removal polishing. Main aim of the project is to lower cost for client to avoid mass replacement of the ESD raised floor. Mock ups are done and approved by building management. In order to determine the most suitable chemicals for the enclosed office environment and centralized air-conditioning system, with low odour emission and non-corrosive formula. Our team worked around the clock for the 13,000 square feet to be handed over to the building management on time.',
            service: 'Office Raised Floor Adhesive Removal',
            client: 'Main Contractor',
            material: 'ESD Raised Floor',
            location: '12 Marina Boulevard, Singapore 018982',
            duration: '6 days'
        },
        {
            title: 'Massimo Dutti Vivocity Store',
            category: 'Commercial • Marble',
            images: getProjectImages('Massimo Dutti Vivocity Store'),
            description: 'Herringbone tiling pattern, pushes the physical limit of craftsmen especially at the initial phase of grinding, to sort out the lippage of the smaller than usual size marble. Ensuring all corners and edges afloat, while maintaining the levelness of the surface. Truly our signature art piece.',
            service: 'New Laid Marble Floor Polishing',
            client: 'Main Contractor',
            material: 'Super Cantik Marble',
            location: '1 HarbourFront Walk #01-189 Centro Commercial Vivocity, Singapore 098585',
            duration: '2 weeks'
        },
        {
            title: 'Tee International Limited',
            category: 'Commercial • Marble',
            images: getProjectImages('Tee International Limited'),
            description: 'First impressions matter. Emphasis is place to achieve superior quality result, to ensure a welcoming lobby space ready to impress visitors. All craftsmen are experienced to handle fast revolving handheld grinder on mobile scaffolding.',
            service: 'Main Lobby Maintenance Marble Feature Wall Re-polishing, Granite Floor Buffing',
            client: 'Building Management',
            material: 'Venus White Marble, Sierra Grey Granite',
            location: '25 Bukit Batok Street 22, Singapore 659591',
            duration: '3 days'
        },
        {
            title: 'St Joseph\'s Home Singapore',
            category: 'Commercial • Granite',
            images: getProjectImages('St Joseph\'s Home Singapore'),
            description: 'Restoring pride and shine to the igneous granite rock floor, to this place of worship. Proper understanding of natural stone and chemicals, enable our crew to tackle various issue like oil/rust stain, blemish, worn shine.',
            service: 'Chapel Floor Granite Buffing',
            client: 'Building Management',
            material: 'Camellia Pink Granite',
            location: '36 Jurong West Street 24, Singapore 648141',
            duration: '2 days'
        },
        {
            title: 'Healthway at OUE Downtown 2',
            category: 'Commercial • Marble',
            images: getProjectImages('Healthway at OUE Downtown 2'),
            description: 'Elevating guest experience is priority. A favorite marble in residential, house in a commercial lobby requires similar attention to details. Acknowledging the high absorption nature of this porous marble, we had responded with finest sponge grind diamond abrasive to refine and close the pores of the stone. In addition, a USA sealer application to better protect against liquid stains and dirt.',
            service: 'Main Lobby Maintenance Marble Floor Re-polishing',
            client: 'Anchor Tenant',
            material: 'White Volakas Marble',
            location: '6 Shenton Way, OUE Downtown 2, Singapore 068809',
            duration: '2 days'
        },
        {
            title: 'One Devonshire Condominium',
            category: 'Commercial • Granite',
            images: getProjectImages('One Devonshire Condominium'),
            description: 'Driveway entrance, water feature granite had its surface stripped by harsh chlorine bleach. Proposed re-surfacing coupled with chemical buffing to re-attain the stone original look.',
            service: 'Granite Water Feature Restoration',
            client: 'MCST',
            material: 'Jet Black Granite',
            location: '1 Devonshire Road, Singapore 239896',
            duration: '3 days'
        },
        {
            title: 'Welcia at Suntec City',
            category: 'Commercial • Corian',
            images: getProjectImages('Welcia at Suntec City'),
            description: 'Repair and restore the countertop, injecting a new life to the furniture.',
            service: 'Corian Top Sanding and Buffing to Shine',
            client: 'Main Contractor',
            material: 'Corian (Acrylic) Top',
            location: '8 Temasek Boulevard Suntec Mall Tower, Singapore 038988',
            duration: '1 day'
        },
        {
            title: 'Courtyard Singapore Novena',
            category: 'Commercial • Hotel',
            images: getProjectImages('Courtyard Singapore Novena'),
            description: 'Allocated night job with the lowest foot traffic to ensure the least disturbance to hotel guest. Proper protection setup to shield the surrounding features from the slurry and chemicals. Swift and sequential, for a job well done in a timeliness manner.',
            service: 'Elevator Floor Marble Re-polishing',
            client: 'Housekeeping',
            material: 'Zebrano Marble',
            location: '99 Irrawaddy Road, Singapore 329568',
            duration: '3 nights'
        },
        {
            title: 'The Clearwater Condominium',
            category: 'Commercial • Marble',
            images: getProjectImages('The Clearwater Condominium'),
            description: 'Built in 2002, restoring the marble at lift lobby wall has its fair share of challenges. Decades of collected dirt, loss of shine and adhesive residue. We had to tailor the polishing formula accordingly without interrupting the full operations of the lifts and residents.',
            service: 'Lift Lobby Marble Cleaning & Waxing',
            client: 'Cleaning Maintenance Company',
            material: 'Jaisalmer Yellow Marble',
            location: '2 Bedok Reservoir View, Singapore 479232',
            duration: '1 week'
        },

        // Restaurant Projects
        {
            title: 'Odette',
            category: 'Restaurant • Marble',
            images: getProjectImages('Odette'),
            description: 'A remarkable project, racing against time for the grand restaurant opening. The design theme, saw the re-creation of broken marble flooring which is at brink of lost craft. In honor of the senior masons and their fine work of art, great respect is taken to meticulously grind polish the floor, unleashing the beauty within.',
            service: 'New Laid Marble Floor Polishing',
            client: 'Main Contractor',
            material: 'Broken White Volakas Marble',
            location: '1 St Andrew\'s Road, #01-04 National Gallery, Singapore 178957',
            duration: '2 weeks'
        },
        {
            title: 'Altro Zafferano at Ocean Financial Centre',
            category: 'Restaurant • Marble',
            images: getProjectImages('Altro Zafferano at Ocean Financial Centre'),
            description: 'Severely scratched (stun marks) marble are tackled with quality diamond abrasive for optimal result. Leaving no traces of "potholes". Allocated hours before the restaurant opening had us place standby, both manpower and machines to ensure zero room for error.',
            service: 'Marble Stun Marks Restoration',
            client: 'Contractor',
            material: 'Marble',
            location: '10 Collyer Quay, Level 43, Singapore 049315',
            duration: '1 day'
        },
        {
            title: 'SPRUCE @ HillV2',
            category: 'Restaurant • Marble',
            images: getProjectImages('SPRUCE @ HillV2'),
            description: 'From countertop, salad bar to flooring, the versatile and eye-pleasing White Volakas was deployed at various parts of the restaurant. Mother Nature\'s impressive build of marble truly stands out, as the stone is capable to undertake proper resurfacing on site for a revitalized restaurant appearance. Ready to open its door to diners!',
            service: 'Maintenance Marble Floor Re-polishing',
            client: 'Main Contractor',
            material: 'White Volakas Marble',
            location: '4 Hillview Rise, #01-01 HillV2, Singapore 667979',
            duration: '4 days'
        },
        {
            title: 'Senso Ristorante & Bar',
            category: 'Restaurant • Marble',
            images: getProjectImages('Senso Ristorante & Bar'),
            description: 'Highly valued for its decorative appearance, the Onyx stone is carefully constructed with embedded lighting to unleash the beauty. Our crew put their heart and soul into refurnishing the piece of art.',
            service: 'Maintenance Marble Bar Top Re-polishing',
            client: 'Tenant',
            material: 'Onyx Marble',
            location: '21 Club Street, Singapore 069410',
            duration: '1 day'
        },
        {
            title: 'Fu Lin Men Cantonese Dining at Chinese Swimming Club',
            category: 'Restaurant • Porcelain',
            images: getProjectImages('Fu Lin Men Cantonese Dining at Chinese Swimming Club'),
            description: 'Heavy foot traffic worn the top coat of the porcelain tiles, resulting in collected dirt. Our sequential formula effectively cleans the blemishes, then buff to restore the shine. A tighter surface pores, for a longer lasting shine.',
            service: 'Porcelain Machine Chemical Buffing',
            client: 'Main Contractor',
            material: 'Porcelain',
            location: '21 Amber Road, Chinese Swimming Club, Singapore 439870',
            duration: '1 day'
        },
        {
            title: 'Marina Bay Sands',
            category: 'Restaurant • Homogenous',
            images: getProjectImages('Marina Bay Sands'),
            description: 'Homogenous tile machine chemical buffing to clean and importantly reinstate the glow back to the stone. Ready to serve its new tenant.',
            service: 'Homogenous Tile Machine Chemical Buffing',
            client: 'Designer',
            material: 'Homogenous',
            location: '10 Bayfront Avenue, Singapore 018956',
            duration: '1 day'
        },

        // Heritage Projects
        {
            title: 'Mount Pleasant Drive',
            category: 'Heritage • Marble',
            images: getProjectImages('Mount Pleasant Drive'),
            description: 'This monumental conservation construction is often a site for filming. Our team went over and beyond to ensure the flooring is ready to dazzle for its next shoot and/or tenant.',
            service: 'Marble Floor Maintenance Re-polishing',
            client: 'Heritage Conservation',
            material: 'White Volakas Marble, Jet Black Granite',
            location: 'Mount Pleasant Drive',
            duration: '5 days'
        },
        {
            title: 'Everitt Road',
            category: 'Heritage • Shophouse',
            images: getProjectImages('Everitt Road'),
            description: 'Workmanship of such fine build quality are rare. Crucial for craftsmen to preserve and take extreme care in every procedure from establishing protection to the layered polishing itself. Truly deserving!',
            service: 'Marble Floor Maintenance Re-polishing',
            client: 'Heritage Conservation',
            material: 'Super Cantik Marble',
            location: 'Everitt Road, Singapore 428523',
            duration: '1 day'
        },
        {
            title: 'Club Street',
            category: 'Heritage • Wood',
            images: getProjectImages('Club Street'),
            description: 'Chengal decked upper storey architectural support construction possesses constant movement, resulting in challenges during sanding and gap filling. A tailored formula, to achieve result worthy of its conservation status.',
            service: 'Chengal Wood Sand & Stain',
            client: 'Conservation Shophouse',
            material: 'Chengal Wood',
            location: 'Club Street, Singapore 069440',
            duration: '1 day'
        },
        {
            title: 'Swettenham Road',
            category: 'Heritage • Terrazzo',
            images: getProjectImages('Swettenham Road'),
            description: 'Our team felt extreme pride and joy in restoring the terrazzo for the conservation bungalow constructed before Singapore\'s independence. Huge honor and pleasure to serve the foreign ambassador.',
            service: 'Terrazzo Re-polishing',
            client: 'British Colonial Bungalow',
            material: 'Terrazzo',
            location: 'Swettenham Road, Singapore 248075',
            duration: '1 week'
        },

        // Consultation Projects
        {
            title: 'The Avenir',
            category: 'Consultation • Inspection',
            images: getProjectImages('The Avenir'),
            description: 'In collaboration with renowned local defect inspection company, we assisted multiple new homeowners to achieve deserving quality their new marble should possess. From stun marks, irregular grouting, improper nosing, polishing swirls, scratches, broken marble... We managed to harmonize all parties, and had developer\'s group process the defect rectification accordingly.',
            service: 'Newly TOP Project, Marble Inspection',
            client: 'Condominium Owners',
            material: 'Marble Vanity Top',
            location: '10 River Valley Close, Singapore 238438',
            duration: '4 months'
        },
        {
            title: 'Sungei Kadut',
            category: 'Consultation • Factory',
            images: getProjectImages('Sungei Kadut'),
            description: 'Providing expert opinion from selection of marble slabs, cuts, factory processing, dry lay, to delivery inspection',
            service: 'Factory Marble Inspection',
            client: 'Stone Factory',
            material: 'Grigio Nero Marble',
            location: 'Sungei Kadut Street 2, Singapore 729236',
            duration: '1 month'
        },
        {
            title: 'Bukit Timah',
            category: 'Consultation • Inspection',
            images: getProjectImages('Bukit Timah'),
            description: 'Alongside with homeowner, builder\'s team and their marble polisher we inspected the marble polishing work and recommended procedures to further refine the job.',
            service: 'Marble Post Polishing Quality Check',
            client: 'Landed House',
            material: 'Carrara Marble Floor',
            location: 'Bukit Timah',
            duration: '2 hours'
        },
        {
            title: 'Camborne Road',
            category: 'Consultation • Assessment',
            images: getProjectImages('Camborne Road'),
            description: 'Inspection and identification of new build\'s marble beyond restoration/repair. Honorable architect and main contractor consented to replacement of the marble batch. Our team coordinated the timeline, stone selection, factory dry lay, delivery inspection, demolition, masonry & polishing.',
            service: 'Marble Inspection and Project Coordination',
            client: 'Landed House',
            material: 'Nero Marquina Marble',
            location: 'Camborne Road, Singapore 299870',
            duration: '3 months'
        },
        {
            title: 'Treasure @ Tampines',
            category: 'Consultation • Inspection',
            images: getProjectImages('Treasure @ Tampines'),
            description: 'Conducted a joint inspection with the developer\'s team and defect inspection company to assess the quality of masonry work which include mis-alignment, lippage, inconsistent grout colours. In addition, follow ups to inspect the standard of rectification works done.',
            service: 'Tile Floor Consultation',
            client: 'Condominium',
            material: 'Tile',
            location: '3 Tampines Lane, Singapore 528483',
            duration: '3 weeks'
        },
        {
            title: 'Jadescape',
            category: 'Consultation • Inspection',
            images: getProjectImages('Jadescape'),
            description: 'Differentiation of natural stone\'s inherent fault line compared to crack/broken slab. We had successfully raised client\'s (owner) concern to the developer in a joint inspection, who then acknowledged and assisted in a full vanity top replacement.',
            service: 'Marble Consultation',
            client: 'Condominium',
            material: 'Paloma Ivory Marble Vanity Top',
            location: '6 Shunfu Road, Singapore 575744',
            duration: '2 hours'
        }
    ];

    // Generate portfolio HTML from projectData
    function generatePortfolioHTML() {
        console.log('generatePortfolioHTML function called');
        console.log('projectData length:', projectData.length);

        const portfolioGrid = document.getElementById('portfolioGrid');
        console.log('Portfolio grid found:', !!portfolioGrid);
        if (!portfolioGrid) {
            console.log('Portfolio grid not found, returning early');
            return;
        }

        // Clear existing content
        portfolioGrid.innerHTML = '';

        // Generate portfolio items from projectData
        projectData.forEach((project, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer reveal-on-scroll';
            portfolioItem.setAttribute('data-category', project.category.toLowerCase());
            portfolioItem.setAttribute('data-project-id', project.title);

            portfolioItem.innerHTML = `
                <div class="aspect-square overflow-hidden bg-gray-100">
                    <img src="${project.images[0]}"
                         alt="${project.title}"
                         loading="lazy"
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-pspl-dark/90 via-pspl-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 class="text-lg font-bold mb-2">${project.title}</h4>
                        <p class="text-sm text-gray-300">${project.category}</p>
                        <p class="text-xs text-pspl-gold mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Click to view details</p>
                    </div>
                </div>
            `;

            portfolioGrid.appendChild(portfolioItem);
        });

        // Re-select portfolio items after generation
        const newPortfolioItems = document.querySelectorAll('.portfolio-item');

        // Add click handlers to new portfolio items
        newPortfolioItems.forEach((item) => {
            item.addEventListener('click', () => {
                const projectId = item.getAttribute('data-project-id');
                if (projectId) {
                    const projectIndex = projectData.findIndex(p => p.title === projectId);
                    if (projectIndex !== -1) {
                        openModal(projectIndex);
                    }
                }
            });
        });

        return newPortfolioItems;
    }

    // Portfolio filtering
    console.log('About to set up portfolio filtering...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Filter buttons found:', filterButtons.length);

    console.log('About to call generatePortfolioHTML...');
    let portfolioItems = generatePortfolioHTML(); // Generate items dynamically
    console.log('generatePortfolioHTML returned:', portfolioItems ? portfolioItems.length : 'undefined');

    // Observe newly created portfolio items for animations
    if (portfolioItems && portfolioItems.length > 0) {
        observeRevealElements(portfolioItems);
        console.log('Portfolio items added to animation observer');
    }
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let visibleItems = 9;
    let currentFilter = 'all';
    
    // Initialize portfolio
    function filterPortfolio(filter) {
        currentFilter = filter;
        let visibleCount = 0;

        // Refresh portfolio items reference
        portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            const shouldShow = filter === 'all' || category.includes(filter);
            
            if (shouldShow) {
                if (visibleCount < visibleItems) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    visibleCount++;
                    // Add staggered animation with classes instead of inline styles
                    setTimeout(() => {
                        item.classList.add('portfolio-visible');
                    }, visibleCount * 50);
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
        
        // Show/hide load more button
        if (loadMoreBtn) {
            const totalMatching = Array.from(portfolioItems).filter(item => {
                const category = item.getAttribute('data-category');
                return filter === 'all' || category.includes(filter);
            }).length;
            
            if (visibleItems < totalMatching) {
                loadMoreBtn.style.display = 'inline-block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
    
    // Filter button click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-pspl-red', 'text-white');
                b.classList.add('border-2', 'border-gray-300');
            });
            this.classList.add('active', 'bg-pspl-red', 'text-white');
            this.classList.remove('border-2', 'border-gray-300');
            
            // Reset visible items when changing filters
            visibleItems = 9;
            
            // Apply filter
            const filter = this.getAttribute('data-filter');
            filterPortfolio(filter);
        });
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleItems += 6;
            filterPortfolio(currentFilter);
            
            // Check if we should hide the button after loading more
            const totalMatching = Array.from(portfolioItems).filter(item => {
                const category = item.getAttribute('data-category');
                return currentFilter === 'all' || category.includes(currentFilter);
            }).length;
            
            if (visibleItems >= totalMatching) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Initialize portfolio on load
    filterPortfolio('all');
    
    // Portfolio Modal
    const modal = document.getElementById('portfolioModal');
    let currentProjectIndex = 0;
    let currentImageIndex = 0;

    // Portfolio click handlers are now managed in generatePortfolioHTML function
    
    window.openModal = function(index) {
        currentProjectIndex = index;
        currentImageIndex = 0;
        const project = projectData[index];
        
        if (project) {
            // Load first image
            updateModalImage(project);
            
            // Update project details
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalCategory').textContent = project.category;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalService').textContent = project.service;
            document.getElementById('modalLocation').textContent = project.location;
            document.getElementById('modalDuration').textContent = project.duration;
            
            // Create dots for image navigation
            createImageDots(project.images.length);
            
            // Update navigation visibility
            updateImageNavigation(project.images.length);
            
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            
            // Reset scroll position for modal content - ensure modal opens at top
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }

            // Also reset scroll on modal container
            modal.scrollTop = 0;
            
            // Prevent background scroll on mobile devices and preserve scroll position
            const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                                  (window.innerWidth <= 768 && 'ontouchstart' in window);

            if (isMobileDevice) {
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.top = `-${window.scrollY}px`;
            }
        }
    };
    
    function updateModalImage(project) {
        if (project && project.images && project.images[currentImageIndex]) {
            document.getElementById('modalImage').src = project.images[currentImageIndex];
            document.getElementById('currentImageNum').textContent = currentImageIndex + 1;
            document.getElementById('totalImageNum').textContent = project.images.length;
            updateActiveDot();
        }
    }
    
    function createImageDots(count) {
        const dotsContainer = document.getElementById('modalImageDots');
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-2 h-2 rounded-full transition-all modal-dot-btn';
            dot.onclick = () => goToImage(i);
            dot.setAttribute('aria-label', `Go to image ${i + 1}`);
            dotsContainer.appendChild(dot);
        }
        updateActiveDot();
    }
    
    function updateActiveDot() {
        const dots = document.querySelectorAll('#modalImageDots button');
        dots.forEach((dot, index) => {
            if (index === currentImageIndex) {
                dot.className = 'w-2 h-2 bg-white rounded-full transition-all modal-dot-btn';
            } else {
                dot.className = 'w-2 h-2 bg-white/50 rounded-full transition-all hover:bg-white/70 modal-dot-btn';
            }
        });
    }
    
    function updateImageNavigation(imageCount) {
        const prevBtn = document.getElementById('modalPrevImage');
        const nextBtn = document.getElementById('modalNextImage');
        const dotsContainer = document.getElementById('modalImageDots');
        const counter = document.getElementById('modalImageCounter');
        
        if (imageCount <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dotsContainer.style.display = 'none';
            counter.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            dotsContainer.style.display = 'flex';
            counter.style.display = 'block';
        }
    }
    
    window.changeModalImage = function(direction) {
        const project = projectData[currentProjectIndex];
        if (!project || !project.images) return;
        
        currentImageIndex += direction;
        
        // Loop around
        if (currentImageIndex < 0) {
            currentImageIndex = project.images.length - 1;
        } else if (currentImageIndex >= project.images.length) {
            currentImageIndex = 0;
        }
        
        updateModalImage(project);
    };
    
    window.goToImage = function(index) {
        const project = projectData[currentProjectIndex];
        if (!project || !project.images || index < 0 || index >= project.images.length) return;
        
        currentImageIndex = index;
        updateModalImage(project);
    };
    
    window.closeModal = function() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        
        // Restore scroll position on mobile devices
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                              (window.innerWidth <= 768 && 'ontouchstart' in window);

        if (isMobileDevice) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };
    
    window.navigateProject = function(direction) {
        const newIndex = currentProjectIndex + direction;
        if (newIndex >= 0 && newIndex < projectData.length) {
            currentImageIndex = 0; // Reset to first image when switching projects
            openModal(newIndex);
        }
    };
    
    // Add swipe gesture support for mobile with improved touch handling
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = null;
    
    const modalImageContainer = document.getElementById('modalImageContainer');
    if (modalImageContainer) {
        modalImageContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isScrolling = null;
        }, { passive: true });
        
        modalImageContainer.addEventListener('touchmove', function(e) {
            if (isScrolling === null) {
                const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
                const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
                isScrolling = diffY > diffX;
            }
        }, { passive: true });
        
        modalImageContainer.addEventListener('touchend', function(e) {
            if (!isScrolling) {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                handleSwipeGesture();
            }
        }, { passive: true });
    }
    
    function handleSwipeGesture() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const verticalThreshold = 100; // Maximum vertical movement allowed
        
        const horizontalDiff = touchEndX - touchStartX;
        const verticalDiff = Math.abs(touchEndY - touchStartY);
        
        // Only process horizontal swipes
        if (Math.abs(horizontalDiff) > swipeThreshold && verticalDiff < verticalThreshold) {
            if (horizontalDiff > 0) {
                // Swipe right - show previous image
                changeModalImage(-1);
            } else {
                // Swipe left - show next image
                changeModalImage(1);
            }
        }
    }
    
    window.openProjectWhatsApp = function() {
        const project = projectData[currentProjectIndex];
        const message = `Hi PSPL, I'm interested in ${project.service} similar to your ${project.title} project. Please provide more information.`;
        const phone = "6597677169";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                changeModalImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeModalImage(1);
            }
        }
    });

    // WhatsApp function with service selection
    let selectedService = null;

    window.selectService = function(service) {
        selectedService = service;

        // Update button styles to show selected state
        const buttons = document.querySelectorAll('.service-btn');
        buttons.forEach(btn => {
            btn.classList.remove('bg-pspl-gold/20', 'border-pspl-gold');
            btn.classList.add('border-pspl-gold/50');
        });

        // Highlight selected button
        event.target.classList.remove('border-pspl-gold/50');
        event.target.classList.add('bg-pspl-gold/20', 'border-pspl-gold');

        // Update WhatsApp link with selected service
        const whatsappLink = document.getElementById('whatsappLink');
        if (whatsappLink) {
            let message;
            switch (service) {
                case 'Marble':
                    message = "Hi PSPL, I'm interested in marble & stone services.";
                    break;
                case 'Parquet':
                    message = "Hi PSPL, I'm interested in parquet & wood services.";
                    break;
                case 'Consultation':
                    message = "Hi PSPL, I'm interested in consultation services.";
                    break;
                default:
                    message = "Hi PSPL, I'm interested in your services.";
            }
            whatsappLink.href = `https://wa.me/6597677169?text=${encodeURIComponent(message)}`;
        }
    };

}); // End of DOMContentLoaded event listener

function openWhatsApp() {
    const message = "Hi PSPL, I'm interested in your stone and parquet restoration services.";
    const phone = "6597677169";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}