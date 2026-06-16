import express, { Request, Response } from "express";
import { AIService } from "../services/ai.js"; // <- note .js extension for ES modules

const router = express.Router();

router.post("/analyze", async (req: Request, res: Response) => {
  try {
    const { profile, repositories } = req.body;

    if (!profile || !repositories) {
      return res.status(400).json({ error: "Missing profile or repositories" });
    }

    // ✅ Use AIService.generateFeedback instead of generateAIAnalysis
    const feedback = await AIService.generateFeedback(profile, repositories);

    res.json({ success: true, feedback });
  } catch (error: any) {
    console.error("AI Route Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;
