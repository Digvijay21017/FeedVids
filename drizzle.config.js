import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./configs/schema.js",
//   out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://feedvid-video-generator_owner:1ZgdW7XbDniI@ep-mute-term-a143l8tf.ap-southeast-1.aws.neon.tech/feedvid-video-generator?sslmode=require',
  },
});
