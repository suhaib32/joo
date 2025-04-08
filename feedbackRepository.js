export class FeedbackRepository {
  constructor(kv) {
    this.kv = kv;
  }

  async getFeedbackCount(value) {
    const key = ["feedbacks", value.toString()];
    const result = await this.kv.get(key);
    return result?.value || 0;
  }

  async incrementFeedback(value) {
    const key = ["feedbacks", value.toString()];
    const count = await this.getFeedbackCount(value);
    await this.kv.set(key, count + 1);
    return count + 1;
  }
}
