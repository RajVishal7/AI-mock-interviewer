/** @type { import('drizzle-kit').Config } */
export default {
    schema: "./utils/schema.js",
    out: "./drizzle",
    dialect: "postgresql", // ✅ required for your current drizzle-kit version
    dbCredentials: {
        connectionString: 'postgresql://neondb_owner:npg_PuKnRr1vkh5H@ep-winter-bush-a5lj2ecg-pooler.us-east-2.aws.neon.tech/Ai-mocker?sslmode=require&channel_binding=require'
    },
};
