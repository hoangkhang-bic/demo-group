import fs from "fs";
import path from "path";

interface NestedAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
    elevation: number;
  };
  metadata: {
    type: "residential" | "commercial" | "industrial";
    verified: boolean;
    lastUpdated: string;
    reliability: number;
  };
}

interface SocialProfile {
  platform: string;
  username: string;
  followers: number;
  following: number;
  posts: Array<{
    id: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: Array<{
      id: string;
      author: string;
      content: string;
      timestamp: string;
      replies: Array<{
        id: string;
        author: string;
        content: string;
        timestamp: string;
      }>;
    }>;
    tags: string[];
    media: Array<{
      type: "image" | "video" | "audio";
      url: string;
      size: number;
      duration?: number;
      resolution?: string;
    }>;
  }>;
  analytics: {
    engagement: number;
    reach: number;
    impressions: number;
    clickThroughRate: number;
  };
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  department: string;
  startDate: string;
  endDate: string | null;
  salary: {
    amount: number;
    currency: string;
    type: "hourly" | "monthly" | "yearly";
  };
  responsibilities: string[];
  achievements: Array<{
    title: string;
    description: string;
    date: string;
    impact: string;
    metrics: Record<string, number>;
  }>;
  skills: Array<{
    name: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
    yearsOfExperience: number;
    certifications: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    duration: number;
    budget: number;
    status: "completed" | "ongoing" | "cancelled";
    teamSize: number;
    myRole: string;
  }>;
}

interface ComplexUser {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    age: number;
    gender: "male" | "female" | "other" | "prefer-not-to-say";
    nationality: string;
    languages: Array<{
      language: string;
      proficiency: "basic" | "conversational" | "fluent" | "native";
    }>;
  };
  avatar: {
    url: string;
    thumbnails: {
      small: string;
      medium: string;
      large: string;
    };
    metadata: {
      uploadDate: string;
      fileSize: number;
      dimensions: {
        width: number;
        height: number;
      };
      colorPalette: string[];
    };
  };
  addresses: NestedAddress[];
  socialProfiles: SocialProfile[];
  workExperience: WorkExperience[];
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    major: string;
    minor?: string;
    gpa: number;
    startDate: string;
    endDate: string;
    honors: string[];
    courses: Array<{
      code: string;
      name: string;
      credits: number;
      grade: string;
      professor: string;
      semester: string;
    }>;
  }>;
  preferences: {
    theme: "light" | "dark" | "auto";
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      categories: Record<string, boolean>;
    };
    privacy: {
      profileVisibility: "public" | "friends" | "private";
      showEmail: boolean;
      showPhone: boolean;
      allowSearchEngineIndexing: boolean;
    };
  };
  activityLog: Array<{
    id: string;
    action: string;
    timestamp: string;
    details: Record<string, any>;
    ipAddress: string;
    userAgent: string;
    location: {
      city: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  }>;
  financialData: {
    creditScore: number;
    accounts: Array<{
      id: string;
      type: "checking" | "savings" | "credit" | "investment";
      bank: string;
      balance: number;
      currency: string;
      transactions: Array<{
        id: string;
        date: string;
        description: string;
        amount: number;
        category: string;
        merchant: string;
        tags: string[];
      }>;
    }>;
    investments: Array<{
      symbol: string;
      name: string;
      quantity: number;
      purchasePrice: number;
      currentPrice: number;
      purchaseDate: string;
      sector: string;
      dividends: Array<{
        date: string;
        amount: number;
      }>;
    }>;
  };
  healthData: {
    bloodType: string;
    allergies: string[];
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate?: string;
    }>;
    vitals: Array<{
      date: string;
      weight: number;
      height: number;
      bloodPressure: {
        systolic: number;
        diastolic: number;
      };
      heartRate: number;
      temperature: number;
    }>;
    exerciseLog: Array<{
      date: string;
      type: string;
      duration: number;
      caloriesBurned: number;
      notes: string;
    }>;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    loginCount: number;
    accountStatus: "active" | "inactive" | "suspended" | "deleted";
    verificationStatus: {
      email: boolean;
      phone: boolean;
      identity: boolean;
    };
    flags: string[];
    tags: string[];
    customFields: Record<string, any>;
  };
}

const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Christopher",
  "Karen",
  "Charles",
  "Nancy",
  "Daniel",
  "Lisa",
  "Matthew",
  "Betty",
  "Anthony",
  "Helen",
  "Mark",
  "Sandra",
  "Donald",
  "Donna",
  "Steven",
  "Carol",
  "Paul",
  "Ruth",
  "Andrew",
  "Sharon",
  "Joshua",
  "Michelle",
  "Kenneth",
  "Laura",
  "Kevin",
  "Sarah",
  "Brian",
  "Kimberly",
  "George",
  "Deborah",
  "Timothy",
  "Dorothy",
  "Ronald",
  "Lisa",
  "Jason",
  "Nancy",
  "Edward",
  "Karen",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
];

const companies = [
  "TechCorp",
  "InnovateSoft",
  "DataDyne",
  "CloudFirst",
  "NextGen Solutions",
  "FutureWorks",
  "DigitalEdge",
  "SmartSystems",
  "AlphaTech",
  "BetaLabs",
  "GammaDev",
  "DeltaInnovations",
  "EpsilonTech",
  "ZetaCloud",
  "EtaDigital",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Indianapolis",
  "Charlotte",
  "San Francisco",
  "Seattle",
  "Denver",
  "Washington DC",
  "Boston",
  "El Paso",
  "Detroit",
  "Nashville",
  "Portland",
  "Memphis",
  "Oklahoma City",
  "Las Vegas",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Sacramento",
];

const generateRandomString = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateRandomDate = (
  startYear: number = 1990,
  endYear: number = 2024
): string => {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString();
};

const generateComplexUser = (index: number): ComplexUser => {
  const firstName =
    firstNames[Math.floor(Math.random() * firstNames.length)] ?? "John";
  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)] ?? "Doe";
  const fullName = `${firstName} ${lastName}`;

  // Generate multiple addresses (1-4 per user)
  const addressCount = Math.floor(Math.random() * 4) + 1;
  const addresses: NestedAddress[] = [];
  for (let i = 0; i < addressCount; i++) {
    addresses.push({
      id: `addr_${index}_${i}`,
      street: `${Math.floor(Math.random() * 9999) + 1} ${generateRandomString(
        8
      )} St`,
      city: cities[Math.floor(Math.random() * cities.length)] ?? "Unknown City",
      state: generateRandomString(2).toUpperCase(),
      zipCode: Math.floor(Math.random() * 90000 + 10000).toString(),
      country: "United States",
      coordinates: {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
        elevation: Math.random() * 3000,
      },
      metadata: {
        type: (["residential", "commercial", "industrial"][
          Math.floor(Math.random() * 3)
        ] ?? "residential") as "residential" | "commercial" | "industrial",
        verified: Math.random() > 0.3,
        lastUpdated: generateRandomDate(2020, 2024),
        reliability: Math.random(),
      },
    });
  }

  // Generate social profiles (2-5 per user)
  const socialCount = Math.floor(Math.random() * 4) + 2;
  const socialProfiles: SocialProfile[] = [];
  const platforms = ["Twitter", "Facebook", "Instagram", "LinkedIn", "TikTok"];

  for (let i = 0; i < socialCount; i++) {
    const postCount = Math.floor(Math.random() * 20) + 5;
    const posts = [];

    for (let j = 0; j < postCount; j++) {
      const commentCount = Math.floor(Math.random() * 10);
      const comments = [];

      for (let k = 0; k < commentCount; k++) {
        const replyCount = Math.floor(Math.random() * 3);
        const replies = [];

        for (let l = 0; l < replyCount; l++) {
          replies.push({
            id: `reply_${index}_${i}_${j}_${k}_${l}`,
            author: `${
              firstNames[Math.floor(Math.random() * firstNames.length)] ??
              "Anonymous"
            } ${
              lastNames[Math.floor(Math.random() * lastNames.length)] ?? "User"
            }`,
            content: generateRandomString(50 + Math.floor(Math.random() * 100)),
            timestamp: generateRandomDate(2023, 2024),
          });
        }

        comments.push({
          id: `comment_${index}_${i}_${j}_${k}`,
          author: `${
            firstNames[Math.floor(Math.random() * firstNames.length)] ??
            "Anonymous"
          } ${
            lastNames[Math.floor(Math.random() * lastNames.length)] ?? "User"
          }`,
          content: generateRandomString(30 + Math.floor(Math.random() * 70)),
          timestamp: generateRandomDate(2023, 2024),
          replies,
        });
      }

      const mediaCount = Math.floor(Math.random() * 3);
      const media = [];
      for (let m = 0; m < mediaCount; m++) {
        const mediaTypes = ["image", "video", "audio"] as const;
        const type = mediaTypes[Math.floor(Math.random() * 3)] ?? "image";
        const mediaItem: {
          type: "image" | "video" | "audio";
          url: string;
          size: number;
          duration?: number;
          resolution?: string;
        } = {
          type,
          url: `https://example.com/media/${generateRandomString(20)}.${
            type === "image" ? "jpg" : type === "video" ? "mp4" : "mp3"
          }`,
          size: Math.floor(Math.random() * 10000000) + 100000,
        };

        if (type !== "image") {
          mediaItem.duration = Math.floor(Math.random() * 300) + 10;
        }
        if (type !== "audio") {
          mediaItem.resolution = `${Math.floor(Math.random() * 1920) + 480}x${
            Math.floor(Math.random() * 1080) + 360
          }`;
        }

        media.push(mediaItem);
      }

      posts.push({
        id: `post_${index}_${i}_${j}`,
        content: generateRandomString(100 + Math.floor(Math.random() * 200)),
        timestamp: generateRandomDate(2023, 2024),
        likes: Math.floor(Math.random() * 1000),
        comments,
        tags: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          () => `#${generateRandomString(8)}`
        ),
        media,
      });
    }

    socialProfiles.push({
      platform: platforms[i % platforms.length] ?? "Unknown",
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(
        Math.random() * 999
      )}`,
      followers: Math.floor(Math.random() * 10000),
      following: Math.floor(Math.random() * 1000),
      posts,
      analytics: {
        engagement: Math.random(),
        reach: Math.floor(Math.random() * 50000),
        impressions: Math.floor(Math.random() * 100000),
        clickThroughRate: Math.random() * 0.1,
      },
    });
  }

  // Generate work experience (1-5 jobs)
  const jobCount = Math.floor(Math.random() * 5) + 1;
  const workExperience: WorkExperience[] = [];

  for (let i = 0; i < jobCount; i++) {
    const projectCount = Math.floor(Math.random() * 8) + 2;
    const projects = [];

    for (let j = 0; j < projectCount; j++) {
      const statusOptions = ["completed", "ongoing", "cancelled"] as const;
      projects.push({
        id: `project_${index}_${i}_${j}`,
        name: `${generateRandomString(15)} Project`,
        description: generateRandomString(200),
        technologies: Array.from(
          { length: Math.floor(Math.random() * 8) + 3 },
          () => generateRandomString(10)
        ),
        duration: Math.floor(Math.random() * 24) + 1,
        budget: Math.floor(Math.random() * 1000000) + 10000,
        status: statusOptions[Math.floor(Math.random() * 3)] ?? "completed",
        teamSize: Math.floor(Math.random() * 20) + 3,
        myRole: generateRandomString(20),
      });
    }

    const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
    const salaryTypes = ["yearly", "monthly", "hourly"] as const;

    workExperience.push({
      id: `job_${index}_${i}`,
      company:
        companies[Math.floor(Math.random() * companies.length)] ??
        "Unknown Company",
      position: `${generateRandomString(15)} ${
        ["Engineer", "Manager", "Director", "Analyst"][
          Math.floor(Math.random() * 4)
        ] ?? "Engineer"
      }`,
      department: departments[Math.floor(Math.random() * 5)] ?? "Engineering",
      startDate: generateRandomDate(2010, 2020),
      endDate: Math.random() > 0.3 ? generateRandomDate(2021, 2024) : null,
      salary: {
        amount: Math.floor(Math.random() * 200000) + 50000,
        currency: "USD",
        type: salaryTypes[Math.floor(Math.random() * 3)] ?? "yearly",
      },
      responsibilities: Array.from(
        { length: Math.floor(Math.random() * 8) + 3 },
        () => generateRandomString(100)
      ),
      achievements: Array.from(
        { length: Math.floor(Math.random() * 5) + 1 },
        () => ({
          title: generateRandomString(30),
          description: generateRandomString(150),
          date: generateRandomDate(2015, 2024),
          impact: generateRandomString(80),
          metrics: {
            performance: Math.random() * 100,
            efficiency: Math.random() * 100,
            revenue: Math.floor(Math.random() * 1000000),
          },
        })
      ),
      skills: Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () => {
        const skillLevels = [
          "beginner",
          "intermediate",
          "advanced",
          "expert",
        ] as const;
        return {
          name: generateRandomString(12),
          level: skillLevels[Math.floor(Math.random() * 4)] ?? "beginner",
          yearsOfExperience: Math.floor(Math.random() * 15) + 1,
          certifications: Array.from(
            { length: Math.floor(Math.random() * 3) },
            () => generateRandomString(25)
          ),
        };
      }),
      projects,
    });
  }

  // Generate comprehensive activity log (50-200 entries)
  const activityCount = Math.floor(Math.random() * 150) + 50;
  const actions = [
    "login",
    "logout",
    "profile_update",
    "password_change",
    "purchase",
    "view_profile",
    "send_message",
  ];
  const activityLog = Array.from({ length: activityCount }, (_, i) => ({
    id: `activity_${index}_${i}`,
    action: actions[Math.floor(Math.random() * 7)] ?? "login",
    timestamp: generateRandomDate(2023, 2024),
    details: {
      page: generateRandomString(20),
      duration: Math.floor(Math.random() * 3600),
      referrer: `https://${generateRandomString(10)}.com`,
      data: generateRandomString(50),
    },
    ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    userAgent: `Mozilla/5.0 (${generateRandomString(
      20
    )}) ${generateRandomString(30)}`,
    location: {
      city: cities[Math.floor(Math.random() * cities.length)] ?? "Unknown City",
      country: "United States",
      coordinates: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      },
    },
  }));

  const genderOptions = [
    "male",
    "female",
    "other",
    "prefer-not-to-say",
  ] as const;
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];
  const proficiencyLevels = [
    "basic",
    "conversational",
    "fluent",
    "native",
  ] as const;

  return {
    id: `user_${String(index).padStart(4, "0")}`,
    personalInfo: {
      firstName,
      lastName,
      fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(
        Math.random() * 999
      )}@example.com`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${
        Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`,
      dateOfBirth: generateRandomDate(1970, 2000),
      age: Math.floor(Math.random() * 50) + 20,
      gender:
        genderOptions[Math.floor(Math.random() * 4)] ?? "prefer-not-to-say",
      nationality: "American",
      languages: Array.from(
        { length: Math.floor(Math.random() * 4) + 1 },
        () => ({
          language: languages[Math.floor(Math.random() * 6)] ?? "English",
          proficiency:
            proficiencyLevels[Math.floor(Math.random() * 4)] ?? "basic",
        })
      ),
    },
    avatar: {
      url: `https://i.pravatar.cc/400?img=${index}`,
      thumbnails: {
        small: `https://i.pravatar.cc/50?img=${index}`,
        medium: `https://i.pravatar.cc/150?img=${index}`,
        large: `https://i.pravatar.cc/300?img=${index}`,
      },
      metadata: {
        uploadDate: generateRandomDate(2020, 2024),
        fileSize: Math.floor(Math.random() * 500000) + 50000,
        dimensions: {
          width: 400,
          height: 400,
        },
        colorPalette: Array.from(
          { length: 5 },
          () =>
            `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`
        ),
      },
    },
    addresses,
    socialProfiles,
    workExperience,
    education: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, i) => {
        const degrees = ["Bachelor", "Master", "PhD"];
        return {
          id: `edu_${index}_${i}`,
          institution: `${generateRandomString(15)} University`,
          degree: degrees[Math.floor(Math.random() * 3)] ?? "Bachelor",
          major: generateRandomString(20),
          ...(Math.random() > 0.5 ? { minor: generateRandomString(15) } : {}),
          gpa: Math.random() * 2 + 2,
          startDate: generateRandomDate(2000, 2015),
          endDate: generateRandomDate(2004, 2020),
          honors: Array.from({ length: Math.floor(Math.random() * 3) }, () =>
            generateRandomString(20)
          ),
          courses: Array.from(
            { length: Math.floor(Math.random() * 20) + 10 },
            (_, j) => {
              const grades = ["A", "A-", "B+", "B", "B-", "C+", "C"];
              const semesters = ["Fall", "Spring", "Summer"];
              return {
                code: `${generateRandomString(3).toUpperCase()}${
                  Math.floor(Math.random() * 900) + 100
                }`,
                name: generateRandomString(25),
                credits: Math.floor(Math.random() * 4) + 1,
                grade: grades[Math.floor(Math.random() * 7)] ?? "B",
                professor: `Dr. ${
                  firstNames[Math.floor(Math.random() * firstNames.length)] ??
                  "John"
                } ${
                  lastNames[Math.floor(Math.random() * lastNames.length)] ??
                  "Smith"
                }`,
                semester: `${
                  semesters[Math.floor(Math.random() * 3)] ?? "Fall"
                } ${Math.floor(Math.random() * 10) + 2015}`,
              };
            }
          ),
        };
      }
    ),
    preferences: {
      theme: (["light", "dark", "auto"][Math.floor(Math.random() * 3)] ??
        "light") as "light" | "dark" | "auto",
      language: "en-US",
      timezone: "America/New_York",
      notifications: {
        email: Math.random() > 0.3,
        push: Math.random() > 0.2,
        sms: Math.random() > 0.7,
        categories: {
          marketing: Math.random() > 0.5,
          updates: Math.random() > 0.3,
          security: Math.random() > 0.1,
          social: Math.random() > 0.4,
        },
      },
      privacy: {
        profileVisibility: (["public", "friends", "private"][
          Math.floor(Math.random() * 3)
        ] ?? "public") as "public" | "friends" | "private",
        showEmail: Math.random() > 0.6,
        showPhone: Math.random() > 0.8,
        allowSearchEngineIndexing: Math.random() > 0.4,
      },
    },
    activityLog,
    financialData: {
      creditScore: Math.floor(Math.random() * 400) + 400,
      accounts: Array.from(
        { length: Math.floor(Math.random() * 5) + 2 },
        (_, i) => {
          const accountTypes = [
            "checking",
            "savings",
            "credit",
            "investment",
          ] as const;
          const categories = [
            "food",
            "transportation",
            "entertainment",
            "utilities",
            "shopping",
          ];
          return {
            id: `account_${index}_${i}`,
            type: accountTypes[Math.floor(Math.random() * 4)] ?? "checking",
            bank: `${generateRandomString(10)} Bank`,
            balance: Math.floor(Math.random() * 100000) + 1000,
            currency: "USD",
            transactions: Array.from(
              { length: Math.floor(Math.random() * 50) + 20 },
              (_, j) => ({
                id: `txn_${index}_${i}_${j}`,
                date: generateRandomDate(2023, 2024),
                description: generateRandomString(30),
                amount: Math.floor(Math.random() * 1000) + 10,
                category: categories[Math.floor(Math.random() * 5)] ?? "other",
                merchant: generateRandomString(15),
                tags: Array.from(
                  { length: Math.floor(Math.random() * 3) },
                  () => generateRandomString(8)
                ),
              })
            ),
          };
        }
      ),
      investments: Array.from(
        { length: Math.floor(Math.random() * 10) + 5 },
        (_, i) => {
          const sectors = [
            "Technology",
            "Healthcare",
            "Finance",
            "Energy",
            "Consumer",
          ];
          return {
            symbol: generateRandomString(4).toUpperCase(),
            name: `${generateRandomString(15)} Corp`,
            quantity: Math.floor(Math.random() * 1000) + 10,
            purchasePrice: Math.random() * 500 + 10,
            currentPrice: Math.random() * 500 + 10,
            purchaseDate: generateRandomDate(2020, 2024),
            sector: sectors[Math.floor(Math.random() * 5)] ?? "Technology",
            dividends: Array.from(
              { length: Math.floor(Math.random() * 8) },
              () => ({
                date: generateRandomDate(2020, 2024),
                amount: Math.random() * 100 + 5,
              })
            ),
          };
        }
      ),
    },
    healthData: {
      bloodType:
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"][
          Math.floor(Math.random() * 8)
        ] ?? "O+",
      allergies: Array.from({ length: Math.floor(Math.random() * 5) }, () =>
        generateRandomString(12)
      ),
      medications: Array.from({ length: Math.floor(Math.random() * 5) }, () => {
        const frequencies = ["daily", "twice daily", "weekly", "as needed"];
        const medication = {
          name: generateRandomString(15),
          dosage: `${Math.floor(Math.random() * 100) + 10}mg`,
          frequency: frequencies[Math.floor(Math.random() * 4)] ?? "daily",
          startDate: generateRandomDate(2020, 2024),
        };

        if (Math.random() > 0.7) {
          return { ...medication, endDate: generateRandomDate(2021, 2024) };
        }

        return medication;
      }),
      vitals: Array.from(
        { length: Math.floor(Math.random() * 20) + 10 },
        () => ({
          date: generateRandomDate(2023, 2024),
          weight: Math.floor(Math.random() * 100) + 100,
          height: Math.floor(Math.random() * 50) + 150,
          bloodPressure: {
            systolic: Math.floor(Math.random() * 60) + 90,
            diastolic: Math.floor(Math.random() * 40) + 60,
          },
          heartRate: Math.floor(Math.random() * 60) + 60,
          temperature: Math.random() * 2 + 97,
        })
      ),
      exerciseLog: Array.from(
        { length: Math.floor(Math.random() * 30) + 10 },
        () => {
          const exerciseTypes = [
            "running",
            "swimming",
            "cycling",
            "weightlifting",
            "yoga",
          ];
          return {
            date: generateRandomDate(2023, 2024),
            type: exerciseTypes[Math.floor(Math.random() * 5)] ?? "running",
            duration: Math.floor(Math.random() * 120) + 15,
            caloriesBurned: Math.floor(Math.random() * 800) + 100,
            notes: generateRandomString(50),
          };
        }
      ),
    },
    metadata: {
      createdAt: generateRandomDate(2020, 2022),
      updatedAt: generateRandomDate(2023, 2024),
      lastLogin: generateRandomDate(2024, 2024),
      loginCount: Math.floor(Math.random() * 1000) + 50,
      accountStatus: (["active", "inactive", "suspended"][
        Math.floor(Math.random() * 3)
      ] ?? "active") as "active" | "inactive" | "suspended" | "deleted",
      verificationStatus: {
        email: Math.random() > 0.2,
        phone: Math.random() > 0.4,
        identity: Math.random() > 0.7,
      },
      flags: Array.from({ length: Math.floor(Math.random() * 3) }, () =>
        generateRandomString(10)
      ),
      tags: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () =>
        generateRandomString(8)
      ),
      customFields: {
        referralSource: generateRandomString(15),
        marketingSegment: generateRandomString(12),
        lifetimeValue: Math.floor(Math.random() * 10000),
        riskScore: Math.random(),
        customData: generateRandomString(100),
      },
    },
  };
};

export const generateLargeNestedJson = (count: number = 1000): void => {
  console.log(`Starting generation of ${count} complex nested objects...`);
  const startTime = Date.now();

  const users: ComplexUser[] = [];

  for (let i = 1; i <= count; i++) {
    users.push(generateComplexUser(i));

    if (i % 100 === 0) {
      console.log(`Generated ${i}/${count} users...`);
    }
  }

  let filename = `large_nested_${count}_objects.json`;
  let filepath = path.join(process.cwd(), "src", "utils", filename);

  // Check if file exists and create new filename if needed
  let counter = 1;
  while (fs.existsSync(filepath)) {
    filename = `large_nested_${count}_objects_${counter}.json`;
    filepath = path.join(process.cwd(), "src", "utils", filename);
    counter++;
  }

  // Create directory if it doesn't exist
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log("Writing to file...");
  const jsonContent = JSON.stringify(users, null, 2);

  fs.writeFileSync(filepath, jsonContent);

  const endTime = Date.now();
  const fileStats = fs.statSync(filepath);
  const fileSizeMB = (fileStats.size / 1024 / 1024).toFixed(2);

  console.log(`\n✅ Generated ${count} complex nested objects successfully!`);
  console.log(`📁 File: ${filename}`);
  console.log(`📊 Size: ${fileSizeMB} MB`);
  console.log(`⏱️  Time: ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
  console.log(
    `📈 Objects per second: ${(count / ((endTime - startTime) / 1000)).toFixed(
      0
    )}`
  );
};

// Export the ComplexUser interface
export type { ComplexUser };

// Example usage - generate 1000 objects (~100MB)
// generateLargeNestedJson(1000);

generateLargeNestedJson(1000);
