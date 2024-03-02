export const types = [
    "Groq",
    "OpenAI",
];

export type ModelType = (typeof types)[number];

export type Model<Type = string> = {
    id: string;
    name: string;
    description: string;
    strengths?: string;
    type: Type;
    canCallSkills?: boolean;
};

export const models: Model<ModelType>[] = [
    {
        name: "GPT4-0125-preview",
        id: "gpt-4-0125-preview",
        description: "foo",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT4-turbo-preview",
        id: "gpt-4-turbo-preview",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT4-1106-preview",
        id: "gpt-4-1106-preview",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT4",
        id: "gpt-4",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT4-0613",
        id: "gpt-4-0613",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT4-32k",
        id: "gpt-4-32k",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT4-32k-0613",
        id: "gpt-4-32k-0613",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT3.5-turbo-0125",
        id: "gpt-3.5-turbo-0125",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT3.5-turbo-0125",
        id: "gpt-3.5-turbo",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT3.5-turbo-0125",
        id: "gpt-3.5-turbo-1106",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },
    {
        name: "GPT3.5-turbo-0125",
        id: "gpt-3.5-turbo-instruct",
        description: "",
        type: "OpenAI",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: true,
    },

    {
        name: "mixtral-8x7b-32768",
        id: "mixtral-8x7b-32768",
        description: "",
        type: "Groq",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: false,
    },
    {
        name: "llama2-70b-4096",
        id: "llama2-70b-4096",
        description: "",
        type: "Groq",
        strengths: "Complex intent, cause and effect, creative generation, search, summarization for audience",
        canCallSkills: false,
    },
];