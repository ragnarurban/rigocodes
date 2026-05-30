export type Category = "web-development" | "game-development" | "showcase";
export const CURRENT_CATEGORIES: Category[] = [
  "web-development",
  "game-development",
  "showcase",
];

export interface Post {
  slug: string;
  title: string;
  description: string;
  category: Category;
  date: string;
  readingTime: string;
  tags: string[];
  cover?: string;
  contentGuide: { id: string; heading: string; level: 2 | 3; body: string }[];
  content: string;
}

export const categories: {
  id: Category;
  label: string;
  translationKey: string;
}[] = [
  {
    id: "web-development",
    label: "Web Development",

    translationKey: "Web",
  },
  {
    id: "game-development",
    label: "Game Development",
    translationKey: "Game",
  },
  {
    id: "showcase",
    label: "Showcase",
    translationKey: "Showcase",
  },
];

export const posts: Post[] = [
  {
    slug: "the-quiet-power-of-server-components",
    title: "The Quiet Power of Server Components",
    description:
      "Why moving rendering back to the server is the most interesting shift in frontend in a decade.",
    category: "web-development",
    date: "2026-04-18",
    readingTime: "8 min read",
    tags: ["React", "Architecture", "Performance"],
    contentGuide: [
      {
        id: "intro",
        heading: "A new old idea",
        level: 2,
        body: "We spent ten years moving everything to the client. Now the pendulum is swinging back — and the result is faster, leaner, and easier to reason about. Server components aren't a regression; they're a refinement.",
      },
      {
        id: "why-now",
        heading: "Why this works now",
        level: 2,
        body: "Edge runtimes, streaming responses, and granular hydration changed the math. The cost of rendering on the server is no longer a round trip — it's a few milliseconds at the edge.",
      },
      {
        id: "tradeoffs",
        heading: "The tradeoffs",
        level: 3,
        body: "You give up some interactivity at the page boundary in exchange for less JavaScript on the wire. For most content-driven applications, that's the right trade.",
      },
      {
        id: "closing",
        heading: "Where this goes",
        level: 2,
        body: "Expect the next wave of frameworks to blur the client/server line entirely. The components you write won't care where they run.",
      },
    ],
    content:
      "![AI Chatbot Concept](https://picsum.photos/id/1015/1200/600)\n_Modern AI chatbots are transforming how businesses interact with customers_\n\n---\n\n## A complete beginner-friendly guide to creating intelligent conversational agents in 2026\n\nWelcome to the world of **conversational AI**! In this comprehensive tutorial, we'll walk through building a fully functional AI-powered chatbot using **Python**, **LangChain**, and **OpenAI's latest models**.\n\nWhether you're a seasoned developer or just starting your journey into AI, this guide has something for everyone.\n\n> \"The future belongs to those who can build intelligent systems that understand and respond like humans.\"  \n> — AI Researcher, 2026\n\n## What You'll Learn\n\nIn this post, you'll discover how to:\n\n- Set up a modern AI development environment\n- Integrate **Large Language Models** (LLMs) into your applications\n- Implement **memory** and conversation history\n- Add **tool calling** capabilities to your chatbot\n- Deploy your chatbot as a web application\n\n## Prerequisites\n\nBefore we begin, make sure you have the following:\n\n- **Python 3.11+** installed\n- Basic understanding of Python programming\n- An **OpenAI API key** (or compatible LLM provider)\n- Familiarity with virtual environments\n\n## Setting Up Your Environment\n\nLet's start by creating a clean project structure:\n\n```bash\nmkdir ai-chatbot && cd ai-chatbot\npython -m venv venv\nsource venv/bin/activate    # On Windows: venv\\Scripts\\activate\npip install langchain langchain-openai langchain-community streamlit\n```\n",
  },
  {
    slug: "css-is-finally-good",
    title: "CSS Is Finally Good",
    description:
      "Container queries, cascade layers, color-mix, and :has() — the language we wished for is here.",
    category: "web-development",
    date: "2026-03-02",
    readingTime: "6 min read",
    tags: ["CSS", "Design Systems"],
    contentGuide: [
      {
        id: "the-shift",
        heading: "The shift",
        level: 2,
        body: "For years CSS was a thing we patched around with utility libraries and CSS-in-JS. Quietly, the platform caught up.",
      },
      {
        id: "queries",
        heading: "Container queries change the game",
        level: 2,
        body: "Components can finally respond to their context, not the viewport. This is the missing piece for component-driven design.",
      },
      {
        id: "color",
        heading: "Color, properly",
        level: 3,
        body: "oklch and color-mix give us a perceptually uniform palette and the ability to derive colors at runtime. Theming becomes trivial.",
      },
    ],
    content:
      "![AI Chatbot Concept](https://picsum.photos/id/1015/1200/600)\n_Modern AI chatbots are transforming how businesses interact with customers_\n\n---\n\n## A complete beginner-friendly guide to creating intelligent conversational agents in 2026\n\nWelcome to the world of **conversational AI**! In this comprehensive tutorial, we'll walk through building a fully functional AI-powered chatbot using **Python**, **LangChain**, and **OpenAI's latest models**.\n\nWhether you're a seasoned developer or just starting your journey into AI, this guide has something for everyone.\n\n> \"The future belongs to those who can build intelligent systems that understand and respond like humans.\"  \n> — AI Researcher, 2026\n\n## What You'll Learn\n\nIn this post, you'll discover how to:\n\n- Set up a modern AI development environment\n- Integrate **Large Language Models** (LLMs) into your applications\n- Implement **memory** and conversation history\n- Add **tool calling** capabilities to your chatbot\n- Deploy your chatbot as a web application\n\n## Prerequisites\n\nBefore we begin, make sure you have the following:\n\n- **Python 3.11+** installed\n- Basic understanding of Python programming\n- An **OpenAI API key** (or compatible LLM provider)\n- Familiarity with virtual environments\n\n## Setting Up Your Environment\n\nLet's start by creating a clean project structure:\n\n```bash\nmkdir ai-chatbot && cd ai-chatbot\npython -m venv venv\nsource venv/bin/activate    # On Windows: venv\\Scripts\\activate\npip install langchain langchain-openai langchain-community streamlit\n```\n",
  },
  {
    slug: "typescript-as-design-tool",
    title: "TypeScript as a Design Tool",
    description:
      "Types aren't just for catching bugs — they're the cheapest way to sketch an API.",
    category: "web-development",
    date: "2026-02-11",
    readingTime: "5 min read",
    tags: ["TypeScript", "API Design"],
    contentGuide: [
      {
        id: "sketch",
        heading: "Sketching with types",
        level: 2,
        body: "Before writing a single line of implementation, write the types. The friction you feel is the friction your users will feel.",
      },
      {
        id: "narrow",
        heading: "Narrow on purpose",
        level: 2,
        body: "Make impossible states unrepresentable. Discriminated unions are the most underused tool in the language.",
      },
    ],
    content:
      "![AI Chatbot Concept](https://picsum.photos/id/1015/1200/600)\n_Modern AI chatbots are transforming how businesses interact with customers_\n\n---\n\n## A complete beginner-friendly guide to creating intelligent conversational agents in 2026\n\nWelcome to the world of **conversational AI**! In this comprehensive tutorial, we'll walk through building a fully functional AI-powered chatbot using **Python**, **LangChain**, and **OpenAI's latest models**.\n\nWhether you're a seasoned developer or just starting your journey into AI, this guide has something for everyone.\n\n> \"The future belongs to those who can build intelligent systems that understand and respond like humans.\"  \n> — AI Researcher, 2026\n\n## What You'll Learn\n\nIn this post, you'll discover how to:\n\n- Set up a modern AI development environment\n- Integrate **Large Language Models** (LLMs) into your applications\n- Implement **memory** and conversation history\n- Add **tool calling** capabilities to your chatbot\n- Deploy your chatbot as a web application\n\n## Prerequisites\n\nBefore we begin, make sure you have the following:\n\n- **Python 3.11+** installed\n- Basic understanding of Python programming\n- An **OpenAI API key** (or compatible LLM provider)\n- Familiarity with virtual environments\n\n## Setting Up Your Environment\n\nLet's start by creating a clean project structure:\n\n```bash\nmkdir ai-chatbot && cd ai-chatbot\npython -m venv venv\nsource venv/bin/activate    # On Windows: venv\\Scripts\\activate\npip install langchain langchain-openai langchain-community streamlit\n```\n",
  },
];

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read?: boolean;
};

export const messages: Message[] = [
  {
    id: "0",
    name: "Joan Charles Maximus - Job opportunity",
    email: "jc.maximus@gmail.com",
    message:
      "Yooooo I was impressed by your site and I would like to hire you for 9000 usd per months, please bro",
    read: true,
    date: new Date().toISOString(),
  },
  {
    id: "1",
    name: "Job opportunity",
    email: "jc.maximus@gmail.com",
    message:
      "Yooooo I was impressed by your site and I would like to hire you for 10000 usd per months, please bro",
    read: false,
    date: new Date().toISOString(),
  },
  {
    id: "0",
    name: "Incredible Job opportunity",
    email: "jc.maximus@gmail.com",
    message:
      "Yooooo I was impressed by your site and I would like to hire you for 11000 usd per months, please bro",
    read: false,
    date: new Date().toISOString(),
  },
];
export type Suggestion = {
  id: string;
  topic: string;
  category: Category;
  details: string;
  email?: string;
  date: string;
};
export const suggestions: Suggestion[] = [
  {
    id: "0",
    topic: "Make some content bro",
    category: "web-development",
    date: "2026/01/02",
    email: "somedude@yahoo.com",
    details:
      "You bro I really love your site and I would love to see some more content and feet pics",
  },
  {
    id: "1",
    topic: "Make some content bro 2",
    category: "game-development",
    date: "2026/03/02",
    email: "somedude2@yahoo.com",
    details:
      "You bro I really love your site and I would love to see some more content and feet pics",
  },
  {
    id: "2",
    topic: "Make some content bro 3",
    category: "web-development",
    date: "2026/05/02",
    email: "somedude3@yahoo.com",
    details:
      "You bro I really love your site and I would love to see some more content and feet pics",
  },
];
import { BarChart3, FileText, Inbox, Lightbulb } from "lucide-react";

export const TABS = [
  {
    id: "posts",
    label: "Posts",
    icon: FileText,
  },
  {
    id: "messages",
    label: "Messages",
    icon: Inbox,
  },
  {
    id: "suggestions",
    label: "Suggestions",
    icon: Lightbulb,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];
