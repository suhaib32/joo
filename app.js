import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import { FeedbackRepository } from "./feedbackRepository.js";

const kv = await Deno.openKv();
const feedbackRepo = new FeedbackRepository(kv);
const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => c.text("Hello world!"));


[1, 2, 3].forEach((value) => {
  app.get(`/feedbacks/${value}`, async (c) => {
    const count = await feedbackRepo.getFeedbackCount(value);
    return c.json({ count });
  });

  app.post(`/feedbacks/${value}`, async (c) => {
    const count = await feedbackRepo.incrementFeedback(value);
    return c.json({ count });
  });
});

export default app;
